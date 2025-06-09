# CF-NAV 网站导航

一个酷炫的网站导航项目，可部署在Cloudflare Workers上。包含前台导航界面和后台管理系统。

## 🚀 一键部署

只需点击下方按钮，即可一键部署到Cloudflare Workers：

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/arebotx/cf-nav)

部署步骤：
1. 点击上方的"Deploy to Cloudflare Workers"按钮
2. 登录您的Cloudflare账号
3. 按照指引操作，系统会自动为您创建Worker和KV命名空间
4. 部署完成后，您可以直接访问生成的网站
5. 访问 `/admin` 路径进入后台管理，默认账号: `admin` 密码: `admin123`

## 功能特点

- 🚀 响应式设计，完美适配各种设备
- 🌙 支持明/暗主题切换
- 🔍 内置搜索功能
- 📊 网站访问统计
- 📁 分类管理
- 🌐 网站管理
- 👑 后台管理系统
- ☁️ 基于Cloudflare Workers，全球CDN加速

## 技术栈

- Cloudflare Workers
- Cloudflare KV 存储
- 原生JavaScript + Vue 3 (后台管理)
- 纯CSS，无需任何UI框架

## 使用说明

### 基本使用

1. 访问网站首页，即可查看所有分类和网站
2. 点击网站卡片，会记录点击次数并跳转到目标网站
3. 使用右上角搜索框可以快速查找网站

### 后台管理

1. 访问 `/admin` 路径进入后台管理
2. 使用默认账号登录: 用户名 `admin` 密码 `admin123`
3. 可以添加、编辑、删除分类和网站
4. 可以设置网站是否推荐、是否显示等

## 自定义与扩展

### 更改默认账号

修改 `auth.js` 文件中的默认账号和密码：

```javascript
if (username === 'admin' && password === 'admin123') {
  // 修改为自己的账号密码
}
```

### 添加新功能

项目结构清晰，可以轻松扩展新功能：

- `index.js`: 主入口文件
- `router.js`: 路由处理器
- `auth.js`: 认证模块
- `frontend/`: 前台相关代码
- `backend/`: 后台API
- `models/`: 数据模型
- `utils/`: 工具函数

## 贡献

欢迎提交Pull Request或Issue!

## 许可证

MIT 