// 认证处理模块
import { generateToken, verifyToken } from './utils/jwt.js';

export async function handleAuth(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 登录路由特殊处理
  if (path === '/api/auth/login' && request.method === 'POST') {
    return await handleLogin(request);
  }
  
  // 验证token
  const token = getTokenFromRequest(request);
  if (!token) {
    return { status: 'error', message: 'No token provided' };
  }
  
  try {
    const payload = await verifyToken(token);
    return { status: 'success', user: payload };
  } catch (error) {
    return { status: 'error', message: 'Invalid token' };
  }
}

async function handleLogin(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    console.log("Login attempt:", username, password);
    
    // 在实际应用中，这里应该查询数据库验证用户信息
    // 这里简化处理，使用固定的管理员账号
    if (username === 'admin' && password === 'admin123') {
      // 生成JWT令牌
      const token = await generateToken({ 
        id: '1', 
        username: 'admin',
        role: 'admin'
      });
      
      return { 
        status: 'success', 
        user: { id: '1', username: 'admin', role: 'admin' },
        token
      };
    }
    
    console.log("Login failed");
    return { status: 'error', message: 'Invalid credentials' };
  } catch (error) {
    console.log("Login error:", error);
    return { status: 'error', message: 'Failed to parse request body' };
  }
}

function getTokenFromRequest(request) {
  // 从请求头获取token
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // 从cookie获取token
  const cookie = request.headers.get('Cookie');
  if (cookie) {
    const cookies = cookie.split(';').map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.substring(6);
    }
  }
  
  // 从URL参数获取token
  const url = new URL(request.url);
  return url.searchParams.get('token');
} 