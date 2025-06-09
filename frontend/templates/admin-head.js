// 管理后台模板头部
export const adminHeadTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>极速导航 - 管理后台</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <style>
    :root {
      --primary-color: #3498db;
      --primary-dark: #2980b9;
      --secondary-color: #2ecc71;
      --secondary-dark: #27ae60;
      --accent-color: #9b59b6;
      --dark-color: #1e293b;
      --dark-secondary: #334155;
      --light-color: #f8fafc;
      --light-secondary: #e2e8f0;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --success-color: #2ecc71;
      --info-color: #3498db;
      --text-color: #334155;
      --text-light: #64748b;
      --border-radius: 12px;
      --border-radius-sm: 8px;
      --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --box-shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --transition: all 0.3s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f1f5f9;
      color: var(--text-color);
      line-height: 1.6;
      min-height: 100vh;
    }
    
    /* 布局 */
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    
    /* 侧边栏 */
    .sidebar {
      width: 280px;
      background: linear-gradient(180deg, var(--dark-color) 0%, var(--dark-secondary) 100%);
      color: white;
      padding: 20px 0;
      transition: var(--transition);
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      z-index: 10;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    
    .sidebar-header {
      padding: 0 20px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
      text-align: center;
    }
    
    .sidebar-logo {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .sidebar-title {
      font-size: 0.95rem;
      opacity: 0.7;
      letter-spacing: 1px;
    }
    
    .sidebar-menu {
      list-style: none;
      padding: 0 15px;
    }
    
    .sidebar-menu-item {
      margin-bottom: 8px;
    }
    
    .sidebar-menu-link {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: var(--transition);
      font-size: 0.95rem;
      border-radius: var(--border-radius-sm);
      font-weight: 500;
    }
    
    .sidebar-menu-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      transform: translateX(5px);
    }
    
    .sidebar-menu-link.active {
      background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
      color: white;
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    }
    
    .sidebar-menu-icon {
      margin-right: 12px;
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }
    
    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: 20px;
      font-size: 0.85rem;
      opacity: 0.7;
      text-align: center;
    }
    
    /* 主内容区 */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: 30px;
      transition: var(--transition);
    }
    
    /* 顶部导航 */
    .top-nav {
      background-color: white;
      padding: 18px 25px;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow-sm);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
    }
    
    .breadcrumb-item {
      color: var(--text-light);
    }
    
    .breadcrumb-item:last-child {
      color: var(--primary-color);
      font-weight: 600;
    }
    
    .breadcrumb-separator {
      font-size: 0.8rem;
      color: #cbd5e1;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: 15px;
      background-color: var(--light-secondary);
      padding: 8px 16px;
      border-radius: 50px;
    }
    
    .user-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--dark-color);
    }
    
    .btn-logout {
      background: none;
      border: none;
      color: var(--danger-color);
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 500;
      transition: var(--transition);
      padding: 5px 10px;
      border-radius: 50px;
    }
    
    .btn-logout:hover {
      background-color: rgba(231, 76, 60, 0.1);
    }
    
    /* 卡片样式 */
    .card {
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow-sm);
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid var(--light-secondary);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      border-bottom: 1px solid var(--light-secondary);
      padding-bottom: 15px;
    }
    
    .card-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--dark-color);
    }
    
    /* 按钮样式 */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      transition: var(--transition);
      gap: 8px;
    }
    
    .btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    
    .btn-sm {
      padding: 6px 12px;
      font-size: 0.85rem;
    }
    
    .btn-success {
      background-color: var(--success-color);
    }
    
    .btn-success:hover {
      background-color: var(--secondary-dark);
    }
    
    .btn-danger {
      background-color: var(--danger-color);
    }
    
    .btn-danger:hover {
      background-color: #c0392b;
    }
    
    .btn-outline {
      background-color: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-color);
      color: white;
    }
    
    /* 表格样式 */
    .table-container {
      overflow-x: auto;
      margin: 0 -10px;
    }
    
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }
    
    .table th,
    .table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid var(--light-secondary);
    }
    
    .table th {
      font-weight: 600;
      color: var(--text-light);
      background-color: #f8fafc;
    }
    
    .table tr:hover {
      background-color: #f8fafc;
    }
    
    /* 表单样式 */
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    .form-control {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid var(--light-secondary);
      border-radius: var(--border-radius-sm);
      font-size: 0.95rem;
      transition: var(--transition);
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }
    
    .form-text {
      font-size: 0.85rem;
      color: var(--text-light);
      margin-bottom: 8px;
    }
    
    /* 颜色预览 */
    .color-preview {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      display: inline-block;
    }
    
    /* 统计卡片 */
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .stat-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 20px;
      display: flex;
      align-items: center;
      border: 1px solid var(--light-secondary);
      transition: var(--transition);
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow);
    }
    
    .stat-card-icon {
      font-size: 2.5rem;
      margin-right: 15px;
      color: var(--primary-color);
      background-color: rgba(52, 152, 219, 0.1);
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
    }
    
    .stat-card:nth-child(2) .stat-card-icon {
      color: var(--secondary-color);
      background-color: rgba(46, 204, 113, 0.1);
    }
    
    .stat-card:nth-child(3) .stat-card-icon {
      color: var(--accent-color);
      background-color: rgba(155, 89, 182, 0.1);
    }
    
    .stat-card-content {
      flex: 1;
    }
    
    .stat-card-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--dark-color);
      line-height: 1.2;
    }
    
    .stat-card-label {
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    /* 模态框 */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      backdrop-filter: blur(5px);
    }
    
    .modal {
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid var(--light-secondary);
    }
    
    .modal-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--dark-color);
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-light);
      transition: var(--transition);
    }
    
    .modal-close:hover {
      color: var(--danger-color);
    }
    
    .modal-body {
      padding: 25px;
    }
    
    .modal-footer {
      padding: 20px 25px;
      border-top: 1px solid var(--light-secondary);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    /* 响应式调整 */
    @media (max-width: 1024px) {
      .sidebar {
        width: 80px;
        padding: 20px 0;
      }
      
      .sidebar-logo {
        font-size: 1.8rem;
      }
      
      .sidebar-title,
      .sidebar-menu-link span,
      .sidebar-footer {
        display: none;
      }
      
      .sidebar-menu-icon {
        margin-right: 0;
      }
      
      .sidebar-menu {
        padding: 0 10px;
      }
      
      .sidebar-menu-link {
        justify-content: center;
        padding: 15px;
      }
      
      .main-content {
        margin-left: 80px;
      }
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding: 20px;
      }
      
      .dashboard-stats {
        grid-template-columns: 1fr;
      }
      
      .card {
        padding: 20px;
      }
    }
    
    /* 动画 */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease forwards;
    }
    
    /* 加载动画 */
    .loader {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 3px solid rgba(52, 152, 219, 0.3);
      border-radius: 50%;
      border-top-color: var(--primary-color);
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* 页面标题 */
    .dashboard-header {
      margin-bottom: 30px;
    }
    
    .page-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 8px;
    }
    
    .page-subtitle {
      font-size: 1rem;
      color: var(--text-light);
    }
    
    /* 搜索框 */
    .search-container {
      position: relative;
      max-width: 300px;
    }
    
    .search-input {
      padding-left: 40px;
    }
    
    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
    }
    
    /* 过滤栏 */
    .filter-bar {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
      padding: 15px;
      background-color: #f8fafc;
      border-radius: var(--border-radius-sm);
      flex-wrap: wrap;
    }
    
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .filter-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-light);
    }
    
    .form-control-sm {
      padding: 8px 12px;
      font-size: 0.9rem;
    }
    
    /* 网站信息 */
    .website-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .website-icon {
      font-size: 1.2rem;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f1f5f9;
      border-radius: 8px;
    }
    
    .website-title {
      font-weight: 600;
    }
    
    .website-url {
      color: var(--primary-color);
      text-decoration: none;
      font-size: 0.9rem;
      display: block;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .website-url:hover {
      text-decoration: underline;
    }
    
    /* 状态标签 */
    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .status-badge-success {
      background-color: rgba(46, 204, 113, 0.1);
      color: var(--success-color);
    }
    
    .status-badge-danger {
      background-color: rgba(231, 76, 60, 0.1);
      color: var(--danger-color);
    }
    
    .status-badge-neutral {
      background-color: rgba(52, 152, 219, 0.1);
      color: var(--text-light);
    }
    
    /* 分类标签 */
    .category-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    /* 点击信息 */
    .clicks-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .clicks-count {
      font-weight: 600;
    }
    
    .clicks-bar-container {
      width: 100%;
      height: 6px;
      background-color: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .clicks-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
      border-radius: 3px;
    }
    
    /* 操作按钮 */
    .action-buttons {
      display: flex;
      gap: 5px;
    }
    
    /* 表单布局 */
    .form-row {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .form-group-half {
      flex: 1;
    }
    
    /* 复选框 */
    .checkbox-group {
      display: flex;
      gap: 20px;
    }
    
    .form-check {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .form-check input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: var(--primary-color);
    }
    
    .form-check label {
      font-weight: 500;
      cursor: pointer;
    }
    
    /* 颜色选择器 */
    .color-picker {
      height: 42px;
      padding: 5px;
      cursor: pointer;
    }
    
    /* 分类卡片 */
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .category-card {
      background-color: white;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--box-shadow-sm);
      transition: var(--transition);
      border: 1px solid var(--light-secondary);
    }
    
    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow);
    }
    
    .category-card-header {
      padding: 20px;
      position: relative;
    }
    
    .category-icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      font-size: 2rem;
      color: white;
      margin: 0 auto;
    }
    
    .category-visibility {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.6);
      padding: 3px 8px;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .category-card-body {
      padding: 20px;
    }
    
    .category-name {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 10px;
      text-align: center;
    }
    
    .category-description {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 15px;
      min-height: 40px;
      text-align: center;
    }
    
    .category-stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 15px;
    }
    
    .category-stat {
      text-align: center;
    }
    
    .category-stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      display: block;
    }
    
    .category-stat-label {
      font-size: 0.85rem;
      color: var(--text-light);
    }
    
    .category-card-footer {
      padding: 15px;
      border-top: 1px solid var(--light-secondary);
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    
    /* 设置项 */
    .settings-container {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
    
    .settings-group {
      display: flex;
      gap: 20px;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }
    
    .settings-group:hover {
      background-color: #f1f5f9;
    }
    
    .settings-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(52, 152, 219, 0.1);
      color: var(--primary-color);
      border-radius: 15px;
    }
    
    .settings-content {
      flex: 1;
    }
    
    .settings-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .settings-description {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    
    /* 系统信息 */
    .system-info {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .info-item {
      padding: 15px;
      background-color: #f8fafc;
      border-radius: var(--border-radius-sm);
    }
    
    .info-label {
      font-size: 0.85rem;
      color: var(--text-light);
      margin-bottom: 5px;
    }
    
    .info-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark-color);
    }
    
    /* 空状态 */
    .empty-state {
      text-align: center;
      padding: 40px 20px;
    }
    
    .empty-state-icon {
      font-size: 3rem;
      margin-bottom: 15px;
      color: var(--text-light);
    }
    
    .empty-state-text {
      font-size: 1.1rem;
      color: var(--text-light);
      margin-bottom: 15px;
    }
    
    .category-empty-state {
      grid-column: 1 / -1;
    }
    
    /* 通知提示 */
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 350px;
    }
    
    .toast {
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      padding: 15px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      animation: toastSlideIn 0.3s ease;
      position: relative;
    }
    
    @keyframes toastSlideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .toast-success {
      border-left: 4px solid var(--success-color);
    }
    
    .toast-error {
      border-left: 4px solid var(--danger-color);
    }
    
    .toast-warning {
      border-left: 4px solid var(--warning-color);
    }
    
    .toast-info {
      border-left: 4px solid var(--primary-color);
    }
    
    .toast-icon {
      font-size: 1.5rem;
    }
    
    .toast-content {
      flex: 1;
    }
    
    .toast-title {
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .toast-message {
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    .toast-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.2rem;
      color: var(--text-light);
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    
    .toast-close:hover {
      color: var(--dark-color);
    }
    
    /* 小型弹窗 */
    .modal-sm {
      max-width: 400px;
    }
    
    /* 用户头像 */
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <div id="app" class="admin-layout">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">🚀 <span>极速导航</span></div>
        <div class="sidebar-title">管理后台</div>
      </div>
      
      <ul class="sidebar-menu">
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link" :class="{ active: activePage === 'dashboard' }" @click="setActivePage('dashboard')">
            <span class="sidebar-menu-icon">📊</span>
            <span>控制面板</span>
          </a>
        </li>
        
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link" :class="{ active: activePage === 'websites' }" @click="setActivePage('websites')">
            <span class="sidebar-menu-icon">🌐</span>
            <span>网站管理</span>
          </a>
        </li>
        
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link" :class="{ active: activePage === 'categories' }" @click="setActivePage('categories')">
            <span class="sidebar-menu-icon">📁</span>
            <span>分类管理</span>
          </a>
        </li>
        
        <li class="sidebar-menu-item">
          <a href="#" class="sidebar-menu-link" :class="{ active: activePage === 'settings' }" @click="setActivePage('settings')">
            <span class="sidebar-menu-icon">⚙️</span>
            <span>系统设置</span>
          </a>
        </li>
      </ul>
      
      <div class="sidebar-footer">
        © {{currentYear}} 极速导航
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="main-content">`; 