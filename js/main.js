// DoudingTech 官网交互功能

document.addEventListener('DOMContentLoaded', function() {
    console.log('DoudingTech 官网已加载');
    
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 动画菜单按钮
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // 点击导航链接后关闭移动菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.querySelectorAll('span')[0].style.transform = 'none';
                    mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
                    mobileMenuBtn.querySelectorAll('span')[2].style.transform = 'none';
                }
            });
        });
    }
    
    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                type: document.getElementById('type').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // 简单的表单验证
            if (!formData.name || !formData.email || !formData.message) {
                alert('请填写所有必填字段（姓名、邮箱、留言内容）');
                return;
            }
            
            // 在实际应用中，这里应该发送数据到服务器
            // 现在只显示成功消息
            alert('感谢您的留言！我们会在24小时内回复。\n\n' +
                  '在实际部署中，此表单会将数据发送到我们的服务器。\n' +
                  '当前为演示版本，数据仅保存在本地。');
            
            // 重置表单
            contactForm.reset();
            
            // 记录到控制台（开发用）
            console.log('表单提交:', formData);
        });
    }
    
    // 平滑滚动
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 向下滚动时隐藏导航栏，向上滚动时显示
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // 添加阴影效果
            if (scrollTop > 10) {
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    }
    
    // 动画效果 - 滚动时显示元素
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .advantage-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始设置动画元素
    const animatedElements = document.querySelectorAll('.feature-card, .advantage-item, .contact-info, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 初始触发一次
    animateOnScroll();
    
    // 当前年份更新
    const yearElement = document.querySelector('footer p:first-of-type');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2026', currentYear.toString());
    }
    
    // 控制台欢迎信息
    console.log('%c🚀 DoudingTech 官网已就绪', 'color: #1a73e8; font-size: 16px; font-weight: bold;');
    console.log('%c智能技术，简单开发', 'color: #34a853; font-size: 14px;');
    console.log('官网版本: 1.0.0 | 构建时间: ' + new Date().toLocaleString());
});