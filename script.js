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

    // Force animation restart by stripping inline animation then re-applying via class
    const targetSlide = slides[currentSlide];
    const animatedEls = targetSlide.querySelectorAll('.slide-content, .flag-icon, .slide-title, .slide-description');

    animatedEls.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Force reflow
        el.style.animation = '';
    });

    // Activate slide and dot
    targetSlide.classList.add('active');
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
    // Auto slide every 6 seconds:
    // Increased gap between elements, total animation time ~3.8s
    autoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
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

function getServiceText(service) {
    if (typeof currentLang !== 'undefined' && currentLang === 'en') {
        return {
            title: service.titleEn || service.title,
            description: service.descriptionEn || service.description
        };
    }
    return { title: service.title, description: service.description };
}

// ==========================================
// CONSOLIDATED SERVICES DATA - استبدل هذا القسم في script.js
// ==========================================

// Services Data - ابدأ من هنا (السطر بعد getServiceText function)
const servicesData = {
    tunisia: [
        // خدمات التوصيل المدمجة
        {
            id: 'tn_delivery',
            title: 'خدمات التوصيل داخل تونس',
            titleEn: 'Delivery Services in Tunisia',
            icon: '🚗',
            description: 'مشاوير، تلاميذ، موظفين،أغراض، طرود، مستندات',
            descriptionEn: 'Rides, Students, Employees, Items, Parcels, Documents',
            phone: '21656471550',
            type: 'consolidated',
            subServices: [
                {
                    id: 'tn_rides',
                    title: 'مشاوير عامة',
                    titleEn: 'General Rides',
                    icon: '🚗',
                    message: 'السلام عليكم،\nأريد طلب خدمة مشاوير داخل تونس.\n\nنقطة الانطلاق:\nنقطة الوصول:\nالتوقيت:\nعدد الأشخاص:',
                    messageEn: 'Hello,\nI would like to request a ride service in Tunisia.\n\nPickup Point:\nDropoff Point:\nTime:\nNumber of People:'
                },
                {
                    id: 'tn_students',
                    title: 'توصيل تلاميذ',
                    titleEn: 'Student Transport',
                    icon: '🎒',
                    message: 'السلام عليكم،\nأريد الاستفسار عن خدمة توصيل التلاميذ داخل تونس.\n\nالمنطقة:\nعدد التلاميذ:\nالأيام المطلوبة:\nالتوقيت:',
                    messageEn: 'Hello,\nI would like to inquire about student transport service in Tunisia.\n\nArea:\nNumber of Students:\nDays Required:\nTime:'
                },
                {
                    id: 'tn_employees',
                    title: 'توصيل موظفين',
                    titleEn: 'Employee Transport',
                    icon: '🧑‍💼',
                    message: 'السلام عليكم،\nأريد طلب خدمة توصيل موظفين داخل تونس.\n\nمكان الانطلاق:\nمكان الوصول:\nعدد الأشخاص:\nالأيام:\nالتوقيت:',
                    messageEn: 'Hello,\nI would like to request employee transport service in Tunisia.\n\nPickup Location:\nDropoff Location:\nNumber of People:\nDays:\nTime:'
                },
                {
                    id: 'tn_items',
                    title: 'توصيل أغراض',
                    titleEn: 'Item Delivery',
                    icon: '🛍️',
                    message: 'السلام عليكم،\nأريد طلب خدمة توصيل أغراض داخل تونس.\n\nنوع الغرض:\nمكان الاستلام:\nمكان التسليم:\nحجم الغرض (صغير/متوسط/كبير):',
                    messageEn: 'Hello,\nI would like to request item delivery service in Tunisia.\n\nItem Type:\nPickup Location:\nDelivery Location:\nItem Size (Small/Medium/Large):'
                },
                {
                    id: 'tn_parcels',
                    title: 'توصيل طرود',
                    titleEn: 'Parcel Delivery',
                    icon: '📦',
                    message: 'السلام عليكم،\nأريد طلب خدمة توصيل طرود داخل تونس.\n\nنوع الطرد:\nهل هو قابل للكسر؟ (نعم/لا)\nمكان الاستلام:\nمكان التسليم:',
                    messageEn: 'Hello,\nI would like to request parcel delivery service in Tunisia.\n\nParcel Type:\nFragile? (Yes/No)\nPickup Location:\nDelivery Location:'
                },
                {
                    id: 'tn_docs',
                    title: 'توصيل مستندات',
                    titleEn: 'Document Delivery',
                    icon: '📄',
                    message: 'السلام عليكم،\nأريد طلب خدمة توصيل مستندات داخل تونس.\n\nعدد المستندات:\nهل هي مستعجلة؟ (نعم/لا)\nمكان الاستلام:\nمكان التسليم:',
                    messageEn: 'Hello,\nI would like to request document delivery service in Tunisia.\n\nNumber of Documents:\nUrgent? (Yes/No)\nPickup Location:\nDelivery Location:'
                }
            ]
        },
        // خدمة التجار
        {
            id: 'tn_merchants',
            title: 'خدمة التجار والمتاجر',
            titleEn: 'Merchant & Store Services',
            icon: '🏪',
            description: 'شراكات توصيل للمحلات والمتاجر داخل تونس',
            descriptionEn: 'Delivery partnerships for shops and stores in Tunisia',
            phone: '21656471550',
            message: 'السلام عليكم،\nأرغب في الشراكة أو الاشتراك في خدمات التوصيل داخل تونس.\n\nاسم المتجر:\nنوع النشاط:\nالمنطقة:\nعدد الطلبات التقريبي يوميًا:\nرقم التواصل:',
            type: 'merchant_section'
        },
        // الصيانة (في النهاية)
        {
            id: 'tn_maintenance',
            title: 'خدمة صيانة عامة',
            titleEn: 'General Maintenance Service',
            icon: '🔧',
            description: 'خدمات صيانة شاملة (كهرباء، سباكة، تكييف، إلخ)',
            descriptionEn: 'Comprehensive maintenance services (electricity, plumbing, AC, etc.)',
            phone: '21656471550',
            message: 'السلام عليكم،\nأريد الاستفسار عن خدمة الصيانة في تونس.',
            type: 'card',
            warning: 'maintenance_soon',
            noForm: true
        }
    ],
    qatar: [
        // خدمات التوصيل المحلية المدمجة
        {
            id: 'qa_delivery',
            title: 'التوصيل المحلي',
            titleEn: 'Local Delivery',
            icon: '🚗',

            description: 'أغراض، موظفين، مشاوير، هدايا، مواد استهلاكية، اشتراك شهري',
            descriptionEn: 'Items, Employees, Rides, Gifts, Groceries, Monthly Subs',
            phone: '97431691024',
            type: 'consolidated',
            section: 'local',

            subServices: [
                {
                    id: 'qa_items',
                    title: 'توصيل أغراض',
                    titleEn: 'Item Delivery',
                    icon: '📦',
                    message: 'السلام عليكم،\nأود طلب خدمة توصيل أغراض داخل قطر.\n\n- نوع الغرض:\n- مكان الاستلام:\n- مكان التسليم:\n- التوقيت المطلوب:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request item delivery service in Qatar.\n\n- Item Type:\n- Pickup Location:\n- Delivery Location:\n- Required Time:\nThank you.'
                },
                {
                    id: 'qa_employees',
                    title: 'توصيل موظفين',
                    titleEn: 'Employee Transport',
                    icon: '🧑‍💼',
                    message: 'السلام عليكم،\nأود طلب خدمة توصيل موظفين داخل قطر.\n\n- مكان الانطلاق:\n- مكان الوصول:\n- عدد الأشخاص:\n- الأيام المطلوبة:\n- التوقيت:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request employee transport service in Qatar.\n\n- Pickup Location:\n- Dropoff Location:\n- Number of People:\n- Days Required:\n- Time:\nThank you.'
                },
                {
                    id: 'qa_rides',
                    title: 'توصيل مشاوير',
                    titleEn: 'Rides Service',
                    icon: '🚗',
                    message: 'السلام عليكم،\nأود طلب خدمة مشاوير داخل قطر.\n\n- نقطة الانطلاق:\n- نقطة الوصول:\n- عدد الأشخاص:\n- التوقيت:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request a ride service in Qatar.\n\n- Pickup Point:\n- Dropoff Point:\n- Number of People:\n- Time:\nThank you.'
                },
                {
                    id: 'qa_gifts',
                    title: 'توصيل هدايا',
                    titleEn: 'Gift Delivery',
                    icon: '🎁',
                    message: 'السلام عليكم،\nأود طلب خدمة توصيل هدايا داخل قطر.\n\n- نوع الهدية:\n- مكان الاستلام:\n- مكان التسليم:\n- هل الهدية قابلة للكسر؟\n- التوقيت:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request gift delivery service in Qatar.\n\n- Gift Type:\n- Pickup Location:\n- Delivery Location:\n- Fragile?\n- Time:\nThank you.'
                },
                {
                    id: 'qa_consumables',
                    title: 'توصيل مواد استهلاكية',
                    titleEn: 'Grocery Delivery',
                    icon: '🛒',
                    message: 'السلام عليكم،\nأود طلب خدمة توصيل مواد استهلاكية داخل قطر.\n\n- نوع المواد:\n- مكان الاستلام:\n- مكان التسليم:\n- التوقيت:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request grocery delivery service in Qatar.\n\n- Item Type:\n- Pickup Location:\n- Delivery Location:\n- Time:\nThank you.'
                },
                {
                    id: 'qa_monthly',
                    title: 'اشتراك شهري',
                    titleEn: 'Monthly Plan',
                    icon: '📅',
                    message: 'السلام عليكم،\nأود الاشتراك الشهري لخدمات التوصيل داخل قطر.\n\n- نوع التوصيل المطلوب:\n- عدد الطلبات التقريبي:\n- مدة الاشتراك:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI am interested in a monthly delivery subscription in Qatar.\n\n- Delivery Type:\n- Approx. Orders:\n- Duration:\nThank you.'
                }
            ]
        },
        // توصيل قطر-تونس المدمج
        {
            id: 'qt_cross_border',
            title: 'توصيل الأغراض بين قطر ⇄ تونس',
            titleEn: 'Qatar ⇄ Tunisia Delivery',
            icon: '✈️',
            description: 'بيع ميزان، حجز من قطر لتونس، حجز من تونس لقطر',
            descriptionEn: 'Sell Scale, Reserve Qatar to Tunisia, Reserve Tunisia to Qatar',
            phone: '21656471550',
            type: 'consolidated',
            section: 'cross_border',
            subServices: [
                {
                    id: 'qt_sell_scale',
                    title: 'تحب تبيع ميزان',
                    titleEn: 'Sell Scale Package',
                    icon: '⚖️',
                    message: 'السلام عليكم،\nأود طلب خدمة بيع ميزان بين قطر وتونس.\n\n- بلد الإرسال:\n- بلد الاستلام:\n- الوزن التقريبي:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to request the Sell Scale service between Qatar and Tunisia.\n\n- Sending Country:\n- Receiving Country:\n- Approx. Weight:\nThank you.'
                },
                {
                    id: 'qt_reserve_qa_tn',
                    title: 'حجز ميزان من قطر إلى تونس',
                    titleEn: 'Reserve: Qatar → Tunisia',
                    icon: '🛫',
                    message: 'السلام عليكم،\nأود حجز ميزان للتوصيل من قطر إلى تونس.\n\n- نوع الأغراض:\n- الوزن التقريبي:\n- التاريخ المتوقع:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to reserve weight for delivery from Qatar to Tunisia.\n\n- Item Type:\n- Approx. Weight:\n- Expected Date:\nThank you.'
                },
                {
                    id: 'qt_reserve_tn_qa',
                    title: 'حجز ميزان من تونس إلى قطر',
                    titleEn: 'Reserve: Tunisia → Qatar',
                    icon: '🛬',
                    message: 'السلام عليكم،\nأود حجز ميزان للتوصيل من تونس إلى قطر.\n\n- نوع الأغراض:\n- الوزن التقريبي:\n- التاريخ المتوقع:\nشكرًا لكم.',
                    messageEn: 'Hello,\nI would like to reserve weight for delivery from Tunisia to Qatar.\n\n- Item Type:\n- Approx. Weight:\n- Expected Date:\nThank you.'
                },
            ]
        },
        // تحويل الريال ⇄ الدينار المدمج
        {
            id: 'qt_money_transfer',
            title: 'تحويل الريال القطري ⇄ الدينار التونسي',
            titleEn: 'Currency Exchange (Coordination Only)',
            icon: '💱',
            description: 'خدمة توثيق وتنسيق (يد بيد) فقط',
            descriptionEn: 'Coordination and documentation service (hand-to-hand only)',
            phone: '21656471550',
            type: 'consolidated',
            section: 'money',
            warning_text: '⚠️ هذه الخدمة للتنسيق والتوثيق فقط',
            noForm: true,
            subServices: [
                {
                    id: 'qt_money_give_qa',
                    title: 'تعطي في قطر وتاخذ في تونس',
                    titleEn: 'Give in Qatar, Receive in Tunisia',
                    icon: '💸',
                    message: 'السلام عليكم،\nأود الاستفسار عن خدمة تحويل يد بيد بين قطر وتونس.\nأفهم أن الخدمة للتنسيق والتوثيق فقط ولا تشمل تحويل الأموال.\nيرجى تزويدي بالتفاصيل اللازمة.\nشكرًا لكم.',
                    noForm: true
                },
                {
                    id: 'qt_money_give_tn',
                    title: 'تاخذ في قطر وتعطي في تونس',
                    titleEn: 'Receive in Qatar, Give in Tunisia',
                    icon: '💰',
                    message: 'السلام عليكم،\nأود الاستفسار عن خدمة تحويل يد بيد بين قطر وتونس.\nأفهم أن الخدمة للتنسيق والتوثيق فقط ولا تشمل تحويل الأموال.\nيرجى تزويدي بالتفاصيل اللازمة.\nشكرًا لكم.',
                    noForm: true
                }
            ]
        },
        // التنظيفات (كما هي)
        {
            id: 'qa_cleaning',
            title: 'شركة وان ديركشن للتنظيفات',
            titleEn: 'One Direction Cleaning Co.',
            icon: '🧹',
            description: 'تنظيف منازل بنظام الساعة والعقود الشهرية',
            descriptionEn: 'Home cleaning by the hour and monthly contracts',
            phone: '97450074396',
            message: 'السلام عليكم،\nأود طلب خدمة تنظيف من شركة \"وان ديركشن\" في قطر.\n\n- نوع المكان (شقة / فيلا / مكتب):\n- عدد الساعات / المبيت:\n- الموقع:\n- التوقيت المطلوب:\nشكرًا لكم.',
            messageEn: 'Hello,\nI would like to request cleaning service from "One Direction" in Qatar.\n\n- Place Type (Apartment/Villa/Office):\n- Hours/Stay-in:\n- Location:\n- Required Time:\nThank you.',
            type: 'highlight_section',
            details: [
                '5 ساعات → 80 ريال',
                '8 ساعات → 150 ريال',
                'عقد شهري → زيارة إضافية مجانية',
                'مبيت → 2200 ريال'
            ],
            noForm: true
        },
        // السيرة الذاتية
        {
            id: 'qa_cv',
            title: 'خدمات السيرة الذاتية',
            titleEn: 'CV Services',
            icon: '🧳',
            description: 'سيرة ذاتية احترافية لسوق قطر (ATS-Friendly)',
            descriptionEn: 'Professional CV for the Qatar market (ATS-Friendly)',
            phone: '97471375390',
            message: 'السلام عليكم،\nأود طلب خدمة إعداد سيرة ذاتية احترافية لسوق العمل في قطر.',
            messageEn: 'Hello,\nI would like to request professional CV service for Qatar.',
            type: 'card',
            warning: 'maintenance_soon',
            noForm: true
        },
        // خدمة التجار
        {
            id: 'qa_merchants',
            title: 'خدمة التجار والمتاجر',
            titleEn: 'Merchant & Store Services',
            icon: '🏪',
            description: 'شراكات توصيل للمحلات والمتاجر داخل قطر',
            descriptionEn: 'Delivery partnerships for shops and stores in Qatar',
            phone: '97431691024',
            message: 'السلام عليكم،\nأرغب في الشراكة أو الاشتراك في خدمات التوصيل داخل قطر.\n\nاسم المتجر:\nنوع النشاط:\nالمنطقة:\nعدد الطلبات التقريبية يوميًا:\nرقم التواصل:',
            messageEn: 'Hello,\nI am interested in partnering or subscribing to delivery services in Qatar.\n\nStore Name:\nBusiness Type:\nArea:\nApprox. Daily Orders:\nContact Number:',
            type: 'merchant_section'
        },
        // الصيانة (في النهاية)

        {
            id: 'qa_maintenance',
            title: 'خدمة صيانة عامة',
            titleEn: 'General Maintenance Service',
            icon: '🔧',
            description: 'خدمات صيانة شاملة (كهرباء، سباكة، تكييف، إلخ)',
            descriptionEn: 'Comprehensive maintenance services (electricity, plumbing, AC, etc.)',
            phone: '97471375390',
            message: 'السلام عليكم،\nأريد الاستفسار عن خدمة الصيانة في قطر.',
            messageEn: 'Hello,\nI would like to inquire about maintenance services in Qatar.',
            type: 'card',
            warning: 'maintenance_soon',
            noForm: true
        }
    ]
};

// ==========================================
// تعليمات الاستبدال:
// 1. افتح ملف script.js
// 2. ابحث عن "const servicesData = {"
// 3. استبدل كل servicesData بالكود أعلاه
// 4. احفظ الملف
// ==========================================


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

        const maintenanceService = servicesData.tunisia.find(s => s.id === 'tn_maintenance');
        const otherServices = servicesData.tunisia.filter(s => s.id !== 'tn_maintenance');

        otherServices.forEach(service => {
            if (service.type === 'merchant_section') {
                if (tunisiaMerchantContainer) {
                    tunisiaMerchantContainer.innerHTML = createMerchantCardHTML(service);
                }
            } else {
                tunisiaContainer.innerHTML += createServiceCardHTML(service, 'تونس');
            }
        });

        // Add Maintenance Service AFTER Merchant Container
        if (maintenanceService) {
            let maintenanceContainer = document.getElementById('tn-maintenance-container');
            if (!maintenanceContainer && tunisiaMerchantContainer) {
                maintenanceContainer = document.createElement('div');
                maintenanceContainer.id = 'tn-maintenance-container';
                maintenanceContainer.className = 'services-grid';
                maintenanceContainer.style.marginTop = '3rem';
                tunisiaMerchantContainer.parentNode.insertBefore(maintenanceContainer, tunisiaMerchantContainer.nextSibling);
            }

            if (maintenanceContainer) {
                maintenanceContainer.innerHTML = createServiceCardHTML(maintenanceService, 'تونس');
            } else {
                // Fallback
                tunisiaContainer.innerHTML += createServiceCardHTML(maintenanceService, 'تونس');
            }
        }
    }

    // Render Qatar Services
    const qatarContainer = document.querySelector('#qatar-content');
    if (qatarContainer) {
        qatarContainer.innerHTML = ''; // Clear existing

        // Group Qatar services by section
        const sections = {
            'local': { title: t('section_local_qatar'), phone: '97431691024', icon: '🇶🇦' },
            'cross_border': { title: t('section_cross_border'), phone: '21656471550', icon: '✈️' },
            'money': { title: t('section_money'), phone: '21656471550', icon: '💱', warning: t('section_money_warning') },
            'cleaning': { title: t('section_cleaning'), phone: '97450074396', icon: '🧹' },
            'cv': { title: t('section_cv'), phone: '33754694', icon: '🧳' }
        };


        // Helper to format phone for display
        const formatPhone = (p) => p.startsWith('216') ? '+216 ' + p.slice(3) : '+974 ' + p.slice(3);

        // 1. Local Delivery
        renderSection(qatarContainer, sections.local, servicesData.qatar.filter(s => s.section === 'local'));

        // Qatar Merchant Section (Directly under Delivery) - CENTERED & HORIZONTAL
        const qaMerchantService = servicesData.qatar.find(s => s.type === 'merchant_section');
        if (qaMerchantService) {
            const mWrapper = document.createElement('div');
            mWrapper.className = 'merchant-container';
            mWrapper.innerHTML = createMerchantCardHTML(qaMerchantService, true);
            qatarContainer.appendChild(mWrapper);
        }

        // 2. Cross Border



        renderSection(qatarContainer, sections.cross_border, servicesData.qatar.filter(s => s.section === 'cross_border'));


        // 3. Money Transfer
        renderSection(qatarContainer, sections.money, servicesData.qatar.filter(s => s.section === 'money'), true);

        // 4. Cleaning (Highlight)
        const cleaningService = servicesData.qatar.find(s => s.id === 'qa_cleaning');
        if (cleaningService) {
            qatarContainer.innerHTML += createHighlightSectionHTML(cleaningService, sections.cleaning);
        }

        // 5. CV Services
        const cvService = servicesData.qatar.find(s => s.id === 'qa_cv');
        if (cvService) {
            const cvSection = {
                title: cvService.title,
                phone: cvService.phone,
                icon: cvService.icon
            };
            renderSection(qatarContainer, cvSection, [cvService]);
        }

        // 6. Maintenance (At the End)
        const maintenanceService = servicesData.qatar.find(s => s.id === 'qa_maintenance');
        if (maintenanceService) {
            // Render as a section for consistency
            const maintenanceSection = {
                title: maintenanceService.title, // Use title directly or 'section_maintenance'
                phone: maintenanceService.phone,
                icon: maintenanceService.icon
            };
            renderSection(qatarContainer, maintenanceSection, [maintenanceService]);
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

function createMerchantCardHTML(service, isQatar = false) {
    const text = getServiceText(service);
    const waLabel = currentLang === 'en' ? 'WhatsApp – Business Inquiry' : 'WhatsApp – رسالة التجار';

    // Determine branding class
    const brandingClass = isQatar ? 'qatar-branded' : '';

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
        <div class="merchant-premium-wrapper ${brandingClass} animate-on-scroll">
            <div class="merchant-badge-row">

                <span class="merchant-business-label">BUSINESS SECTION</span>
                <div class="merchant-certified-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/></svg>
                    <span>${certifiedLabel}</span>
                </div>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
function openModal(serviceId) {
    const service = [...servicesData.tunisia, ...servicesData.qatar].find(s => s.id === serviceId);
    if (!service) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const displayTitle = (currentLang === 'en' && service.titleEn) ? service.titleEn : service.title;

    modalTitle.textContent = displayTitle;

    // Show details list if available
    let contentHtml = '';
    const text = getServiceText(service);
    contentHtml += `<p style="margin-bottom: 1rem;">${text.description}</p>`;

    if (service.details && service.details.length > 0) {
        contentHtml += '<ul class="modal-details-list" style="list-style: none; padding: 0;">';
        service.details.forEach(detail => {
            contentHtml += `<li style="margin-bottom: 0.5rem; padding: 0.5rem; background: #f8f9fa; border-radius: 8px;">${detail}</li>`;
        });
        contentHtml += '</ul>';
    }

    // Add Order Button
    const btnLabel = currentLang === 'en' ? 'Order Now' : 'اطلب الآن';
    contentHtml += `
        <button onclick="openOrderModal('${service.id}')" class="btn btn-whatsapp full-width mt-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            ${btnLabel}
        </button>
    `;

    modalBody.innerHTML = contentHtml;
    modal.style.display = "block";
}

function openOrderModal(serviceId) {
    const service = [...servicesData.tunisia, ...servicesData.qatar].find(s => s.id === serviceId);
    if (!service) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // إذا كانت خدمة مدمجة، نعرض قائمة اختيار أولاً
    if (service.type === 'consolidated') {
        const displayTitle = (currentLang === 'en' && service.titleEn) ? service.titleEn : service.title;
        modalTitle.textContent = displayTitle;

        let formHtml = `<div class="service-selection">`;
        formHtml += `<p class="form-intro">${currentLang === 'en' ? 'Select Service Type:' : 'اختر نوع الخدمة:'}</p>`;
        formHtml += `<div class="sub-services-grid">`;

        service.subServices.forEach(subService => {
            const subTitle = (currentLang === 'en' && subService.titleEn) ? subService.titleEn : subService.title;
            const requestLabel = currentLang === 'en' ? 'Request Service' : 'اطلب هذه الخدمة';
            formHtml += `
                <div class="sub-service-card" onclick="showSubServiceForm('${service.id}', '${subService.id}')">
                    <div class="sub-service-icon">${subService.icon}</div>
                    <div class="sub-service-title">${subTitle}</div>
                    <button class="sub-service-btn" onclick="showSubServiceForm('${service.id}', '${subService.id}')">
                        ${requestLabel}
                    </button>
                </div>
            `;
        });

        formHtml += `</div></div>`;
        modalBody.innerHTML = formHtml;
        modal.style.display = "block";
    } else {
        // For services like Cleaning/CV/Maintenance that might have modal but not consolidated
        // Or if they are simple cards, openOrderModal might just call showSubServiceForm directly or similar logic?
        // But 'showSubServiceForm' requires subServiceId.
        // Wait, for Cleaning (qa_cleaning), it is 'highlight_section' with 'hasModal: true' (I added logic to open modal?)
        // The original openOrderModal handled highlighted services?
        // Let's check original logic.
        // There was no specific logic for 'highlight_section' opening modal in original code, unless added previously.
        // But 'qa_cleaning' has 'message'.
        // If I want to use showSubServiceForm logic for single services, I should adapt it.
        // Let's just forward to showSubServiceForm with subServiceId=null or similar?
        // Actually, let's just implement the single service modal logic here, using the same "noForm" check.

        // REUSING showSubServiceForm logic by treating the service itself as the target
        // We can call showSubServiceForm with subServiceId as null?
        // showSubServiceForm expects subServiceId. Let's fix showSubServiceForm to handle null subServiceId.
        // So if I call showSubServiceForm(id, null), it works!
        // So here I just call it.

        showSubServiceForm(serviceId, null);
        modal.style.display = "block";
    }
}

// دالة لإظهار form الخدمة الفرعية المحددة
// Function to show sub-service form
function showSubServiceForm(serviceId, subServiceId) {
    const service = [...servicesData.tunisia, ...servicesData.qatar].find(s => s.id === serviceId);
    if (!service) return;

    // Find sub-service OR check if original service has noForm
    let subService = null;
    let targetItem = service;

    if (service.subServices && subServiceId) { // Only look for subService if subServiceId is provided
        subService = service.subServices.find(s => s.id === subServiceId);
        if (subService) targetItem = subService;
    }

    if (!targetItem) return;

    // Check if form should be skipped (noForm: true)
    const shouldSkipForm = service.noForm || targetItem.noForm;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Use English title if available
    const displayTitle = (currentLang === 'en' && targetItem.titleEn) ? targetItem.titleEn : targetItem.title;
    modalTitle.textContent = displayTitle;

    let formHtml = `<button class="btn-back" onclick="openOrderModal('${serviceId}')">← ${currentLang === 'en' ? 'Back' : 'العودة'}</button>`;
    formHtml += `<form id="whatsappOrderForm" class="modal-form">`;

    if (!shouldSkipForm) {
        // Intro text removed as per request

        // Determine which message template to use
        const currentMessage = (currentLang === 'en' && targetItem.messageEn) ? targetItem.messageEn : (targetItem.message || '');
        const lines = currentMessage.split('\n');

        // Extract fields from the selected message template
        const templateFields = lines.filter(line => line.includes(':')).map(line => line.split(':')[0].replace('-', '').trim());

        templateFields.forEach(field => {
            if (!field) return;
            formHtml += `
                <div class="form-group">
                    <label>${field}</label>
                    <input type="text" name="${field}" placeholder="${currentLang === 'en' ? 'Enter ' + field : 'أدخل ' + field}" required>
                </div>
            `;
        });
    } else {
        // Simple confirmation text for direct WhatsApp
        formHtml += `<p class="form-intro" style="text-align:center; margin: 20px 0;">${currentLang === 'en' ? 'Click below to contact us directly via WhatsApp' : 'اضغط بالأسفل للتواصل معنا مباشرة عبر واتساب'}</p>`;
    }

    formHtml += `
        <button type="submit" class="btn btn-whatsapp full-width mt-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            ${currentLang === 'en' ? 'Send to WhatsApp' : 'إرسال إلى واتساب'}
        </button>
    </form>`;

    modalBody.innerHTML = formHtml;

    const form = document.getElementById('whatsappOrderForm');
    form.onsubmit = function (e) {
        e.preventDefault();

        // Use the appropriate message template
        let templateMessage = (currentLang === 'en' && targetItem.messageEn) ? targetItem.messageEn : (targetItem.message || '');

        // Filter out lines that act as keys (contain ':') to avoid duplication
        // The form inputs will provide these values in the details section
        let finalMessage = templateMessage.split('\n')
            .filter(line => !line.includes(':')) // Remove lines with ':'
            .join('\n')
            .trim();

        if (!shouldSkipForm) {
            const formData = new FormData(form);
            // Append details section from inputs
            let details = '';
            for (const [key, value] of formData.entries()) {
                if (value) {
                    details += `\n- ${key}: ${value}`;
                }
            }
            // Use just the details without duplicating the keys if they are already in the message?
            // Actually, the message template has keys like "Name:", but we are filling them.
            // A better way is to REPLACE the lines in the message if possible, or just append "Details" block.
            // Since we are not doing complex replacement, appending is safer and standard for this app.

            // However, if the message template ALREADY has lines like "- Item Type:", 
            // and we append "- Item Type: val", it might look duplicate in the chat if the user sends it?
            // The template is just the starting text.
            // The user sends this text + details.

            // Wait, if I use the template which includes "Name:", and then append "Name: Value", it's fine.
            // But if the template is "Hello... Name:", we might want to fill it in?
            // The current logic appends a "Details" block.

            if (details) {
                // We don't want to duplicate the introductory text if it's already in the template.
                // But the template is `finalMessage`.
                // Let's just append the details.
                finalMessage += `\n\n${currentLang === 'en' ? 'Details:' : 'التفاصيل:'}${details}`;
            }
        }

        // Add thank you note if not present (simple check)
        // actually just append it.
        // finalMessage += currentLang === 'en' ? '\nThank you.' : '\nشكرًا لكم.'; // Removed to avoid duplication if template has it.

        const phone = service.phone;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
        window.open(whatsappUrl, '_blank');
        // modal.style.display = "none"; // Optional
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
                // If service is delivery or merchant, use new number
                if (formData.service.includes('توصيل') || formData.service.includes('التجار')) {
                    whatsappNumber = '97431691024';
                } else if (formData.service.includes('سيرة') || formData.service.includes('CV')) {
                    whatsappNumber = '33754694';
                } else if (formData.service.includes('تنظيف')) {
                    whatsappNumber = '97450074396';
                } else {
                    whatsappNumber = '97471375390'; // Original Qatar number for others
                }
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
