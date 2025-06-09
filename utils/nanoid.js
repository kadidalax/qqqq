// nanoid工具函数 - 生成唯一ID

// URL安全字符集
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

// 随机字节生成函数
function random(bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes));
}

// 生成指定长度的ID
export function nanoid(size = 21) {
  let id = '';
  const bytes = random(size);
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
} 