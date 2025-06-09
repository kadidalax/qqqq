// Cloudflare Worker入口文件
import { Router } from './router.js';
import { handleFrontend } from './frontend/index.js';
import { handleBackend } from './backend/index.js';
import { handleAuth } from './auth.js';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const router = new Router();
  
  // 静态资源处理
  router.get('/assets/*', async req => {
    const url = new URL(req.url);
    const path = url.pathname.replace('/assets/', '');
    return await handleAssets(path);
  });
  
  // API路由
  router.all('/api/*', async req => {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // 登录接口不需要验证
    if (path === '/api/auth/login') {
      const authResult = await handleAuth(req);
      return new Response(JSON.stringify(authResult), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 其他API需要验证
    const authResult = await handleAuth(req);
    if (authResult.status === 'error') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return await handleBackend(req, authResult.user);
  });
  
  // 管理后台路由
  router.get('/admin*', async req => {
    return await handleFrontend(req);
  });
  
  // 登录页面路由
  router.get('/login', async req => {
    return await handleFrontend(req);
  });
  
  // 前台页面路由
  router.get('*', async req => {
    return await handleFrontend(req);
  });
  
  return router.route(request);
}

async function handleAssets(path) {
  // 在实际项目中，这里会从KV存储或其他地方获取静态资源
  return new Response('Asset not found', { status: 404 });
} 