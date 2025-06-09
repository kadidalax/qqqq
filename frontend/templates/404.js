// 404页面模板
export const notFoundTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面未找到 - 404</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <style>
    :root {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --dark-color: #2c3e50;
      --light-color: #ecf0f1;
      --text-color: #333;
      --border-radius: 12px;
      --box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      --transition: all 0.3s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: var(--text-color);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      text-align: center;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }
    
    .error-code {
      font-size: 6rem;
      font-weight: 900;
      line-height: 1;
      margin-bottom: 20px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .error-title {
      font-size: 2rem;
      margin-bottom: 20px;
      color: var(--dark-color);
    }
    
    .error-message {
      font-size: 1.1rem;
      margin-bottom: 30px;
      color: #666;
    }
    
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 500;
      transition: var(--transition);
      text-decoration: none;
      font-size: 1rem;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .spacecraft {
      margin-bottom: 30px;
      font-size: 5rem;
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
      100% {
        transform: translateY(0px) rotate(0deg);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="spacecraft">🚀</div>
    <h1 class="error-code">404</h1>
    <h2 class="error-title">页面未找到</h2>
    <p class="error-message">抱歉，您访问的页面可能已被移除或暂时不可用。</p>
    <a href="/" class="btn">返回首页</a>
  </div>
</body>
</html>`; 