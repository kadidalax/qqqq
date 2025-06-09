// 前端处理模块
import { getAllWebsites, getAllCategories, initStorage } from '../utils/storage.js';
import { renderTemplate } from './template.js';
import { renderAdminPage } from './admin.js';

// 前端入口处理函数
export async function handleFrontend(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 初始化存储
  await initStorage();
  
  // 处理后台页面路由
  if (path.startsWith('/admin') || path === '/login') {
    return renderAdminPage(request);
  }
  
  // 处理主页
  if (path === '/' || path === '/index.html') {
    return await renderHomePage(request);
  }
  
  // 处理点击统计
  if (path.startsWith('/visit/')) {
    return await handleVisit(request);
  }
  
  // 404页面
  return new Response(await renderTemplate('404', {}), {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// 渲染主页
async function renderHomePage(request) {
  // 获取数据
  const { success: websitesSuccess, data: websites } = await getAllWebsites();
  const { success: categoriesSuccess, data: categories } = await getAllCategories();
  
  if (!websitesSuccess || !categoriesSuccess) {
    return new Response('加载数据失败', { status: 500 });
  }
  
  // 处理数据
  const visibleCategories = categories.filter(category => category.isVisible);
  const visibleWebsites = websites.filter(website => website.isVisible);
  
  // 按分类组织网站
  const websitesByCategory = {};
  visibleCategories.forEach(category => {
    websitesByCategory[category.id] = {
      category,
      websites: visibleWebsites
        .filter(website => website.categoryId === category.id)
        .sort((a, b) => {
          // 先按推荐排序，再按排序值排序
          if (a.isFeatured !== b.isFeatured) {
            return a.isFeatured ? -1 : 1;
          }
          return a.order - b.order;
        })
    };
  });
  
  // 推荐网站
  const featuredWebsites = visibleWebsites
    .filter(website => website.isFeatured)
    .sort((a, b) => a.order - b.order);
  
  // 渲染模板
  const html = await renderTemplate('home', {
    title: '极速导航',
    categories: visibleCategories.sort((a, b) => a.order - b.order),
    websitesByCategory,
    featuredWebsites,
    currentYear: new Date().getFullYear()
  });
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// 处理网站访问统计
async function handleVisit(request) {
  const url = new URL(request.url);
  const websiteId = url.pathname.replace('/visit/', '');
  
  // 获取数据
  const { success, data: websites } = await getAllWebsites();
  
  if (!success) {
    return new Response(JSON.stringify({ error: '加载数据失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // 查找网站
  const website = websites.find(site => site.id === websiteId);
  
  if (!website) {
    return new Response(JSON.stringify({ error: '网站不存在' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // 更新点击次数
  website.clicks += 1;
  
  // 保存数据
  await SITES_KV.put('websites', JSON.stringify(websites));
  
  // 重定向到目标网站
  return new Response(null, {
    status: 302,
    headers: { 'Location': website.url }
  });
} 