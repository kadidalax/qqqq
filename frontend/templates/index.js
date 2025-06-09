// 模板集合
import { homeTemplate } from './home.js';
import { adminTemplate } from './admin.js';
import { loginTemplate } from './login.js';
import { notFoundTemplate } from './404.js';

// 导出所有模板
export const templates = {
  'home': homeTemplate,
  'admin': adminTemplate,
  'login': loginTemplate,
  '404': notFoundTemplate
}; 