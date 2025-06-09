// 管理后台模板JavaScript
export const adminScriptTemplate = `
<script>
  // 检查是否已登录
  function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
    }
  }
  
  // 页面加载时检查认证状态
  document.addEventListener('DOMContentLoaded', function() {
    // 在页面加载时，添加Authorization头，帮助服务器验证登录状态
    addAuthorizationHeader();
    
    checkAuth();
    initApp();
  });
  
  // 添加Authorization请求头
  function addAuthorizationHeader() {
    // 从localStorage获取token
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // 保存原始fetch函数
      const originalFetch = window.fetch;
      
      // 重写fetch函数以添加Authorization头
      window.fetch = function(url, options) {
        // 创建新的options对象
        options = options || {};
        options.headers = options.headers || {};
        
        // 如果headers是Headers实例，使用append方法
        if (options.headers instanceof Headers) {
          options.headers.append('Authorization', 'Bearer ' + token);
        } else {
          // 否则直接添加到对象
          options.headers['Authorization'] = 'Bearer ' + token;
        }
        
        // 调用原始fetch函数
        return originalFetch(url, options);
      };
      
      console.log('Authorization header added to all fetch requests');
    }
  }
  
  // 初始化应用
  function initApp() {
    // 创建Vue应用
    const { createApp } = Vue;
    
    createApp({
      data() {
        return {
          activePage: 'dashboard',
          pageTitle: '控制面板',
          websites: [],
          categories: [],
          stats: {
            totalWebsites: 0,
            totalCategories: 0,
            totalClicks: 0
          },
          popularWebsites: [],
          showModal: false,
          modalType: '',
          isEditing: false,
          currentWebsite: {
            id: '',
            title: '',
            url: '',
            description: '',
            icon: '',
            categoryId: '',
            order: 0,
            isFeatured: false,
            isVisible: true,
            tags: []
          },
          currentCategory: {
            id: '',
            name: '',
            description: '',
            icon: '📁',
            color: '#3498db',
            order: 0,
            isVisible: true
          },
          toasts: [],
          websiteSearch: '',
          categorySearch: '',
          websiteCategoryFilter: '',
          websiteVisibilityFilter: '',
          websiteFeaturedFilter: '',
          confirmMessage: '',
          confirmCallback: null,
          passwordForm: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          },
          isLoading: false
        };
      },
      computed: {
        // 过滤后的网站列表
        filteredWebsites() {
          let result = [...this.websites];
          
          // 搜索过滤
          if (this.websiteSearch) {
            const search = this.websiteSearch.toLowerCase();
            result = result.filter(site => 
              site.title.toLowerCase().includes(search) || 
              site.url.toLowerCase().includes(search) ||
              site.description.toLowerCase().includes(search)
            );
          }
          
          // 分类过滤
          if (this.websiteCategoryFilter) {
            result = result.filter(site => site.categoryId === this.websiteCategoryFilter);
          }
          
          // 可见性过滤
          if (this.websiteVisibilityFilter) {
            const isVisible = this.websiteVisibilityFilter === 'visible';
            result = result.filter(site => site.isVisible === isVisible);
          }
          
          // 推荐过滤
          if (this.websiteFeaturedFilter) {
            const isFeatured = this.websiteFeaturedFilter === 'featured';
            result = result.filter(site => site.isFeatured === isFeatured);
          }
          
          return result;
        },
        
        // 过滤后的分类列表
        filteredCategories() {
          let result = [...this.categories];
          
          // 搜索过滤
          if (this.categorySearch) {
            const search = this.categorySearch.toLowerCase();
            result = result.filter(category => 
              category.name.toLowerCase().includes(search) || 
              category.description.toLowerCase().includes(search)
            );
          }
          
          return result;
        }
      },
      methods: {
        // 页面导航
        setActivePage(page) {
          this.activePage = page;
          
          switch(page) {
            case 'dashboard':
              this.pageTitle = '控制面板';
              break;
            case 'websites':
              this.pageTitle = '网站管理';
              break;
            case 'categories':
              this.pageTitle = '分类管理';
              break;
            case 'settings':
              this.pageTitle = '系统设置';
              break;
          }
          
          // 数据加载
          this.loadData();
        },
        
        // 获取分类名称
        getCategoryName(categoryId) {
          const category = this.categories.find(c => c.id === categoryId);
          return category ? category.name : '未分类';
        },
        
        // 获取分类颜色
        getCategoryColor(categoryId) {
          const category = this.categories.find(c => c.id === categoryId);
          return category ? category.color : '#cccccc';
        },
        
        // 获取分类下的网站数量
        getCategoryWebsitesCount(categoryId) {
          return this.websites.filter(site => site.categoryId === categoryId).length;
        },
        
        // 计算点击百分比
        getClicksPercentage(clicks) {
          if (this.popularWebsites.length === 0) return 0;
          const maxClicks = Math.max(...this.popularWebsites.map(site => site.clicks));
          if (maxClicks === 0) return 0;
          return (clicks / maxClicks) * 100;
        },
        
        // 加载数据
        async loadData() {
          this.isLoading = true;
          try {
            await this.loadCategories();
            await this.loadWebsites();
            
            // 计算统计数据
            if (this.activePage === 'dashboard') {
              this.calculateStats();
            }
          } catch (error) {
            this.showToast('error', '加载失败', error.message || '数据加载失败');
          } finally {
            this.isLoading = false;
          }
        },
        
        // 加载网站数据
        async loadWebsites() {
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/websites', {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('获取网站数据失败');
            }
            
            const data = await response.json();
            this.websites = data;
            
            // 热门网站
            this.popularWebsites = [...this.websites]
              .sort((a, b) => b.clicks - a.clicks)
              .slice(0, 5);
          } catch (error) {
            console.error('加载网站数据失败:', error);
            throw error;
          }
        },
        
        // 加载分类数据
        async loadCategories() {
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/categories', {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('获取分类数据失败');
            }
            
            const data = await response.json();
            this.categories = data;
          } catch (error) {
            console.error('加载分类数据失败:', error);
            throw error;
          }
        },
        
        // 计算统计数据
        calculateStats() {
          this.stats.totalWebsites = this.websites.length;
          this.stats.totalCategories = this.categories.length;
          
          // 计算总点击量
          this.stats.totalClicks = this.websites.reduce((sum, site) => sum + site.clicks, 0);
        },
        
        // 显示网站编辑弹窗
        showWebsiteModal(website = null) {
          this.modalType = 'website';
          this.isEditing = !!website;
          
          if (website) {
            // 编辑模式：复制现有网站数据
            this.currentWebsite = { ...website };
          } else {
            // 新增模式：重置表单
            this.currentWebsite = {
              id: '',
              title: '',
              url: '',
              description: '',
              icon: '',
              categoryId: this.categories.length > 0 ? this.categories[0].id : '',
              order: 0,
              isFeatured: false,
              isVisible: true,
              tags: [],
              clicks: 0
            };
          }
          
          this.showModal = true;
        },
        
        // 显示分类编辑弹窗
        showCategoryModal(category = null) {
          this.modalType = 'category';
          this.isEditing = !!category;
          
          if (category) {
            // 编辑模式：复制现有分类数据
            this.currentCategory = { ...category };
          } else {
            // 新增模式：重置表单
            this.currentCategory = {
              id: '',
              name: '',
              description: '',
              icon: '📁',
              color: '#3498db',
              order: this.categories.length,
              isVisible: true
            };
          }
          
          this.showModal = true;
        },
        
        // 显示密码修改弹窗
        showPasswordModal() {
          this.modalType = 'password';
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
          this.showModal = true;
        },
        
        // 确认删除网站
        confirmDeleteWebsite(id) {
          this.confirmMessage = '确定要删除这个网站吗？此操作无法撤销。';
          this.confirmCallback = () => this.deleteWebsite(id);
          this.modalType = 'confirm';
          this.showModal = true;
        },
        
        // 确认删除分类
        confirmDeleteCategory(id) {
          const category = this.categories.find(c => c.id === id);
          const websitesCount = this.getCategoryWebsitesCount(id);
          
          if (websitesCount > 0) {
            this.confirmMessage = '此分类下还有 ' + websitesCount + ' 个网站，确定要删除吗？删除后，这些网站将变为未分类状态。';
          } else {
            this.confirmMessage = '确定要删除这个分类吗？此操作无法撤销。';
          }
          
          this.confirmCallback = () => this.deleteCategory(id);
          this.modalType = 'confirm';
          this.showModal = true;
        },
        
        // 执行确认操作
        confirmAction() {
          if (this.confirmCallback) {
            this.confirmCallback();
          }
          this.closeModal();
        },
        
        // 关闭弹窗
        closeModal() {
          this.showModal = false;
          this.modalType = '';
          this.confirmCallback = null;
        },
        
        // 保存网站
        async saveWebsite() {
          try {
            const token = localStorage.getItem('authToken');
            const method = this.isEditing ? 'PUT' : 'POST';
            const url = this.isEditing ? '/api/websites/' + this.currentWebsite.id : '/api/websites';
            
            const response = await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(this.currentWebsite)
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('保存网站失败');
            }
            
            // 重新加载数据
            await this.loadWebsites();
            
            // 显示成功消息
            this.showToast('success', '保存成功', this.isEditing ? '网站已更新' : '网站已添加');
            
            // 关闭弹窗
            this.closeModal();
          } catch (error) {
            this.showToast('error', '保存失败', error.message || '保存网站时发生错误');
          }
        },
        
        // 保存分类
        async saveCategory() {
          try {
            const token = localStorage.getItem('authToken');
            const method = this.isEditing ? 'PUT' : 'POST';
            const url = this.isEditing ? '/api/categories/' + this.currentCategory.id : '/api/categories';
            
            const response = await fetch(url, {
              method: method,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(this.currentCategory)
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('保存分类失败');
            }
            
            // 重新加载数据
            await this.loadCategories();
            
            // 显示成功消息
            this.showToast('success', '保存成功', this.isEditing ? '分类已更新' : '分类已添加');
            
            // 关闭弹窗
            this.closeModal();
          } catch (error) {
            this.showToast('error', '保存失败', error.message || '保存分类时发生错误');
          }
        },
        
        // 删除网站
        async deleteWebsite(id) {
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/websites/' + id, {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('删除网站失败');
            }
            
            // 重新加载数据
            await this.loadWebsites();
            
            // 显示成功消息
            this.showToast('success', '删除成功', '网站已删除');
          } catch (error) {
            this.showToast('error', '删除失败', error.message || '删除网站时发生错误');
          }
        },
        
        // 删除分类
        async deleteCategory(id) {
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/categories/' + id, {
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('删除分类失败');
            }
            
            // 重新加载数据
            await this.loadCategories();
            await this.loadWebsites();
            
            // 显示成功消息
            this.showToast('success', '删除成功', '分类已删除');
          } catch (error) {
            this.showToast('error', '删除失败', error.message || '删除分类时发生错误');
          }
        },
        
        // 切换网站可见性
        async toggleWebsiteVisibility(website) {
          try {
            const updatedWebsite = { ...website, isVisible: !website.isVisible };
            
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/websites/' + website.id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(updatedWebsite)
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('更新网站失败');
            }
            
            // 更新本地数据
            const index = this.websites.findIndex(site => site.id === website.id);
            if (index !== -1) {
              this.websites[index].isVisible = !website.isVisible;
            }
            
            // 显示成功消息
            const status = updatedWebsite.isVisible ? '可见' : '隐藏';
            this.showToast('success', '更新成功', '网站已设为' + status);
          } catch (error) {
            this.showToast('error', '更新失败', error.message || '更新网站时发生错误');
          }
        },
        
        // 修改密码
        async changePassword() {
          // 验证表单
          if (!this.passwordForm.currentPassword) {
            this.showToast('error', '验证失败', '请输入当前密码');
            return;
          }
          
          if (!this.passwordForm.newPassword) {
            this.showToast('error', '验证失败', '请输入新密码');
            return;
          }
          
          if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
            this.showToast('error', '验证失败', '两次输入的密码不一致');
            return;
          }
          
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/auth/change-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                currentPassword: this.passwordForm.currentPassword,
                newPassword: this.passwordForm.newPassword
              })
            });
            
            if (response.status === 401) {
              this.showToast('error', '验证失败', '当前密码错误');
              return;
            }
            
            if (!response.ok) {
              throw new Error('修改密码失败');
            }
            
            // 显示成功消息
            this.showToast('success', '修改成功', '密码已更新');
            
            // 关闭弹窗
            this.closeModal();
          } catch (error) {
            this.showToast('error', '修改失败', error.message || '修改密码时发生错误');
          }
        },
        
        // 清除缓存
        async clearCache() {
          try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/cache/clear', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' + token
              }
            });
            
            if (response.status === 401) {
              this.logout();
              return;
            }
            
            if (!response.ok) {
              throw new Error('清除缓存失败');
            }
            
            // 重新加载数据
            await this.loadData();
            
            // 显示成功消息
            this.showToast('success', '操作成功', '系统缓存已清除');
          } catch (error) {
            this.showToast('error', '操作失败', error.message || '清除缓存时发生错误');
          }
        },
        
        // 显示提示消息
        showToast(type, title, message) {
          let icon = '💬';
          
          switch (type) {
            case 'success':
              icon = '✅';
              break;
            case 'error':
              icon = '❌';
              break;
            case 'warning':
              icon = '⚠️';
              break;
            case 'info':
              icon = 'ℹ️';
              break;
          }
          
          this.toasts.push({
            type,
            icon,
            title,
            message
          });
          
          // 3秒后自动移除
          setTimeout(() => {
            this.toasts.shift();
          }, 3000);
        },
        
        // 移除提示消息
        removeToast(index) {
          this.toasts.splice(index, 1);
        },
        
        // 退出登录
        logout() {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
      },
      mounted() {
        // 初始化加载数据
        this.loadData();
      }
    }).mount('#app');
  }
</script>`; 