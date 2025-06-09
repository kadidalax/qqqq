// 模板渲染模块
import { templates } from './templates/index.js';

// 简单的模板渲染函数
export async function renderTemplate(templateName, data = {}) {
  // 获取模板
  const template = templates[templateName];
  if (!template) {
    throw new Error(`Template "${templateName}" not found`);
  }
  
  // 渲染模板
  return await renderTemplateString(template, data);
}

// 渲染模板字符串
async function renderTemplateString(template, data) {
  let result = template;
  
  // 替换变量
  const variableRegex = /\{\{\s*([^}]+)\s*\}\}/g;
  result = result.replace(variableRegex, (match, path) => {
    const value = getValueByPath(data, path.trim());
    return value !== undefined ? value : '';
  });
  
  // 处理条件语句 {{#if condition}} content {{/if}}
  const conditionalRegex = /\{\{#if\s+([^}]+)\s*\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(conditionalRegex, (match, condition, content) => {
    const value = getValueByPath(data, condition.trim());
    return value ? content : '';
  });
  
  // 处理循环语句 {{#each items}} content {{/each}}
  const loopRegex = /\{\{#each\s+([^}]+)\s*\}\}([\s\S]*?)\{\{\/each\}\}/g;
  result = await processLoops(result, data, loopRegex);
  
  return result;
}

// 处理循环语句
async function processLoops(template, data, regex) {
  let result = template;
  let match;
  
  // 使用while循环处理所有匹配项
  while ((match = regex.exec(template)) !== null) {
    const [fullMatch, path, content] = match;
    const items = getValueByPath(data, path.trim());
    
    if (Array.isArray(items)) {
      let replacement = '';
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // 创建循环项上下文
        const itemContext = {
          ...data,
          this: item,
          '@index': i,
          '@first': i === 0,
          '@last': i === items.length - 1
        };
        // 递归处理循环项内容
        replacement += await renderTemplateString(content, itemContext);
      }
      
      // 替换匹配项
      result = result.replace(fullMatch, replacement);
      // 重置正则表达式以继续匹配
      regex.lastIndex = 0;
    } else {
      // 如果不是数组，替换为空字符串
      result = result.replace(fullMatch, '');
      // 重置正则表达式以继续匹配
      regex.lastIndex = 0;
    }
  }
  
  return result;
}

// 根据路径获取对象中的值
function getValueByPath(obj, path) {
  // 处理特殊路径 'this'
  if (path === 'this') {
    return obj;
  }
  
  // 处理嵌套路径
  const parts = path.split('.');
  let value = obj;
  
  for (const part of parts) {
    if (value === undefined || value === null) {
      return undefined;
    }
    
    // 检查是否为数组索引
    if (/^\d+$/.test(part) && Array.isArray(value)) {
      value = value[parseInt(part, 10)];
    } else {
      value = value[part];
    }
  }
  
  return value;
} 