// 简单的路由处理器
export class Router {
  constructor() {
    this.routes = {
      GET: new Map(),
      POST: new Map(),
      PUT: new Map(),
      DELETE: new Map(),
      PATCH: new Map(),
      HEAD: new Map(),
      OPTIONS: new Map(),
      ALL: new Map(),
    };
  }

  handle(method, pattern, handler) {
    // 支持路径参数和通配符
    const regex = this._patternToRegex(pattern);
    this.routes[method].set(regex, handler);
    return this;
  }

  get(pattern, handler) {
    return this.handle('GET', pattern, handler);
  }

  post(pattern, handler) {
    return this.handle('POST', pattern, handler);
  }

  put(pattern, handler) {
    return this.handle('PUT', pattern, handler);
  }

  delete(pattern, handler) {
    return this.handle('DELETE', pattern, handler);
  }

  patch(pattern, handler) {
    return this.handle('PATCH', pattern, handler);
  }

  all(pattern, handler) {
    return this.handle('ALL', pattern, handler);
  }

  async route(request) {
    const method = request.method;
    const url = new URL(request.url);
    const path = url.pathname;

    // 尝试匹配特定方法的路由
    const handler = this._findHandler(method, path);
    
    // 如果没有找到特定方法的路由，尝试ALL方法的路由
    if (!handler && method !== 'ALL') {
      const allHandler = this._findHandler('ALL', path);
      if (allHandler) {
        return await allHandler(request);
      }
    }

    if (handler) {
      return await handler(request);
    }

    // 如果没有找到匹配的路由，返回404
    return new Response('Not Found', { status: 404 });
  }

  _findHandler(method, path) {
    for (const [pattern, handler] of this.routes[method].entries()) {
      const match = path.match(pattern);
      if (match) {
        return handler;
      }
    }
    return null;
  }

  _patternToRegex(pattern) {
    // 将路由模式转换为正则表达式
    // 例如: '/users/:id' => /^\/users\/([^\/]+)$/
    // '*' => /^(.*)$/
    if (pattern === '*') {
      return /^(.*)$/;
    }

    if (pattern.endsWith('/*')) {
      const base = pattern.slice(0, -2).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`^${base}\\/(.*)$`);
    }

    const regexStr = pattern
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace(/:(\w+)/g, '([^\\/]+)');
    
    return new RegExp(`^${regexStr}$`);
  }
} 