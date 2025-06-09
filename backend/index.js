// 后端处理模块
import { Router } from '../router.js';
import { 
  getAllWebsites, 
  getAllCategories, 
  saveWebsite, 
  saveCategory, 
  deleteWebsite, 
  deleteCategory,
  clearCache
} from '../utils/storage.js';
import { Website, Category } from '../models/website.js';

// 后端路由处理器
export async function handleBackend(request, user) {
  const router = new Router();
  
  // 管理员验证中间件
  const isAdmin = user && user.role === 'admin';
  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // 网站相关API
  router.get('/api/websites', handleGetAllWebsites);
  router.post('/api/websites', handleCreateWebsite);
  router.put('/api/websites/:id', handleUpdateWebsite);
  router.delete('/api/websites/:id', handleDeleteWebsite);
  
  // 分类相关API
  router.get('/api/categories', handleGetAllCategories);
  router.post('/api/categories', handleCreateCategory);
  router.put('/api/categories/:id', handleUpdateCategory);
  router.delete('/api/categories/:id', handleDeleteCategory);
  
  // 缓存管理API
  router.post('/api/cache/clear', handleClearCache);
  
  return router.route(request);
}

// 获取所有网站
async function handleGetAllWebsites(request) {
  const result = await getAllWebsites();
  
  if (result.success) {
    return new Response(JSON.stringify(result.data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: result.error || '获取网站列表失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 创建网站
async function handleCreateWebsite(request) {
  try {
    const data = await request.json();
    const website = new Website(data);
    
    // 验证
    const validation = website.validate();
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 保存
    const result = await saveWebsite(website.toJSON());
    
    if (result.success) {
      return new Response(JSON.stringify(result.data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '创建网站失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 更新网站
async function handleUpdateWebsite(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.match(/\/api\/websites\/([^\/]+)/)[1];
    
    const data = await request.json();
    const website = new Website({ ...data, id });
    
    // 验证
    const validation = website.validate();
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 保存
    const result = await saveWebsite(website.toJSON());
    
    if (result.success) {
      return new Response(JSON.stringify(result.data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '更新网站失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 删除网站
async function handleDeleteWebsite(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.match(/\/api\/websites\/([^\/]+)/)[1];
    
    const result = await deleteWebsite(id);
    
    if (result.success) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '删除网站失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 获取所有分类
async function handleGetAllCategories(request) {
  const result = await getAllCategories();
  
  if (result.success) {
    return new Response(JSON.stringify(result.data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: result.error || '获取分类列表失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 创建分类
async function handleCreateCategory(request) {
  try {
    const data = await request.json();
    const category = new Category(data);
    
    // 验证
    const validation = category.validate();
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 保存
    const result = await saveCategory(category.toJSON());
    
    if (result.success) {
      return new Response(JSON.stringify(result.data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '创建分类失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 更新分类
async function handleUpdateCategory(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.match(/\/api\/categories\/([^\/]+)/)[1];
    
    const data = await request.json();
    const category = new Category({ ...data, id });
    
    // 验证
    const validation = category.validate();
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 保存
    const result = await saveCategory(category.toJSON());
    
    if (result.success) {
      return new Response(JSON.stringify(result.data), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '更新分类失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 删除分类
async function handleDeleteCategory(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.match(/\/api\/categories\/([^\/]+)/)[1];
    
    const result = await deleteCategory(id);
    
    if (result.success) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: result.error || '删除分类失败' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 清除缓存
async function handleClearCache(request) {
  clearCache();
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
} 