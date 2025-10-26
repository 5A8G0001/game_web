// 艾爾芙卡 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initCharacterChart();
    initAnimations();
    initInteractivity();
});

// 導航功能
function initNavigation() {
    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 導航列滾動效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        }
    });

    // 移動端菜單切換（如果需要的話）
    const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// 角色使用率圖表
function initCharacterChart() {
    const chartCanvas = document.getElementById('usageChart');
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext('2d');
    
    // 圖表數據
    const chartData = {
        labels: ['卡兒芬', '瑠波', '烈焰吟者', '風語行者', '大地守衛', '雷電指揮'],
        datasets: [{
            label: '使用率 %',
            data: [30, 25, 15, 12, 10, 8],
            backgroundColor: [
                'rgba(227, 196, 91, 0.8)',
                'rgba(75, 179, 217, 0.8)',
                'rgba(255, 107, 53, 0.8)',
                'rgba(149, 225, 211, 0.8)',
                'rgba(139, 90, 60, 0.8)',
                'rgba(247, 220, 111, 0.8)'
            ],
            borderColor: [
                'rgba(227, 196, 91, 1)',
                'rgba(75, 179, 217, 1)',
                'rgba(255, 107, 53, 1)',
                'rgba(149, 225, 211, 1)',
                'rgba(139, 90, 60, 1)',
                'rgba(247, 220, 111, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    // 圖表配置
    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '角色使用率統計 (Beta 測試期間)',
                    color: '#e3c45b',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleColor: '#e3c45b',
                    bodyColor: '#ffffff',
                    borderColor: '#e3c45b',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return `使用率: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    grid: {
                        color: 'rgba(227, 196, 91, 0.2)'
                    },
                    ticks: {
                        color: '#cccccc',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(227, 196, 91, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    // 創建圖表
    new Chart(ctx, chartConfig);
}

// 動畫效果
function initAnimations() {
    // 滾動顯示動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // 監視所有卡片和標題
    document.querySelectorAll('.card, .section-title, .hero-content').forEach(el => {
        observer.observe(el);
    });

    // 數字計數動畫
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // 如果頁面有統計數字，啟用計數動畫
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        if (target) {
            observer.observe(el);
            el.addEventListener('animationstart', () => {
                animateCounter(el, target);
            });
        }
    });
}

// 互動功能
function initInteractivity() {
    // 角色卡片懸停效果
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 下載按鈕點擊效果
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // 創建漣漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 地形等級展示
    const terrainItems = document.querySelectorAll('.terrain-item');
    terrainItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // 高亮顯示相關地形規則
            const level = this.querySelector('.terrain-level').textContent;
            console.log(`展示 ${level} 地形詳細信息`);
        });
    });

    // 遊戲特色卡片輪播效果（如果需要）
    let currentFeature = 0;
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        setInterval(() => {
            featureCards[currentFeature].style.opacity = '0.7';
            currentFeature = (currentFeature + 1) % featureCards.length;
            
            setTimeout(() => {
                featureCards.forEach(card => card.style.opacity = '1');
                featureCards[currentFeature].style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    featureCards[currentFeature].style.transform = 'scale(1)';
                }, 500);
            }, 100);
        }, 5000);
    }
}

// 工具函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 響應式圖片載入
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 主題切換功能（未來擴展用）
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', 
            document.body.classList.contains('light-theme') ? 'light' : 'dark'
        );
    });
    
    // 載入保存的主題
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// 載入完成後初始化懶載入
document.addEventListener('DOMContentLoaded', function() {
    lazyLoadImages();
    
    // 添加一些額外的CSS動畫
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .terrain-item {
            transition: all 0.3s ease;
        }
        
        .terrain-item:hover {
            transform: translateX(10px);
            background: rgba(227, 196, 91, 0.1);
        }
        
        .terrain-level {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            margin-right: 1rem;
            min-width: 60px;
            text-align: center;
        }
        
        .ability-tag {
            display: inline-block;
            background: rgba(227, 196, 91, 0.2);
            color: var(--accent-color);
            padding: 0.25rem 0.5rem;
            border-radius: 12px;
            font-size: 0.8rem;
            margin: 0.25rem;
            border: 1px solid var(--accent-color);
        }
        
        .character-abilities {
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
});

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('頁面發生錯誤:', e.error);
});

// 確保 Chart.js 已載入
if (typeof Chart === 'undefined') {
    console.warn('Chart.js 未載入，圖表功能將無法使用');
}