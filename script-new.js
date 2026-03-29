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
    qt_reserve_qa_tn: { en: { title: 'Reserve: Qatar â†’ Tunisia', description: 'Ship items from Qatar to Tunisia' } },
    qt_reserve_tn_qa: { en: { title: 'Reserve: Tunisia â†’ Qatar', description: 'Ship items from Tunisia to Qatar' } },
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

