// 数据存储模块 - 使用Cloudflare KV存储

// 数据缓存
const cache = {
  websites: null,
  categories: null
};

// 默认数据
const defaultData = {
  websites: [],
  categories: [
    {
      id: 'default',
      name: '默认分类',
      description: '默认网站分类',
      icon: 'folder',
      color: '#3498db',
      order: 0,
      isVisible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

// 初始化存储
export async function initStorage() {
  try {
    // 检查网站数据是否存在
    const websites = await SITES_KV.get('websites', { type: 'json' });
    if (!websites) {
      // 写入默认数据
      await SITES_KV.put('websites', JSON.stringify(defaultData.websites));
    }
    
    // 检查分类数据是否存在
    const categories = await SITES_KV.get('categories', { type: 'json' });
    if (!categories) {
      // 写入默认数据
      await SITES_KV.put('categories', JSON.stringify(defaultData.categories));
    }
    
    return { success: true };
  } catch (error) {
    console.error('初始化存储失败:', error);
    return { success: false, error };
  }
}

// 获取所有网站
export async function getAllWebsites() {
  try {
    if (cache.websites) {
      return { success: true, data: cache.websites };
    }
    
    const websites = await SITES_KV.get('websites', { type: 'json' }) || [];
    cache.websites = websites;
    return { success: true, data: websites };
  } catch (error) {
    console.error('获取网站列表失败:', error);
    return { success: false, error };
  }
}

// 获取所有分类
export async function getAllCategories() {
  try {
    if (cache.categories) {
      return { success: true, data: cache.categories };
    }
    
    const categories = await SITES_KV.get('categories', { type: 'json' }) || defaultData.categories;
    cache.categories = categories;
    return { success: true, data: categories };
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return { success: false, error };
  }
}

// 保存网站
export async function saveWebsite(website) {
  try {
    const { success, data } = await getAllWebsites();
    if (!success) {
      return { success: false, error: '获取网站列表失败' };
    }
    
    const websites = data;
    const index = websites.findIndex(item => item.id === website.id);
    
    // 更新或添加
    if (index !== -1) {
      websites[index] = { ...website, updatedAt: new Date().toISOString() };
    } else {
      websites.push(website);
    }
    
    // 保存到KV
    await SITES_KV.put('websites', JSON.stringify(websites));
    
    // 更新缓存
    cache.websites = websites;
    
    return { success: true, data: website };
  } catch (error) {
    console.error('保存网站失败:', error);
    return { success: false, error };
  }
}

// 保存分类
export async function saveCategory(category) {
  try {
    const { success, data } = await getAllCategories();
    if (!success) {
      return { success: false, error: '获取分类列表失败' };
    }
    
    const categories = data;
    const index = categories.findIndex(item => item.id === category.id);
    
    // 更新或添加
    if (index !== -1) {
      categories[index] = { ...category, updatedAt: new Date().toISOString() };
    } else {
      categories.push(category);
    }
    
    // 保存到KV
    await SITES_KV.put('categories', JSON.stringify(categories));
    
    // 更新缓存
    cache.categories = categories;
    
    return { success: true, data: category };
  } catch (error) {
    console.error('保存分类失败:', error);
    return { success: false, error };
  }
}

// 删除网站
export async function deleteWebsite(websiteId) {
  try {
    const { success, data } = await getAllWebsites();
    if (!success) {
      return { success: false, error: '获取网站列表失败' };
    }
    
    const websites = data;
    const index = websites.findIndex(item => item.id === websiteId);
    
    if (index === -1) {
      return { success: false, error: '网站不存在' };
    }
    
    // 删除
    websites.splice(index, 1);
    
    // 保存到KV
    await SITES_KV.put('websites', JSON.stringify(websites));
    
    // 更新缓存
    cache.websites = websites;
    
    return { success: true };
  } catch (error) {
    console.error('删除网站失败:', error);
    return { success: false, error };
  }
}

// 删除分类
export async function deleteCategory(categoryId) {
  try {
    // 检查是否有网站使用该分类
    const { success: websitesSuccess, data: websites } = await getAllWebsites();
    if (websitesSuccess) {
      const hasWebsites = websites.some(website => website.categoryId === categoryId);
      if (hasWebsites) {
        return { success: false, error: '该分类下还有网站，无法删除' };
      }
    }
    
    const { success, data } = await getAllCategories();
    if (!success) {
      return { success: false, error: '获取分类列表失败' };
    }
    
    const categories = data;
    const index = categories.findIndex(item => item.id === categoryId);
    
    if (index === -1) {
      return { success: false, error: '分类不存在' };
    }
    
    // 删除
    categories.splice(index, 1);
    
    // 保存到KV
    await SITES_KV.put('categories', JSON.stringify(categories));
    
    // 更新缓存
    cache.categories = categories;
    
    return { success: true };
  } catch (error) {
    console.error('删除分类失败:', error);
    return { success: false, error };
  }
}

// 清除缓存
export function clearCache() {
  cache.websites = null;
  cache.categories = null;
} 