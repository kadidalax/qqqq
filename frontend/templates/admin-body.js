// 管理后台模板主体内容
export const adminBodyTemplate = `
      <!-- 顶部导航 -->
      <div class="top-nav">
        <div class="breadcrumb">
          <span class="breadcrumb-item">首页</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item">{{ pageTitle }}</span>
        </div>
        
        <div class="user-menu">
          <span class="user-name">管理员</span>
          <button class="btn-logout" @click="logout">
            <span>退出</span>
            <span>🚪</span>
          </button>
        </div>
      </div>
      
      <!-- 控制面板页面 -->
      <div v-if="activePage === 'dashboard'">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">控制面板</h2>
          </div>
          
          <div class="dashboard-stats">
            <div class="stat-card">
              <div class="stat-card-icon">🌐</div>
              <div class="stat-card-content">
                <div class="stat-card-value">{{ stats.totalWebsites }}</div>
                <div class="stat-card-label">网站总数</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card-icon">📁</div>
              <div class="stat-card-content">
                <div class="stat-card-value">{{ stats.totalCategories }}</div>
                <div class="stat-card-label">分类总数</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-card-icon">👁️</div>
              <div class="stat-card-content">
                <div class="stat-card-value">{{ stats.totalClicks }}</div>
                <div class="stat-card-label">总点击次数</div>
              </div>
            </div>
          </div>
          
          <div class="card-header">
            <h3 class="card-title">热门网站</h3>
          </div>
          
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>网站名称</th>
                  <th>分类</th>
                  <th>点击次数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="site in popularWebsites" :key="site.id">
                  <td>{{ site.title }}</td>
                  <td>{{ getCategoryName(site.categoryId) }}</td>
                  <td>{{ site.clicks }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- 网站管理页面 -->
      <div v-if="activePage === 'websites'">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">网站管理</h2>
            <button class="btn btn-success" @click="showWebsiteModal()">添加网站</button>
          </div>
          
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>网站名称</th>
                  <th>URL</th>
                  <th>分类</th>
                  <th>点击次数</th>
                  <th>推荐</th>
                  <th>可见</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="site in websites" :key="site.id">
                  <td>{{ site.title }}</td>
                  <td>{{ site.url }}</td>
                  <td>{{ getCategoryName(site.categoryId) }}</td>
                  <td>{{ site.clicks }}</td>
                  <td>{{ site.isFeatured ? '是' : '否' }}</td>
                  <td>{{ site.isVisible ? '是' : '否' }}</td>
                  <td>
                    <button class="btn btn-sm" @click="showWebsiteModal(site)">编辑</button>
                    <button class="btn btn-sm btn-danger" @click="deleteWebsite(site.id)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- 分类管理页面 -->
      <div v-if="activePage === 'categories'">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">分类管理</h2>
            <button class="btn btn-success" @click="showCategoryModal()">添加分类</button>
          </div>
          
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>分类名称</th>
                  <th>描述</th>
                  <th>图标</th>
                  <th>颜色</th>
                  <th>排序</th>
                  <th>可见</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td>{{ category.name }}</td>
                  <td>{{ category.description }}</td>
                  <td>{{ category.icon }}</td>
                  <td>
                    <div class="color-preview" :style="{ backgroundColor: category.color }"></div>
                  </td>
                  <td>{{ category.order }}</td>
                  <td>{{ category.isVisible ? '是' : '否' }}</td>
                  <td>
                    <button class="btn btn-sm" @click="showCategoryModal(category)">编辑</button>
                    <button class="btn btn-sm btn-danger" @click="deleteCategory(category.id)">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- 设置页面 -->
      <div v-if="activePage === 'settings'">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">系统设置</h2>
          </div>
          
          <div class="settings-container">
            <div class="form-group">
              <label class="form-label">清除缓存</label>
              <p class="form-text">清除系统缓存，获取最新数据</p>
              <button class="btn" @click="clearCache">清除缓存</button>
            </div>
            
            <div class="form-group">
              <label class="form-label">访问前台</label>
              <p class="form-text">前往导航站首页</p>
              <a href="/" class="btn btn-outline" target="_blank">打开首页</a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 网站弹窗 -->
      <div class="modal-overlay" v-if="showModal && modalType === 'website'">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">{{ isEditing ? '编辑网站' : '添加网站' }}</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="websiteTitle">网站标题</label>
              <input type="text" id="websiteTitle" class="form-control" v-model="currentWebsite.title" placeholder="输入网站标题">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="websiteUrl">网站URL</label>
              <input type="url" id="websiteUrl" class="form-control" v-model="currentWebsite.url" placeholder="输入网站URL">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="websiteDescription">网站描述</label>
              <input type="text" id="websiteDescription" class="form-control" v-model="currentWebsite.description" placeholder="输入网站描述">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="websiteIcon">网站图标URL</label>
              <input type="url" id="websiteIcon" class="form-control" v-model="currentWebsite.icon" placeholder="输入网站图标URL">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="websiteCategory">所属分类</label>
              <select id="websiteCategory" class="form-control" v-model="currentWebsite.categoryId">
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label" for="websiteOrder">排序</label>
              <input type="number" id="websiteOrder" class="form-control" v-model.number="currentWebsite.order" placeholder="输入排序值">
            </div>
            
            <div class="form-group form-check">
              <input type="checkbox" id="websiteFeatured" v-model="currentWebsite.isFeatured">
              <label class="form-check-label" for="websiteFeatured">设为推荐</label>
            </div>
            
            <div class="form-group form-check">
              <input type="checkbox" id="websiteVisible" v-model="currentWebsite.isVisible">
              <label class="form-check-label" for="websiteVisible">设为可见</label>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-outline" @click="closeModal">取消</button>
            <button class="btn" @click="saveWebsite">保存</button>
          </div>
        </div>
      </div>
      
      <!-- 分类弹窗 -->
      <div class="modal-overlay" v-if="showModal && modalType === 'category'">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">{{ isEditing ? '编辑分类' : '添加分类' }}</h3>
            <button class="modal-close" @click="closeModal">×</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="categoryName">分类名称</label>
              <input type="text" id="categoryName" class="form-control" v-model="currentCategory.name" placeholder="输入分类名称">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="categoryDescription">分类描述</label>
              <input type="text" id="categoryDescription" class="form-control" v-model="currentCategory.description" placeholder="输入分类描述">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="categoryIcon">分类图标</label>
              <input type="text" id="categoryIcon" class="form-control" v-model="currentCategory.icon" placeholder="输入分类图标">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="categoryColor">分类颜色</label>
              <input type="color" id="categoryColor" class="form-control" v-model="currentCategory.color">
            </div>
            
            <div class="form-group">
              <label class="form-label" for="categoryOrder">排序</label>
              <input type="number" id="categoryOrder" class="form-control" v-model.number="currentCategory.order" placeholder="输入排序值">
            </div>
            
            <div class="form-group form-check">
              <input type="checkbox" id="categoryVisible" v-model="currentCategory.isVisible">
              <label class="form-check-label" for="categoryVisible">设为可见</label>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn btn-outline" @click="closeModal">取消</button>
            <button class="btn" @click="saveCategory">保存</button>
          </div>
        </div>
      </div>
      
      <!-- 通知容器 -->
      <div class="toast-container">
        <div v-for="(toast, index) in toasts" :key="index" 
             :class="['toast', 'toast-' + toast.type]">
          <div class="toast-icon">{{ toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️' }}</div>
          <div class="toast-content">
            <div class="toast-title">{{ toast.title }}</div>
            <div class="toast-message">{{ toast.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>` 