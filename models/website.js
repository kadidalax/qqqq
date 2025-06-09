// 网站数据模型
import { nanoid } from '../utils/nanoid.js';

// 网站数据结构
export class Website {
  constructor(data = {}) {
    this.id = data.id || nanoid();
    this.title = data.title || '';
    this.url = data.url || '';
    this.description = data.description || '';
    this.icon = data.icon || '';
    this.categoryId = data.categoryId || '';
    this.order = data.order || 0;
    this.clicks = data.clicks || 0;
    this.isFeatured = data.isFeatured || false;
    this.isVisible = data.isVisible !== undefined ? data.isVisible : true;
    this.tags = data.tags || [];
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // 验证数据是否有效
  validate() {
    if (!this.title) {
      return { valid: false, error: '网站标题不能为空' };
    }
    if (!this.url) {
      return { valid: false, error: '网站URL不能为空' };
    }
    if (!this.categoryId) {
      return { valid: false, error: '网站分类不能为空' };
    }
    
    // 验证URL格式
    try {
      new URL(this.url);
    } catch (e) {
      return { valid: false, error: '网站URL格式无效' };
    }
    
    return { valid: true };
  }

  // 转换为JSON对象
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      description: this.description,
      icon: this.icon,
      categoryId: this.categoryId,
      order: this.order,
      clicks: this.clicks,
      isFeatured: this.isFeatured,
      isVisible: this.isVisible,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // 从JSON对象创建实例
  static fromJSON(json) {
    return new Website(json);
  }
}

// 网站分类数据结构
export class Category {
  constructor(data = {}) {
    this.id = data.id || nanoid();
    this.name = data.name || '';
    this.description = data.description || '';
    this.icon = data.icon || '';
    this.color = data.color || '#000000';
    this.order = data.order || 0;
    this.isVisible = data.isVisible !== undefined ? data.isVisible : true;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // 验证数据是否有效
  validate() {
    if (!this.name) {
      return { valid: false, error: '分类名称不能为空' };
    }
    return { valid: true };
  }

  // 转换为JSON对象
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      color: this.color,
      order: this.order,
      isVisible: this.isVisible,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // 从JSON对象创建实例
  static fromJSON(json) {
    return new Category(json);
  }
} 