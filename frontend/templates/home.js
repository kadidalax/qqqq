// 主页模板
export const homeTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="一个酷炫的网站导航">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
  <style>
    /* 基础样式 */
    :root {
      --primary-color: #3498db;
      --primary-dark: #2980b9;
      --secondary-color: #2ecc71;
      --secondary-dark: #27ae60;
      --accent-color: #9b59b6;
      --dark-color: #2c3e50;
      --light-color: #ecf0f1;
      --danger-color: #e74c3c;
      --warning-color: #f39c12;
      --text-color: #333;
      --text-light: #7f8c8d;
      --border-radius: 12px;
      --box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      --transition: all 0.3s ease;
      --card-hover-transform: translateY(-5px);
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
      padding: 20px;
      transition: var(--transition);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    /* 头部样式 */
    header {
      text-align: center;
      margin-bottom: 40px;
      position: relative;
      animation: fadeIn 0.8s ease-out;
    }
    
    .logo {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 10px;
      position: relative;
      display: inline-block;
      padding: 0 10px;
    }
    
    .logo::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--accent-color), var(--secondary-color));
      border-radius: 2px;
      opacity: 0.7;
    }
    
    .slogan {
      font-size: 1.1rem;
      color: var(--text-light);
      margin-bottom: 30px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .header-actions {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 500;
      transition: var(--transition);
      text-decoration: none;
      font-size: 0.95rem;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
      background-color: var(--primary-dark);
    }
    
    .btn:active {
      transform: translateY(-1px);
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
    
    /* 搜索框样式 */
    .search-container {
      display: flex;
      max-width: 600px;
      margin: 0 auto 40px;
      position: relative;
    }
    
    .search-input {
      width: 100%;
      padding: 15px 20px;
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
      box-shadow: var(--box-shadow);
      transition: var(--transition);
      background-color: rgba(255, 255, 255, 0.9);
    }
    
    .search-input:focus {
      outline: none;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      background-color: white;
    }
    
    .search-btn {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color);
      font-size: 1.3rem;
      transition: var(--transition);
    }
    
    .search-btn:hover {
      transform: translateY(-50%) scale(1.1);
      color: var(--primary-dark);
    }
    
    /* 推荐网站区域 */
    .featured-section {
      margin-bottom: 50px;
      position: relative;
      overflow: hidden;
      animation: slideUp 0.6s ease-out;
    }
    
    .section-title {
      font-size: 1.6rem;
      margin-bottom: 25px;
      font-weight: 700;
      color: var(--dark-color);
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }
    
    .section-title::after {
      content: '';
      flex: 1;
      height: 2px;
      background: linear-gradient(90deg, var(--dark-color) 0%, transparent 100%);
      opacity: 0.2;
      border-radius: 1px;
    }
    
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
      margin-bottom: 30px;
    }
    
    /* 网站卡片样式 */
    .site-card {
      display: flex;
      align-items: center;
      padding: 18px;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      transition: var(--transition);
      text-decoration: none;
      color: var(--text-color);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .site-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
      opacity: 0;
      transition: var(--transition);
    }
    
    .site-card:hover {
      transform: var(--card-hover-transform);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }
    
    .site-card:hover::before {
      opacity: 1;
    }
    
    .site-icon {
      width: 48px;
      height: 48px;
      margin-right: 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      background-color: var(--light-color);
      overflow: hidden;
      flex-shrink: 0;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
      transition: var(--transition);
    }
    
    .site-card:hover .site-icon {
      transform: scale(1.05);
    }
    
    .site-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .site-info {
      flex: 1;
      overflow: hidden;
    }
    
    .site-title {
      font-weight: 600;
      margin-bottom: 5px;
      font-size: 1.1rem;
      color: var(--dark-color);
      transition: var(--transition);
    }
    
    .site-card:hover .site-title {
      color: var(--primary-color);
    }
    
    .site-desc {
      font-size: 0.85rem;
      color: var(--text-light);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      transition: var(--transition);
    }
    
    /* 分类网站区域 */
    .categories-section {
      margin-bottom: 60px;
    }
    
    .category {
      margin-bottom: 50px;
      animation: fadeIn 0.5s ease forwards;
      opacity: 0;
    }
    
    .category-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .category-icon {
      font-size: 1.5rem;
      margin-right: 12px;
      color: var(--primary-color);
      background-color: rgba(52, 152, 219, 0.1);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    
    .category-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--dark-color);
    }
    
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }
    
    /* 页脚样式 */
    footer {
      text-align: center;
      padding: 40px 0 30px;
      color: var(--text-light);
      opacity: 0.8;
      font-size: 0.9rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      margin-top: 30px;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 15px;
    }
    
    .footer-link {
      color: var(--primary-color);
      text-decoration: none;
      transition: var(--transition);
      position: relative;
    }
    
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: var(--primary-color);
      transition: var(--transition);
    }
    
    .footer-link:hover {
      color: var(--primary-dark);
    }
    
    .footer-link:hover::after {
      width: 100%;
    }
    
    /* 响应式调整 */
    @media (max-width: 768px) {
      .featured-grid, .category-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
      }
      
      .logo {
        font-size: 2.2rem;
      }
      
      .slogan {
        font-size: 0.95rem;
      }
      
      .section-title {
        font-size: 1.4rem;
      }
      
      .category-title {
        font-size: 1.3rem;
      }
    }
    
    @media (max-width: 480px) {
      .featured-grid, .category-grid {
        grid-template-columns: 1fr;
      }
      
      .container {
        padding: 15px;
      }
      
      .logo {
        font-size: 1.8rem;
      }
      
      .header-actions {
        flex-direction: column;
        gap: 10px;
      }
      
      .btn {
        width: 100%;
        text-align: center;
      }
    }
    
    /* 主题切换按钮 */
    .theme-toggle {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--dark-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--box-shadow);
      z-index: 100;
      transition: var(--transition);
      font-size: 1.3rem;
    }
    
    .theme-toggle:hover {
      transform: scale(1.1) rotate(15deg);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    /* 暗色主题 */
    body.dark-theme {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #eaeaea;
    }
    
    body.dark-theme .site-card {
      background-color: #2c3e50;
      color: #eaeaea;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }
    
    body.dark-theme .site-title {
      color: #ecf0f1;
    }
    
    body.dark-theme .site-desc {
      color: #bdc3c7;
    }
    
    body.dark-theme .search-input {
      background-color: rgba(44, 62, 80, 0.9);
      color: #eaeaea;
    }
    
    body.dark-theme .search-input::placeholder {
      color: #95a5a6;
    }
    
    body.dark-theme .search-btn {
      color: #ecf0f1;
    }
    
    body.dark-theme .section-title,
    body.dark-theme .category-title {
      color: #ecf0f1;
    }
    
    body.dark-theme .theme-toggle {
      background-color: #ecf0f1;
      color: #2c3e50;
    }
    
    body.dark-theme .footer-link {
      color: #3498db;
    }
    
    body.dark-theme .category-header {
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }
    
    body.dark-theme footer {
      border-top-color: rgba(255, 255, 255, 0.05);
      color: #95a5a6;
    }
    
    body.dark-theme .site-icon {
      background-color: #34495e;
    }
    
    body.dark-theme .category-icon {
      background-color: rgba(52, 152, 219, 0.2);
    }

    /* 动画效果 */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .category:nth-child(1) { animation-delay: 0.1s; }
    .category:nth-child(2) { animation-delay: 0.2s; }
    .category:nth-child(3) { animation-delay: 0.3s; }
    .category:nth-child(4) { animation-delay: 0.4s; }
    .category:nth-child(5) { animation-delay: 0.5s; }
    .category:nth-child(6) { animation-delay: 0.6s; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1 class="logo">🚀 极速导航</h1>
      <p class="slogan">发现精彩网站，开启网络探索之旅</p>
      
      <div class="header-actions">
        <a href="/admin" class="btn btn-outline">管理后台</a>
        <a href="#" class="btn" id="randomSiteBtn">随机访问</a>
      </div>
      
      <div class="search-container">
        <input type="text" class="search-input" placeholder="搜索网站..." id="searchInput">
        <button class="search-btn" id="searchBtn">🔍</button>
      </div>
    </header>
    
    {{#if featuredWebsites.length}}
    <section class="featured-section">
      <h2 class="section-title">⭐ 推荐网站</h2>
      <div class="featured-grid">
        {{#each featuredWebsites}}
        <a href="/visit/{{this.id}}" class="site-card" target="_blank" rel="noopener" data-id="{{this.id}}">
          <div class="site-icon">
            {{#if this.icon}}
            <img src="{{this.icon}}" alt="{{this.title}}">
            {{else}}
            🌐
            {{/if}}
          </div>
          <div class="site-info">
            <h3 class="site-title">{{this.title}}</h3>
            <p class="site-desc">{{this.description}}</p>
          </div>
        </a>
        {{/each}}
      </div>
    </section>
    {{/if}}
    
    <section class="categories-section">
      {{#each categories}}
      <div class="category">
        <div class="category-header">
          <span class="category-icon">{{this.icon}}</span>
          <h2 class="category-title">{{this.name}}</h2>
        </div>
        
        <div class="category-grid">
          {{#each websitesByCategory[this.id].websites}}
          <a href="/visit/{{this.id}}" class="site-card" target="_blank" rel="noopener" data-id="{{this.id}}">
            <div class="site-icon">
              {{#if this.icon}}
              <img src="{{this.icon}}" alt="{{this.title}}">
              {{else}}
              🌐
              {{/if}}
            </div>
            <div class="site-info">
              <h3 class="site-title">{{this.title}}</h3>
              <p class="site-desc">{{this.description}}</p>
            </div>
          </a>
          {{/each}}
        </div>
      </div>
      {{/each}}
    </section>
    
    <footer>
      <div class="footer-links">
        <a href="#" class="footer-link">关于我们</a>
        <a href="#" class="footer-link">使用条款</a>
        <a href="#" class="footer-link">隐私政策</a>
        <a href="#" class="footer-link">联系我们</a>
      </div>
      <p>© {{currentYear}} 极速导航 - 由 Cloudflare Workers 提供支持</p>
    </footer>
  </div>
  
  <div class="theme-toggle" id="themeToggle">🌓</div>
  
  <script>
    // 主题切换
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    });
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const siteCards = document.querySelectorAll('.site-card');
    
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (!searchTerm) {
        siteCards.forEach(card => {
          card.style.display = 'flex';
        });
        document.querySelectorAll('.category').forEach(category => {
          category.style.display = 'block';
        });
        return;
      }
      
      let foundResults = false;
      
      siteCards.forEach(card => {
        const title = card.querySelector('.site-title').textContent.toLowerCase();
        const desc = card.querySelector('.site-desc').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || desc.includes(searchTerm)) {
          card.style.display = 'flex';
          foundResults = true;
          
          // 高亮匹配的文本
          highlightText(card.querySelector('.site-title'), title, searchTerm);
          highlightText(card.querySelector('.site-desc'), desc, searchTerm);
        } else {
          card.style.display = 'none';
        }
      });
      
      // 隐藏没有匹配项的分类
      document.querySelectorAll('.category').forEach(category => {
        const visibleCards = category.querySelectorAll('.site-card[style="display: flex;"]');
        if (visibleCards.length === 0) {
          category.style.display = 'none';
        } else {
          category.style.display = 'block';
        }
      });
    }
    
    function highlightText(element, originalText, searchTerm) {
      // 恢复原始文本
      element.textContent = element.getAttribute('data-original') || element.textContent;
      
      if (!searchTerm) return;
      
      // 存储原始文本
      if (!element.getAttribute('data-original')) {
        element.setAttribute('data-original', element.textContent);
      }
      
      const regex = new RegExp(searchTerm, 'gi');
      element.innerHTML = element.textContent.replace(regex, function(match) {
        return '<span style="background-color: rgba(52, 152, 219, 0.2); border-radius: 2px; padding: 0 2px;">' + match + '</span>';
      });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
    
    // 随机访问功能
    const randomSiteBtn = document.getElementById('randomSiteBtn');
    
    randomSiteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const visibleCards = Array.from(siteCards).filter(card => 
        window.getComputedStyle(card).display !== 'none'
      );
      
      if (visibleCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * visibleCards.length);
        const randomCard = visibleCards[randomIndex];
        
        // 添加动画效果
        randomCard.style.transition = 'all 0.3s ease';
        randomCard.style.transform = 'scale(1.05)';
        randomCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        
        setTimeout(() => {
          window.open(randomCard.href, '_blank');
          
          // 恢复样式
          setTimeout(() => {
            randomCard.style.transform = '';
            randomCard.style.boxShadow = '';
          }, 300);
        }, 300);
      }
    });
  </script>
</body>
</html>`; 