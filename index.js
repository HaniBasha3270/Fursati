document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupOpportunityFilters();
    setupMobileMenu();
    setupApplicationForms();
    loadFeaturedOpportunities();
}

// 🔹 إعداد شريط التنقل
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;

        // تغيير لون الشريط عند التمرير
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// 🔹 التمرير السلس للروابط
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 🔹 القائمة المتنقلة
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 🔹 نظام التصفية للفرص
function setupOpportunityFilters() {
    // هذا سيكون متصلاً بقاعدة البيانات في النسخة النهائية
    console.log('Filter system initialized');
}

// 🔹 نماذج التقديم
function setupApplicationForms() {
    document.querySelectorAll('.apply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const opportunityTitle = this.closest('.opportunity-card').querySelector('h3').textContent;
            showApplicationModal(opportunityTitle);
        });
    });
}

// 🔹 عرض نافذة التقديم
function showApplicationModal(opportunityTitle) {
    // في النسخة الحقيقية، هذا سيفتح نافذة تقديم
    alert(`Application for: ${opportunityTitle}\n\nThis will open a full application form in the complete version.`);
    
    // تتبع حدث التقديم
    trackApplicationEvent(opportunityTitle);
}

// 🔹 تتبع الأحداث
function trackApplicationEvent(opportunity) {
    console.log(`Application started for: ${opportunity}`);
    // هنا يمكن إضافة Google Analytics أو نظام تتبع آخر
}

// 🔹 تحميل الفرص المميزة
function loadFeaturedOpportunities() {
    // في النسخة النهائية، هذا سيجلب البيانات من API
    const opportunities = [
        {
            type: 'scholarship',
            title: 'Computer Science Scholarship',
            organization: 'Harvard University',
            deadline: '2024-12-30'
        },
        {
            type: 'job',
            title: 'Frontend Developer',
            organization: 'Tech Solutions Inc.',
            deadline: '2024-12-15'
        }
    ];

    console.log('Loaded featured opportunities:', opportunities);
}

// 🔹 نظام البحث
function setupSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search opportunities...';
    searchInput.className = 'search-input';
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterOpportunities(searchTerm);
    });
}

// 🔹 تصفية الفرص
function filterOpportunities(searchTerm) {
    const opportunities = document.querySelectorAll('.opportunity-card');
    
    opportunities.forEach(opportunity => {
        const title = opportunity.querySelector('h3').textContent.toLowerCase();
        const organization = opportunity.querySelector('.organization').textContent.toLowerCase();
        const description = opportunity.querySelector('.description').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       organization.includes(searchTerm) || 
                       description.includes(searchTerm);
        
        opportunity.style.display = matches ? 'block' : 'none';
    });
}

// 🔹 نظام الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // إضافة أنماط الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// 🔹 إضافة أنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// 🔹 نظام تحميل البيانات
async function fetchOpportunities(category = 'all') {
    try {
        // في النسخة النهائية، هذا سيتصل بالـ API الحقيقي
        const response = await fetch(`/api/opportunities/${category}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching opportunities:', error);
        showNotification('Failed to load opportunities', 'error');
        return [];
    }
}

// 🔹 تهيئة إضافية عند تحميل الصفحة
window.addEventListener('load', () => {
    // إضافة تأثيرات للبطاقات عند الظهور
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // تطبيق تأثيرات على البطاقات
    document.querySelectorAll('.opportunity-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// 🔹 جعل الدوال متاحة globally للاستخدام في console
window.OpportunityHub = {
    showNotification,
    fetchOpportunities,
    trackApplicationEvent
};

console.log('OpportunityHub initialized successfully! 🚀');