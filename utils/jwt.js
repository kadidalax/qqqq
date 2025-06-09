// JWT工具模块 - 基于jose库实现

// 使用Web Crypto API进行编码
function base64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  return arrayBufferToBase64Url(bytes);
}

// ArrayBuffer转Base64URL
function arrayBufferToBase64Url(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64URL转ArrayBuffer
function base64UrlToArrayBuffer(base64Url) {
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const padLen = (4 - (base64.length % 4)) % 4;
  const base64Padded = base64.padEnd(base64.length + padLen, '=');
  const binary = atob(base64Padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// 生成签名
async function sign(data, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  );
  return arrayBufferToBase64Url(signature);
}

// 验证签名
async function verify(data, signature, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const signatureArrayBuffer = base64UrlToArrayBuffer(signature);
  return await crypto.subtle.verify(
    'HMAC',
    key,
    signatureArrayBuffer,
    encoder.encode(data)
  );
}

// 生成JWT令牌
export async function generateToken(payload, expiresIn = '24h') {
  // JWT密钥，在实际应用中应该保存在环境变量中
  const secret = 'cf-nav-secret-key';
  
  // 头部
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  // 设置过期时间
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (expiresIn === '24h' ? 86400 : parseInt(expiresIn, 10));
  
  // 完整的载荷
  const fullPayload = {
    ...payload,
    iat: now,
    exp
  };
  
  // 编码头部和载荷
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(fullPayload));
  
  // 生成签名
  const dataToSign = `${headerEncoded}.${payloadEncoded}`;
  const signature = await sign(dataToSign, secret);
  
  // 组合JWT
  return `${dataToSign}.${signature}`;
}

// 验证JWT令牌
export async function verifyToken(token) {
  // JWT密钥，在实际应用中应该保存在环境变量中
  const secret = 'cf-nav-secret-key';
  
  // 拆分令牌
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }
  
  const [headerEncoded, payloadEncoded, signatureEncoded] = parts;
  
  // 验证签名
  const dataToVerify = `${headerEncoded}.${payloadEncoded}`;
  const isValid = await verify(dataToVerify, signatureEncoded, secret);
  
  if (!isValid) {
    throw new Error('Invalid signature');
  }
  
  // 解码载荷
  try {
    const payloadJson = atob(payloadEncoded.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);
    
    // 验证过期时间
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token has expired');
    }
    
    return payload;
  } catch (error) {
    throw new Error('Failed to decode payload');
  }
} 