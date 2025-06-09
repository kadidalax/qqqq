// 管理后台处理模块
import { renderTemplate } from './template.js';
import { adminTemplate } from './templates/admin.js'; 
import { loginTemplate } from './templates/login.js';
import { verifyToken } from '../utils/jwt.js';

// 渲染管理后台页面
export async function renderAdminPage(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 渲染登录页面
  if (path === '/admin/login' || path === '/login') {
    return new Response(loginTemplate, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
  
  // 检查登录状态
  const isLoggedIn = await checkAuth(request);
  if (!isLoggedIn && path !== '/login') {
    // 未登录，重定向到登录页面
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/login' }
    });
  }
  
  // 渲染管理后台页面
  return new Response(adminTemplate, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// 检查用户是否已登录
async function checkAuth(request) {
  try {
    // 从请求中获取token
    const token = getTokenFromRequest(request);
    if (!token) return false;
    
    // 验证token
    await verifyToken(token);
    return true;
  } catch (error) {
    console.error('认证失败:', error);
    return false;
  }
}

// 从请求中获取token
function getTokenFromRequest(request) {
  // 从Cookie中获取token
  const cookie = request.headers.get('Cookie');
  if (cookie) {
    const cookies = cookie.split(';').map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.substring(6);
    }
  }
  
  // 从localStorage获取token (这部分在客户端实现)
  return null;
} 