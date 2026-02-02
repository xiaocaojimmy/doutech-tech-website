/* ============================================
   DoudingTech 科技风交互系统
   完整设计系统重构 - 2026-02-02
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DoudingTech 科技风交互系统已加载');
  
  // ============================================
  // 1. 初始化函数
  // ============================================
  
  function init() {
    console.log('🎨 初始化科技风设计系统...');
    
    // 检查并添加必要的类
    addTechClasses();
    
    // 初始化组件
    initNavigation();
    initSmoothScroll();
    initFormValidation();
    initIntersectionObserver();
    initDynamicBackground();
    
    // 性能优化：延迟加载非关键资源
    deferNonCriticalResources();
    
    console.log('✅ 科技风设计系统初始化完成');
  }
  
  // ============================================
  // 2. 基础样式增强
  // ============================================
  
  function addTechClasses() {
    // 为body添加科技风类
    document.body.classList.add('tech-theme');
    
    // 为导航栏添加科技风类
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('tech-navbar');
      navbar.classList.remove('navbar');
    }
    
    // 为英雄区域添加科技风类
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('tech-hero');
      hero.classList.remove('hero');
    }
    
    // 为卡片添加玻璃态效果
    const cards = document.querySelectorAll('.feature-card, .advantage-item, .contact-info');
    cards.forEach(card => {
      card.classList.add('glass-card');
    });
    
    // 为按钮添加科技风样式
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      if (button.classList.contains('btn-primary')) {
        button.classList.remove('btn-primary');
        button.classList.add('tech-button');
      } else if (button.classList.contains('btn-secondary')) {
        button.classList.remove('btn-secondary');
        button.classList.add('tech-button', 'secondary');
      }
    });
    
    // 为容器添加科技风类
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
      container.classList.add('tech-container');
    });
  }
  
  // ============================================
  // 3. 导航系统
  // ============================================
  
  function initNavigation() {
    console.log('🔧 初始化导航系统...');
    
    // 获取导航元素
    const navLinks = document.querySelectorAll('.tech-nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.tech-nav-menu');
    
    // 高亮当前活动链接
    function highlightActiveLink() {
      const currentPath = window.location.hash || window.location.pathname;
      
      navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPath || 
            (currentPath === '' && linkPath === '#') ||
            (currentPath.includes(linkPath) && linkPath !== '#')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
    
    // 初始化时高亮链接
    highlightActiveLink();
    
    // 监听哈希变化
    window.addEventListener('hashchange', highlightActiveLink);
    
    // 移动端菜单切换
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // 更新按钮aria-label
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtn.setAttribute('aria-label', 
          isExpanded ? '关闭菜单' : '打开菜单');
      });
      
      // 点击外部关闭菜单
      document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && 
            !navMenu.contains(event.target) && 
            navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.setAttribute('aria-label', '打开菜单');
        }
      });
      
      // ESC键关闭菜单
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.setAttribute('aria-label', '打开菜单');
        }
      });
    }
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // 如果是页面内锚点链接
        if (href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // 关闭移动端菜单
            if (navMenu && navMenu.classList.contains('active')) {
              navMenu.classList.remove('active');
              mobileMenuBtn.classList.remove('active');
            }
            
            // 滚动到目标位置
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // 更新URL哈希（不触发页面跳转）
            history.pushState(null, null, href);
            
            // 更新活动链接
            highlightActiveLink();
          }
        }
      });
    });
  }
  
  // ============================================
  // 4. 平滑滚动系统
  // ============================================
  
  function initSmoothScroll() {
    console.log('🔧 初始化平滑滚动系统...');
    
    // 监听所有页面内锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      // 跳过已由导航系统处理的链接
      if (!anchor.classList.contains('tech-nav-link')) {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          
          if (href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
              
              // 更新URL
              history.pushState(null, null, href);
            }
          }
        });
      }
    });
    
    // 监听窗口滚动，更新导航栏样式
    let lastScrollTop = 0;
    const navbar = document.querySelector('.tech-navbar');
    
    if (navbar) {
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动时隐藏导航栏，向上滚动时显示
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
        
        // 滚动到顶部时移除阴影，否则添加阴影
        if (scrollTop > 10) {
          navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
          navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
      });
    }
  }
  
  // ============================================
  // 5. 表单验证系统
  // ============================================
  
  function initFormValidation() {
    console.log('🔧 初始化表单验证系统...');
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      // 表单提交处理
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // 简单验证
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(field => {
          const input = contactForm.querySelector(`[name="${field}"]`);
          const value = formValues[field]?.toString().trim();
          
          if (!value) {
            isValid = false;
            showInputError(input, '此字段为必填项');
          } else if (field === 'email' && !isValidEmail(value)) {
            isValid = false;
            showInputError(input, '请输入有效的邮箱地址');
          } else {
            clearInputError(input);
          }
        });
        
        if (isValid) {
          // 显示加载状态
          const submitBtn = contactForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;
          
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="loading-spinner"></span>发送中...';
          
          // 模拟API调用
          setTimeout(() => {
            // 显示成功消息
            showFormMessage('success', '消息发送成功！我们会在24小时内回复您。');
            
            // 重置表单
            contactForm.reset();
            
            // 重置按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 1500);
        }
      });
      
      // 实时验证
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          clearInputError(this);
        });
      });
    }
  }
  
  function validateField(input) {
    const value = input.value.trim();
    const name = input.getAttribute('name');
    
    if (!value && input.hasAttribute('required')) {
      showInputError(input, '此字段为必填项');
      return false;
    }
    
    if (name === 'email' && value && !isValidEmail(value)) {
      showInputError(input, '请输入有效的邮箱地址');
      return false;
    }
    
    clearInputError(input);
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showInputError(input, message) {
    clearInputError(input);
    
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-tech-secondary)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-xs)';
    
    input.parentNode.appendChild(errorElement);
  }
  
  function clearInputError(input) {
    input.classList.remove('error');
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }
  
  function showFormMessage(type, message) {
    // 移除现有消息
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // 创建新消息
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // 样式
    const isSuccess = type === 'success';
    messageElement.style.padding = 'var(--space-md)';
    messageElement.style.borderRadius = 'var(--radius-lg)';
    messageElement.style.marginTop = 'var(--space-lg)';
    messageElement.style.textAlign = 'center';
    messageElement.style.fontWeight = 'var(--font-weight-medium)';
    messageElement.style.background = isSuccess 
      ? 'rgba(0, 255, 136, 0.1)' 
      : 'rgba(255, 0, 0, 0.1)';
    messageElement.style.border = isSuccess
      ? '1px solid var(--color-tech-secondary)'
      : '1px solid #ff0000';
    messageElement.style.color = isSuccess
      ? 'var(--color-tech-secondary)'
      : '#ff0000';
    
    // 添加到表单
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.appendChild(messageElement);
      
      // 5秒后自动消失
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.remove();
        }
      }, 5000);
    }
  }
  
  // ============================================
  // 6. 交互动画系统
  // ============================================
  
  function initIntersectionObserver() {
    console.log('🔧 初始化交互动画系统...');
    
    // 检查Intersection Observer API支持
    if (!('IntersectionObserver' in window)) {
      console.warn('⚠️ Intersection Observer API 不支持，动画系统将降级');
      return;
    }
    
    // 配置观察器
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 添加动画类
          entry.target.classList.add('fade-in');
          
          // 对于特定元素添加额外动画
          if (entry.target.classList.contains('feature-card')) {
            setTimeout(() => {
              entry.target.classList.add('slide-up');
            }, 100);
          }
          
          // 停止观察已动画的元素
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll(
      '.feature-card, .advantage-item, .contact-form, .tech-button, h2, h3'
    );
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // ============================================
  // 7. 动态背景系统
  // ============================================
  
  function initDynamicBackground() {
    console.log('🔧 初始化动态背景系统...');
    
    // 创建粒子背景
    createParticleBackground();
    
    // 鼠标跟随效果
    initMouseFollowEffect();
  }
  
  function createParticleBackground() {
    // 只在性能允许的情况下创建粒子
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('⚠️ 用户偏好减少动画，跳过粒子效果');
      return;
    }
    
    const particleCount = 50;
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    container.style.overflow = 'hidden';
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // 随机位置和大小
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // 样式
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = 'var(--color-tech-secondary)';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.3';
      particle.style.boxShadow = '0 0 10px var(--color-tech-secondary)';
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // 动画
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      
      container.appendChild(particle);
    }
    
    // 添加到body
    document.body.appendChild(container);
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-20px) translateX(10px);
        }
        50% {
          transform: translateY(-10px) translateX(-10px);
        }
        75% {
          transform: translateY(10px) translateX(5px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  function initMouseFollowEffect() {
    // 只在性能允许的情况下启用
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    follower.style.position = 'fixed';
    follower.style.width = '40px';
    follower.style.height = '40px';
    follower.style.borderRadius = '50%';
    follower.style.background = 'radial-gradient(circle, var(--color-tech-secondary) 0%, transparent 70%)';
    follower.style.opacity = '0.3';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9999';
    follower.style.transform = 'translate(-50%, -50%)';
    follower.style.transition = 'transform 0.1s ease-out';
    follower.style.display = 'none';
    
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // 跟踪鼠标位置
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      follower.style.display = 'block';
    });
    
    // 鼠标离开窗口时隐藏
    document.addEventListener('mouseleave', function() {
      follower.style.display = 'none';
    });
    
    // 动画循环
    function animate() {
      // 缓动效果
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // ============================================
  // 8. 性能优化
  // ============================================
  
  function deferNonCriticalResources() {
    // 延迟加载图片
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        // 页面隐藏时暂停非关键动画
        pauseNonCriticalAnimations();
      } else {
        // 页面显示时恢复动画
        resumeNonCriticalAnimations();
      }
    });
  }
  
  function pauseNonCriticalAnimations() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.animationPlayState = 'paused';
    });
  }
  
  function resumeNonCriticalAnimations() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.animationPlayState = 'running';
    });
  }
  
  // ============================================
  // 9. 错误处理
  // ============================================
  
  function initErrorHandling() {
    // 全局错误捕获
    window.addEventListener('error', function(e) {
      console.error('🚨 全局错误:', e.error);
      
      // 可以在这里添加错误上报逻辑
      // reportErrorToService(e.error);
    });
    
    // Promise拒绝捕获
    window.addEventListener('unhandledrejection', function(e) {
      console.error('🚨 未处理的Promise拒绝:', e.reason);
      
      // 可以在这里添加错误上报逻辑
      // reportErrorToService(e.reason);
    });
  }
  
  // ============================================
  // 10. 初始化执行
  // ============================================
  
  // 设置初始化超时，确保DOM完全加载
  setTimeout(init, 100);
  
  // 初始化错误处理
  initErrorHandling();
  
  // 导出公共API（如果需要）
  window.DoudingTech = window.DoudingTech || {};
  window.DoudingTech.UI = {
    init: init,
    showFormMessage: showFormMessage
  };
  
  console.log('🎉 DoudingTech 科技风交互系统准备就绪');
});