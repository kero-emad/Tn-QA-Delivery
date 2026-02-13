// =========================
// Hero Slider
// =========================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval;

function showSlide(n) {
    if (!slides.length) return;

    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Wrap around
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
    resetAutoSlide();
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    resetAutoSlide();
}

function startAutoSlide() {
    // Auto slide every 8 seconds (slower as requested)
    autoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 8000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize slider
if (slides.length > 0) {
    showSlide(currentSlide);
    startAutoSlide();
}

// Pause auto slide on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// =========================
// Mobile Menu Toggle
// =========================
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    if (navLinks && mobileMenuToggle) {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// =========================
// Smooth Scroll
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================
// Navbar Scroll Effect
// =========================
let lastScroll = 0;

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}

// =========================
// Phone Number Formatting Utility
// =========================
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Tunisia: +216 XX XXX XXX
    if (cleaned.startsWith('216') && cleaned.length >= 11) {
        return `+216 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    // Qatar: +974 XXXX XXXX
    else if (cleaned.startsWith('974') && cleaned.length >= 11) {
        return `+974 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
    }
    // Default format
    return `+${cleaned}`;
}

// =========================
// Services Data Configuration (Bilingual)
// =========================

const serviceTranslations = {
    // Tunisia services
    tn_rides: { en: { title: 'General Rides', description: 'Rides within Tunisian cities, fast and safe' } },
    tn_students: { en: { title: 'Student Transport', description: 'Safe and regular student transport in Tunisia' } },
    tn_employees: { en: { title: 'Employee Transport', description: 'Employee transport in Tunisia with precise schedules' } },
    tn_items: { en: { title: 'Item Delivery', description: 'Personal item delivery within Tunisia' } },
    tn_parcels: { en: { title: 'Parcel Delivery', description: 'Fast parcel delivery within Tunisia' } },
    tn_docs: { en: { title: 'Document Delivery', description: 'Paper and document delivery in Tunisia' } },
    tn_merchants: { en: { title: 'Merchant & Store Services', description: 'Delivery partnerships for shops and stores in Tunisia' } },
    tn_maintenance: { en: { title: 'General Maintenance Service', description: 'Comprehensive maintenance services (electricity, plumbing, AC, etc.)' } },
    // Qatar - Local Delivery
    qa_items: { en: { title: 'Item Delivery', description: 'Fast and safe personal item delivery in Qatar' } },
    qa_employees: { en: { title: 'Employee Transport', description: 'Employee transport with monthly or daily contracts in Qatar' } },
    qa_rides: { en: { title: 'Rides Service', description: 'Private rides within Doha and Qatari cities' } },
    qa_gifts: { en: { title: 'Gift Delivery', description: 'Careful delivery of gifts and flowers' } },
    qa_consumables: { en: { title: 'Grocery Delivery', description: 'Delivery of grocery and consumable goods' } },
    qa_monthly: { en: { title: 'Monthly Plan', description: 'Monthly delivery subscription packages at reduced prices' } },
    qa_maintenance: { en: { title: 'General Maintenance Service', description: 'Comprehensive maintenance services (electricity, plumbing, AC, etc.)' } },
    // Qatar - Cross-border
    qt_sell_scale: { en: { title: 'Sell Scale Package', description: 'Selling item weight between countries' } },
    qt_reserve_qa_tn: { en: { title: 'Reserve: Qatar → Tunisia', description: 'Ship items from Qatar to Tunisia' } },
    qt_reserve_tn_qa: { en: { title: 'Reserve: Tunisia → Qatar', description: 'Ship items from Tunisia to Qatar' } },
    // Qatar - Money
    qt_money_give_qa: { en: { title: 'Give in Qatar, Receive in Tunisia', description: 'Coordination and documentation service (hand-to-hand only)' } },
    qt_money_give_tn: { en: { title: 'Receive in Qatar, Give in Tunisia', description: 'Coordination and documentation service (hand-to-hand only)' } },
    // Qatar - Cleaning
    qa_cleaning: { en: { title: 'One Direction Cleaning Co.', description: 'Home cleaning by the hour and monthly contracts' } },
    // Qatar - CV
    qa_cv: { en: { title: 'CV Services', description: 'Professional CV for the Qatar market (ATS-Friendly)' } }
};

// Helper to get translated service title/description
function getServiceText(service) {
    if (typeof currentLang !== 'undefined' && currentLang === 'en' && serviceTranslations[service.id] && serviceTranslations[service.id].en) {
        return {
            title: serviceTranslations[service.id].en.title,
            description: serviceTranslations[service.id].en.description
        };
    }
    return { title: service.title, description: service.description };
}

const servicesData = {
    tunisia: [
        {
            id: 'tn_rides',
            title: 'مشاوير عامة',
            icon: '🚗',
            description: 'مشاوير داخل المدن التونسية بسرعة وأمان',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد طلب خدمة مشاوير داخل تونس.\n\nنقطة الانطلاق:\nنقطة الوصول:\nالتوقيت:\nعدد الأشخاص:',
            type: 'card'
        },
        {
            id: 'tn_students',
            title: 'توصيل تلاميذ',
            icon: '🎒',
            description: 'توصيل آمن ومنتظم للتلاميذ داخل تونس',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد الاستفسار عن خدمة توصيل التلاميذ داخل تونس.\n\nالمنطقة:\nعدد التلاميذ:\nالأيام المطلوبة:\nالتوقيت:',
            type: 'card'
        },
        {
            id: 'tn_employees',
            title: 'توصيل موظفين',
            icon: '🧑‍💼',
            description: 'نقل الموظفين داخل تونس بمواعيد دقيقة',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد طلب خدمة توصيل موظفين داخل تونس.\n\nمكان الانطلاق:\nمكان الوصول:\nعدد الأشخاص:\nالأيام:\nالتوقيت:',
            type: 'card'
        },
        {
            id: 'tn_items',
            title: 'توصيل أغراض',
            icon: '🛍️',
            description: 'توصيل أغراض شخصية داخل تونس',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد طلب خدمة توصيل أغراض داخل تونس.\n\nنوع الغرض:\nمكان الاستلام:\nمكان التسليم:\nحجم الغرض (صغير/متوسط/كبير):',
            type: 'card'
        },
        {
            id: 'tn_parcels',
            title: 'توصيل طرود',
            icon: '📦',
            description: 'توصيل طرود داخل تونس بسرعة',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد طلب خدمة توصيل طرود داخل تونس.\n\nنوع الطرد:\nهل هو قابل للكسر؟ (نعم/لا)\nمكان الاستلام:\nمكان التسليم:',
            type: 'card'
        },
        {
            id: 'tn_docs',
            title: 'توصيل مستندات',
            icon: '📄',
            description: 'توصيل أوراق ومستندات داخل تونس',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد طلب خدمة توصيل مستندات داخل تونس.\n\nعدد المستندات:\nهل هي مستعجلة؟ (نعم/لا)\nمكان الاستلام:\nمكان التسليم:',
            type: 'card'
        },
        {
            id: 'tn_maintenance',
            title: 'خدمة صيانة عامة',
            icon: '🔧',
            description: 'خدمات صيانة شاملة (كهرباء، سباكة، تكييف، إلخ)',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد الاستفسار عن خدمة الصيانة في تونس.',
            type: 'card',
            warning: 'maintenance_soon' // Using warning field for "Coming Soon" note
        },
        {
            id: 'tn_merchants',
            title: 'خدمة التجار والمتاجر',
            icon: '🏪',
            description: 'شراكات توصيل للمحلات والمتاجر داخل تونس',
            phone: '21656471550',
            message: 'السلام عليكم،\nأرغب في الشراكة أو الاشتراك في خدمات التوصيل داخل تونس.\n\nاسم المتجر:\nنوع النشاط:\nالمنطقة:\nعدد الطلبات التقريبي يوميًا:\nرقم التواصل:',
            type: 'merchant_section'
        }
    ],
    qatar: [
        // Section 1: Local Delivery
        {
            id: 'qa_items',
            title: 'توصيل أغراض',
            icon: '📦',
            description: 'توصيل أغراض شخصية داخل قطر بسرعة وأمان',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة توصيل أغراض داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع الغرض:\n- مكان الاستلام:\n- مكان التسليم:\n- التوقيت المطلوب:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        {
            id: 'qa_employees',
            title: 'توصيل موظفين',
            icon: '🧑‍💼',
            description: 'نقل موظفين بعقود شهرية أو يومية داخل قطر',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة توصيل موظفين داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- مكان الانطلاق:\n- مكان الوصول:\n- عدد الأشخاص:\n- الأيام المطلوبة:\n- التوقيت:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        {
            id: 'qa_rides',
            title: 'توصيل مشاوير',
            icon: '🚗',
            description: 'مشاوير خاصة داخل الدوحة والمدن القطرية',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة مشاوير داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نقطة الانطلاق:\n- نقطة الوصول:\n- عدد الأشخاص:\n- التوقيت:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        {
            id: 'qa_gifts',
            title: 'توصيل هدايا',
            icon: '🎁',
            description: 'توصيل الهدايا والورود بعناية فائقة',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة توصيل هدايا داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع الهدية:\n- مكان الاستلام:\n- مكان التسليم:\n- هل الهدية قابلة للكسر؟\n- التوقيت:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        {
            id: 'qa_consumables',
            title: 'توصيل مواد استهلاكية',
            icon: '🛒',
            description: 'توصيل طلبات الجمعية والمواد الاستهلاكية',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة توصيل مواد استهلاكية داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع المواد:\n- مكان الاستلام:\n- مكان التسليم:\n- التوقيت:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        {
            id: 'qa_monthly',
            title: 'اشتراك شهري',
            icon: '📅',
            description: 'باقات اشتراك شهري للتوصيل بأسعار مخفضة',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود الاشتراك الشهري لخدمات التوصيل داخل قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع التوصيل المطلوب:\n- عدد الطلبات التقريبي:\n- مدة الاشتراك:\nشكرًا لكم.',
            type: 'card',
            section: 'local'
        },
        // Section 2: Qatar-Tunisia Delivery
        {
            id: 'qt_sell_scale',
            title: 'تحب تبيع ميزان',
            icon: '⚖️',
            description: 'بيع ميزان الأغراض بين البلدين',
            phone: '21656471550',
            message: 'السلام عليكم،\nأود طلب خدمة بيع ميزان بين قطر وتونس.\nيرجى تزويدي بالتفاصيل التالية:\n- بلد الإرسال:\n- بلد الاستلام:\n- الوزن التقريبي:\nشكرًا لكم.',
            type: 'card',
            section: 'cross_border'
        },
        {
            id: 'qt_reserve_qa_tn',
            title: 'حجز ميزان من قطر إلى تونس',
            icon: '✈️',
            description: 'شحن الأغراض من قطر إلى تونس',
            phone: '21656471550',
            message: 'السلام عليكم،\nأود حجز ميزان للتوصيل من قطر إلى تونس.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع الأغراض:\n- الوزن التقريبي:\n- التاريخ المتوقع:\nشكرًا لكم.',
            type: 'card',
            section: 'cross_border'
        },
        {
            id: 'qt_reserve_tn_qa',
            title: 'حجز ميزان من تونس إلى قطر',
            icon: '🛬',
            description: 'شحن الأغراض من تونس إلى قطر',
            phone: '21656471550',
            message: 'السلام عليكم،\nأود حجز ميزان للتوصيل من تونس إلى قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع الأغراض:\n- الوزن التقريبي:\n- التاريخ المتوقع:\nشكرًا لكم.',
            type: 'card',
            section: 'cross_border'
        },
        // Section 3: Money Transfer (Doc Only)
        {
            id: 'qt_money_give_qa',
            title: 'تعطي في قطر وتاخذ في تونس',
            icon: '💸',
            description: 'خدمة توثيق وتنسيق (يد بيد) فقط',
            phone: '21656471550',
            message: 'السلام عليكم،\nأود الاستفسار عن خدمة تحويل يد بيد بين قطر وتونس.\nأفهم أن الخدمة للتنسيق والتوثيق فقط ولا تشمل تحويل الأموال.\nيرجى تزويدي بالتفاصيل اللازمة.\nشكرًا لكم.',
            type: 'card',
            section: 'money',
        },
        {
            id: 'qt_money_give_tn',
            title: 'تاخذ في قطر وتعطي في تونس',
            icon: '💰',
            description: 'خدمة توثيق وتنسيق (يد بيد) فقط',
            phone: '21656471550',
            message: 'السلام عليكم،\nأود الاستفسار عن خدمة تحويل يد بيد بين قطر وتونس.\nأفهم أن الخدمة للتنسيق والتوثيق فقط ولا تشمل تحويل الأموال.\nيرجى تزويدي بالتفاصيل اللازمة.\nشكرًا لكم.',
            type: 'card',
            section: 'money',
        },
        // Section 4: Cleaning
        {
            id: 'qa_cleaning',
            title: 'شركة وان ديركشن للتنظيفات',
            icon: '🧹',
            description: 'تنظيف منازل بنظام الساعة والعقود الشهرية',
            phone: '97450074396',
            message: 'السلام عليكم،\nأود طلب خدمة تنظيف من شركة "وين ديركشن" في قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع المكان (شقة / فيلا / مكتب):\n- عدد الساعات / المبيت:\n- الموقع:\n- التوقيت المطلوب:\nشكرًا لكم.',
            type: 'highlight_section',
            details: [
                '5 ساعات → 80 ريال',
                '8 ساعات → 150 ريال',
                'عقد شهري → زيارة إضافية مجانية',
                'مبيت → 2200 ريال'
            ]
        },
        // Section 5: CV Services
        {
            id: 'qa_cv',
            title: 'خدمات السيرة الذاتية',
            icon: '🧳',
            description: 'سيرة ذاتية احترافية لسوق قطر (ATS-Friendly)',
            phone: '33754694',
            message: 'السلام عليكم،\nأود طلب خدمة إعداد سيرة ذاتية احترافية لسوق العمل في قطر.\nيرجى تزويدي بالتفاصيل التالية:\n- نوع الخدمة (إعداد جديدة / تعديل CV موجود):\n- مجال العمل:\n- اللغة المطلوبة (عربي / إنجليزي / كلاهما):\nشكرًا لكم.',
            type: 'highlight_section',
            badge: 'ATS',
            details: [
                'CV واحد → 30 ريال',
                'عرض 2 CV → 50 ريال',
                'عرض 3 CV → 70 ريال',
                'Cover Letter → 15 ريال'
            ],
            hasModal: true
        },
        // Section 6: Maintenance (Last Card)
        {
            id: 'qa_maintenance',
            title: 'خدمة صيانة عامة',
            icon: '🔧',
            description: 'خدمات صيانة شاملة (كهرباء، سباكة، تكييف، إلخ)',
            phone: '97471375390',
            message: 'السلام عليكم،\nأريد الاستفسار عن خدمة الصيانة في قطر.',
            type: 'card',
            section: 'local',
            warning: 'maintenance_soon'
        },

    ]
};

// =========================
// Dynamic Service Rendering
// =========================
function renderServices() {
    // Render Tunisia Services
    const tunisiaContainer = document.querySelector('#tunisia .services-grid');
    const tunisiaMerchantContainer = document.querySelector('#tunisia .merchant-container'); // Container for merchant section

    if (tunisiaContainer) {
        tunisiaContainer.innerHTML = ''; // Clear existing
        if (tunisiaMerchantContainer) tunisiaMerchantContainer.innerHTML = '';

        servicesData.tunisia.forEach(service => {
            if (service.type === 'merchant_section') {
                if (tunisiaMerchantContainer) {
                    tunisiaMerchantContainer.innerHTML = createMerchantCardHTML(service);
                }
            } else {
                tunisiaContainer.innerHTML += createServiceCardHTML(service, 'تونس');
            }
        });
    }

    // Render Qatar Services
    const qatarContainer = document.querySelector('#qatar-content');
    if (qatarContainer) {
        qatarContainer.innerHTML = ''; // Clear existing

        // Group Qatar services by section
        // Group Qatar services by section
        const sections = {
            'local': { title: t('section_local_qatar'), phone: '97471375390', icon: '🇶🇦' },
            'cross_border': { title: t('section_cross_border'), phone: '21656471550', icon: '✈️' },
            'money': { title: t('section_money'), phone: '21656471550', icon: '💱', warning: t('section_money_warning') },
            'cleaning': { title: t('section_cleaning'), phone: '97450074396', icon: '🧹' },
            'cv': { title: t('section_cv'), phone: '33754694', icon: '🧳' }
        };

        // Helper to format phone for display
        const formatPhone = (p) => p.startsWith('216') ? '+216 ' + p.slice(3) : '+974 ' + p.slice(3);

        // 1. Local Delivery
        renderSection(qatarContainer, sections.local, servicesData.qatar.filter(s => s.section === 'local'));

        // 2. Cross Border
        renderSection(qatarContainer, sections.cross_border, servicesData.qatar.filter(s => s.section === 'cross_border'));

        // 3. Money Transfer
        renderSection(qatarContainer, sections.money, servicesData.qatar.filter(s => s.section === 'money'), true);

        // 4. Cleaning (Highlight)
        const cleaningService = servicesData.qatar.find(s => s.id === 'qa_cleaning');
        if (cleaningService) {
            qatarContainer.innerHTML += createHighlightSectionHTML(cleaningService, sections.cleaning);
        }

        // 5. CV Services (Highlight + Modal)
        const cvService = servicesData.qatar.find(s => s.id === 'qa_cv');
        if (cvService) {
            qatarContainer.innerHTML += createHighlightSectionHTML(cvService, sections.cv);
        }
    }
}

function renderSection(container, sectionInfo, services, isWarning = false) {
    if (!services || services.length === 0) return;

    let sectionHTML = `
        <div class="service-section-group">
            <div class="section-group-header">
                <h3>${sectionInfo.icon} ${sectionInfo.title}</h3>
                ${isWarning ? `<div class="warning-box">⚠️ ${sectionInfo.warning}</div>` : ''}
                <div class="section-phone">
                    <span>${t('whatsapp_unified')}</span>
                    <span dir="ltr">${formatPhoneNumber(sectionInfo.phone)}</span>
                </div>
            </div>
            <div class="services-grid">
    `;

    services.forEach(service => {
        sectionHTML += createServiceCardHTML(service, 'قطر', sectionInfo.phone);
    });

    sectionHTML += `</div></div>`;
    container.innerHTML += sectionHTML;
}

function createServiceCardHTML(service, countryName, overridePhone = null) {
    const phoneNumber = overridePhone || service.phone;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(service.message)}`;
    const text = getServiceText(service);
    const btnLabel = currentLang === 'en' ? 'Request Service' : 'طلب الخدمة';
    const detailsLabel = currentLang === 'en' ? 'Details' : 'التفاصيل';

    return `
        <div class="service-card animate-on-scroll" data-id="${service.id}">
            ${service.badge ? `<div class="badge">${service.badge}</div>` : ''}
            <div class="service-icon">${service.icon}</div>
            <h3>${text.title}</h3>
            <p>${text.description}</p>
            ${service.warning ? `<div class="card-warning-text">⚠️ ${t(service.warning)}</div>` : ''}
            <div class="card-actions">
                <button onclick="openOrderModal('${service.id}')" class="btn btn-whatsapp full-width">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    ${btnLabel}
                </button>
                ${service.hasModal ?
            `<button class="btn btn-primary full-width mt-2" onclick="openModal('${service.id}')">${detailsLabel}</button>`
            : ''}
            </div>
        </div>
    `;
}

function createMerchantCardHTML(service) {
    const text = getServiceText(service);
    const waLabel = currentLang === 'en' ? 'WhatsApp – Tunisia Merchants' : 'WhatsApp – رسالة التجار';

    // Certified Partner Badge & Benefits
    const certifiedLabel = currentLang === 'en' ? 'Certified Partner' : 'شريك معتمد';
    const benefits = [
        { icon: '🚀', text: currentLang === 'en' ? 'Fast Delivery' : 'توصيل سريع' },
        { icon: '🛡️', text: currentLang === 'en' ? 'Secure Payment' : 'دفع آمن' },
        { icon: '📍', text: currentLang === 'en' ? 'Real-time Tracking' : 'تتبع مباشر' },
        { icon: '🤝', text: currentLang === 'en' ? 'B2B Partners' : 'شراكة تجارية' }
    ];

    const benefitsHTML = benefits.map(b => `
        <div class="merchant-benefit-item">
            <span class="benefit-icon">${b.icon}</span>
            <span class="benefit-text">${b.text}</span>
        </div>
    `).join('');

    return `
        <div class="merchant-premium-wrapper animate-on-scroll">
            <div class="merchant-certified-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/></svg>
                <span>${certifiedLabel}</span>
            </div>
            <div class="merchant-premium-content">
                <div class="merchant-main-info">
                    <h3>${text.title}</h3>
                    <p>${text.description}</p>
                    <div class="merchant-benefits-grid">
                        ${benefitsHTML}
                    </div>
                </div>
                <div class="merchant-cta-area">
                    <button onclick="openOrderModal('${service.id}')" class="btn btn-whatsapp premium-wa-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        ${waLabel}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createHighlightSectionHTML(service, sectionInfo) {
    const whatsappUrl = `https://wa.me/${service.phone}?text=${encodeURIComponent(service.message)}`;
    const formattedPhone = formatPhoneNumber(service.phone);
    const text = getServiceText(service);
    const btnLabel = currentLang === 'en' ? 'Request Service' : 'طلب الخدمة';
    const detailsLabel = currentLang === 'en' ? 'Details & Prices' : 'التفاصيل والأسعار';

    // Generate simple list for details
    let detailsListItems = service.details || [];

    if (service.id === 'qa_cleaning') {
        detailsListItems = [
            t('price_5_hours'),
            t('price_8_hours'),
            t('price_monthly'),
            t('price_stay_in')
        ];
    } else if (service.id === 'qa_cv') {
        detailsListItems = [
            t('price_cv_1'),
            t('price_cv_2'),
            t('price_cv_3'),
            t('price_cover_letter')
        ];
    }

    const detailsList = detailsListItems.length ?
        detailsListItems.map(d => `<li>${d}</li>`).join('') : '';

    return `
        <div class="service-section-group highlight-section animate-on-scroll" id="${service.id}-section">
            <div class="section-group-header">
                <h3>${service.icon} ${text.title}</h3>
                <div class="phone-display">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>${formattedPhone}</span>
                </div>
            </div>
            <div class="highlight-content">
                <div class="highlight-info">
                    <p class="highlight-desc">${text.description}</p>
                    ${detailsList ? `<ul class="highlight-list">${detailsList}</ul>` : ''}
                    <div class="highlight-actions">
                        <button onclick="openOrderModal('${service.id}')" class="btn btn-whatsapp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            ${btnLabel}
                        </button>
                         ${service.hasModal ?
            `<button class="btn btn-outline" onclick="openModal('${service.id}')">${detailsLabel}</button>`
            : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// =========================
// Modal Logic
// =========================
const modalHtml = `
<div id="serviceModal" class="modal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3 id="modalTitle"></h3>
        <div id="modalBody"></div>
    </div>
</div>
`;

// Insert Modal to Body
document.body.insertAdjacentHTML('beforeend', modalHtml);

const modal = document.getElementById('serviceModal');
const closeModal = document.querySelector('.close-modal');

if (closeModal) {
    closeModal.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// =========================
// WhatsApp Order Modal Logic
// =========================
function openOrderModal(serviceId) {
    const service = [...servicesData.tunisia, ...servicesData.qatar].find(s => s.id === serviceId);
    if (!service) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const text = getServiceText(service);

    modalTitle.textContent = text.title;

    // Extract fields from message template
    const lines = service.message.split('\n');
    const templateFields = lines.filter(line => line.includes(':')).map(line => line.split(':')[0].replace('-', '').trim());

    let formHtml = `<form id="whatsappOrderForm" class="modal-form">`;
    formHtml += `<p class="form-intro">${currentLang === 'en' ? 'Please provide the following details:' : 'يرجى تقديم التفاصيل التالية:'}</p>`;

    templateFields.forEach(field => {
        if (!field) return;
        formHtml += `
            <div class="form-group">
                <label>${field}</label>
                <input type="text" name="${field}" required placeholder="${currentLang === 'en' ? 'Enter ' + field : 'أدخل ' + field}">
            </div>
        `;
    });

    formHtml += `
        <button type="submit" class="btn btn-whatsapp full-width mt-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            ${currentLang === 'en' ? 'Send to WhatsApp' : 'إرسال إلى واتساب'}
        </button>
    </form>`;

    modalBody.innerHTML = formHtml;
    modal.style.display = "block";

    // Handle form submission
    const form = document.getElementById('whatsappOrderForm');
    form.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        let finalMessage = lines[0] + '\n' + lines[1] + '\n';

        formData.forEach((value, key) => {
            finalMessage += `- ${key}: ${value}\n`;
        });

        finalMessage += currentLang === 'en' ? '\nThank you.' : '\nشكرًا لكم.';

        const whatsappUrl = `https://wa.me/${service.phone}?text=${encodeURIComponent(finalMessage)}`;
        window.open(whatsappUrl, '_blank');
        modal.style.display = "none";
    };
}




// =========================
// Contact Form
// =========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.getElementById('formMessage');
    const countrySelect = document.getElementById('country');
    const serviceGroup = document.getElementById('serviceGroup');
    const serviceSelect = document.getElementById('service');

    // Service data organized by country
    const servicesByCountry = {
        tunisia: [
            { value: 'مشاوير عامة (تونس)', key: 'opt_tn_rides' },
            { value: 'توصيل تلاميذ (تونس)', key: 'opt_tn_students' },
            { value: 'توصيل موظفين (تونس)', key: 'opt_tn_employees' },
            { value: 'توصيل أغراض (تونس)', key: 'opt_tn_items' },
            { value: 'توصيل طرود (تونس)', key: 'opt_tn_parcels' },
            { value: 'توصيل مستندات (تونس)', key: 'opt_tn_docs' },
            { value: 'خدمة التجار والمتاجر (تونس)', key: 'opt_tn_merchants' }
        ],
        qatar: [
            { value: 'توصيل أغراض (قطر)', key: 'opt_qatar_items' },
            { value: 'توصيل موظفين (قطر)', key: 'opt_qatar_employees' },
            { value: 'توصيل مشاوير (قطر)', key: 'opt_qatar_rides' },
            { value: 'توصيل هدايا (قطر)', key: 'opt_qatar_gifts' },
            { value: 'توصيل مواد استهلاكية (قطر)', key: 'opt_qatar_consumables' },
            { value: 'اشتراك شهري (قطر)', key: 'opt_qatar_monthly' },
            { value: 'تنظيفات (قطر)', key: 'opt_qatar_cleaning' },
            { value: 'سيرة ذاتية (قطر)', key: 'opt_qatar_cv' },
            { value: 'بيع ميزان (قطر-تونس)', key: 'opt_sell_scale' },
            { value: 'حجز ميزان قطر->تونس', key: 'opt_reserve_qa_tn' },
            { value: 'حجز ميزان تونس->قطر', key: 'opt_reserve_tn_qa' },
            { value: 'توثيق مالي (يد بيد)', key: 'opt_money_doc' }
        ]
    };

    // Listen for country selection change
    if (countrySelect) {
        countrySelect.addEventListener('change', function () {
            const selectedCountry = this.value;

            if (selectedCountry) {
                // Show service dropdown
                if (serviceGroup) {
                    serviceGroup.style.display = 'block';
                }

                // Clear existing options except the first one
                serviceSelect.innerHTML = `<option value="" disabled selected>${t('choose_service_placeholder')}</option>`;

                // Add services for selected country
                const services = servicesByCountry[selectedCountry] || [];
                services.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.value;
                    option.textContent = t(service.key);
                    serviceSelect.appendChild(option);
                });

                // Make service required after country selection
                serviceSelect.setAttribute('required', 'required');
            } else {
                // Hide service dropdown if no country selected
                if (serviceGroup) {
                    serviceGroup.style.display = 'none';
                }
                serviceSelect.removeAttribute('required');
            }
        });
    }

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    function validatePhone(phone) {
        const phoneRegex = /^[0-9+\s-]{8,}$/;
        return phoneRegex.test(phone);
    }

    // Form submission
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            country: document.getElementById('country') ? document.getElementById('country').value : '',
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        // Validation logic...
        if (!formData.name || formData.name.length < 2) {
            showFormMessage('الرجاء إدخال اسم صحيح', 'error');
            return;
        }

        if (!validatePhone(formData.phone)) {
            showFormMessage('الرجاء إدخال رقم جوال صحيح', 'error');
            return;
        }

        if (!validateEmail(formData.email)) {
            showFormMessage('الرجاء إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        try {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري التحويل...';

            // Determine WhatsApp number based on country
            let whatsappNumber = '';
            if (formData.country === 'qatar') {
                whatsappNumber = '97431691024';
            } else {
                whatsappNumber = '21656471550';
            }

            const message = `*استفسار من نموذج التواصل*%0a` +
                `*الاسم:* ${formData.name}%0a` +
                `*رقم الجوال:* ${formData.phone}%0a` +
                `*البريد الإلكتروني:* ${formData.email}%0a` +
                `*الدولة:* ${formData.country === 'qatar' ? 'قطر' : 'تونس'}%0a` +
                `*نوع الخدمة:* ${formData.service}%0a` +
                `*الرسالة:*%0a${formData.message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');

            showFormMessage('جاري فتح واتساب...', 'success');
            contactForm.reset();

            // Hide service dropdown after reset
            if (serviceGroup) {
                serviceGroup.style.display = 'none';
            }

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);

        } catch (error) {
            console.error('Form error:', error);
            showFormMessage('حدث خطأ غير متوقع', 'error');
        }
    });

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// =========================
// Scroll Animations
// =========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with .animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Also observe specific existing elements if they don't have the class yet (backward compatibility or auto-add)
    const legacyElements = document.querySelectorAll('.service-card, .contact-card, .info-card, .service-section-group');
    legacyElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        // Add staggered delay based on index (simple modulo)
        const delay = (index % 5) * 100; // 0, 100, 200, 300, 400
        if (delay > 0) el.classList.add(`delay-${delay}`);
        observer.observe(el);
    });
}

// =========================
// Performance Optimization
// =========================
let scrollTimeout;
function optimizedScrollHandler() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        handleNavbarScroll();
    });
}

// =========================
// Initialize
// =========================
document.addEventListener('DOMContentLoaded', () => {
    // Render dynamic services
    renderServices();

    // Scroll animations
    initScrollAnimations();

    // Scroll event
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Initial calls
    handleNavbarScroll();

    // Resize listener logic...
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // ... existing resize logic
    }, { passive: true });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!slides.length) return;
    if (e.key === 'ArrowLeft') changeSlide(1);
    else if (e.key === 'ArrowRight') changeSlide(-1);
});
