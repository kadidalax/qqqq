// 登录页面模板
export const loginTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理员登录 - 极速导航</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <style>
    :root {
      --primary-color: #3498db;
      --primary-dark: #2980b9;
      --secondary-color: #2ecc71;
      --accent-color: #9b59b6;
      --dark-color: #2c3e50;
      --light-color: #ecf0f1;
      --danger-color: #e74c3c;
      --text-color: #333;
      --text-light: #7f8c8d;
      --border-radius: 12px;
      --box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      --transition: all 0.3s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, #3498db 0%, #9b59b6 100%);
      color: var(--text-color);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      z-index: -1;
    }
    
    .login-container {
      max-width: 420px;
      width: 100%;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      padding: 40px;
      position: relative;
      overflow: hidden;
    }
    
    .login-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 35px;
    }
    
    .login-logo {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 15px;
      display: inline-block;
    }
    
    .login-title {
      font-size: 1.8rem;
      color: var(--dark-color);
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .login-subtitle {
      font-size: 1rem;
      color: var(--text-light);
    }
    
    .login-form {
      margin-bottom: 25px;
    }
    
    .form-group {
      margin-bottom: 25px;
      position: relative;
    }
    
    .form-label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
      color: var(--dark-color);
      font-size: 0.95rem;
    }
    
    .form-control {
      width: 100%;
      padding: 15px;
      border: 2px solid #e0e0e0;
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: var(--transition);
      background-color: #f9f9f9;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.15);
      background-color: white;
    }
    
    .form-icon {
      position: absolute;
      right: 15px;
      top: 45px;
      color: var(--text-light);
      font-size: 1.2rem;
    }
    
    .btn {
      display: block;
      width: 100%;
      padding: 15px;
      background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 600;
      transition: var(--transition);
      text-align: center;
      font-size: 1.1rem;
      margin-top: 30px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: var(--transition);
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    }
    
    .btn:hover::before {
      left: 100%;
      transition: 0.7s;
    }
    
    .btn:active {
      transform: translateY(0);
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    }
    
    .login-footer {
      text-align: center;
      margin-top: 35px;
      font-size: 0.95rem;
      color: var(--text-light);
      position: relative;
      padding-top: 15px;
    }
    
    .login-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 25%;
      width: 50%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
    }
    
    .login-footer a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .login-footer a:hover {
      color: var(--primary-dark);
    }
    
    .alert {
      padding: 15px;
      border-radius: var(--border-radius);
      margin-bottom: 25px;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
    }
    
    .alert-danger {
      background-color: rgba(231, 76, 60, 0.1);
      color: var(--danger-color);
      border-left: 4px solid var(--danger-color);
    }
    
    .alert-icon {
      margin-right: 10px;
      font-size: 1.2rem;
    }
    
    /* 动画效果 */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .login-container {
      animation: fadeIn 0.6s ease forwards;
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
    }
    
    /* 响应式调整 */
    @media (max-width: 480px) {
      .login-container {
        padding: 30px 20px;
      }
      
      .login-logo {
        font-size: 2.5rem;
      }
      
      .login-title {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <div class="login-logo">🚀</div>
      <h1 class="login-title">管理员登录</h1>
      <p class="login-subtitle">登录后台管理您的网站导航</p>
    </div>
    
    <div id="alert-box" style="display: none;" class="alert alert-danger">
      <span class="alert-icon">⚠️</span>
      <span id="alert-message"></span>
    </div>
    
    <form class="login-form" id="login-form">
      <div class="form-group">
        <label for="username" class="form-label">用户名</label>
        <input type="text" id="username" name="username" class="form-control" placeholder="请输入用户名" required autocomplete="username">
        <span class="form-icon">👤</span>
      </div>
      
      <div class="form-group">
        <label for="password" class="form-label">密码</label>
        <input type="password" id="password" name="password" class="form-control" placeholder="请输入密码" required autocomplete="current-password">
        <span class="form-icon" id="password-toggle">👁️</span>
      </div>
      
      <button type="submit" class="btn" id="login-btn">
        <span id="btn-text">登 录</span>
        <span id="btn-loading" style="display: none;">处理中...</span>
      </button>
    </form>
    
    <div class="login-footer">
      <p>返回 <a href="/">网站首页</a></p>
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const loginForm = document.getElementById('login-form');
      const alertBox = document.getElementById('alert-box');
      const alertMessage = document.getElementById('alert-message');
      const loginBtn = document.getElementById('login-btn');
      const btnText = document.getElementById('btn-text');
      const btnLoading = document.getElementById('btn-loading');
      const passwordField = document.getElementById('password');
      const passwordToggle = document.getElementById('password-toggle');
      
      // 密码显示切换
      passwordToggle.addEventListener('click', function() {
        if (passwordField.type === 'password') {
          passwordField.type = 'text';
          passwordToggle.textContent = '👁️‍🗨️';
        } else {
          passwordField.type = 'password';
          passwordToggle.textContent = '👁️';
        }
      });
      
      // 表单提交处理
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 显示加载状态
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        loginBtn.disabled = true;
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
          });
          
          const data = await response.json();
          
          if (data.status === 'success') {
            // 保存令牌到本地存储
            localStorage.setItem('authToken', data.token);
            
            // 同时设置Cookie，便于服务器端验证
            document.cookie = "token=" + data.token + "; path=/; max-age=86400; SameSite=Strict";
            
            // 显示成功信息
            alertBox.className = 'alert alert-success';
            alertMessage.textContent = '登录成功，正在跳转...';
            alertBox.style.display = 'flex';
            
            // 重定向到管理后台
            setTimeout(() => {
              window.location.href = '/admin';
            }, 1000);
          } else {
            // 显示错误消息
            alertBox.className = 'alert alert-danger';
            alertMessage.textContent = data.message || '登录失败，请检查用户名和密码';
            alertBox.style.display = 'flex';
            loginForm.classList.add('shake');
            
            // 移除动画类
            setTimeout(() => {
              loginForm.classList.remove('shake');
            }, 500);
            
            // 恢复按钮状态
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            loginBtn.disabled = false;
          }
        } catch (error) {
          alertBox.className = 'alert alert-danger';
          alertMessage.textContent = '登录请求失败，请稍后再试';
          alertBox.style.display = 'flex';
          
          // 恢复按钮状态
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
          loginBtn.disabled = false;
        }
      });
      
      // 自动聚焦用户名输入框
      document.getElementById('username').focus();
    });
  </script>
</body>
</html>`; 