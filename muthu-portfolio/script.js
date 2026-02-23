(function () {
    // Updated with your actual Public Key from EmailJS
    emailjs.init("er0T2Imy2RYMV4kw3");
})();

/* HAMBURGER */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});
document.querySelectorAll('.mob-link,.mob-cta').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* SCROLL: NAV + PROGRESS */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
    const h = document.documentElement;
    document.getElementById('prog').style.width =
        (window.scrollY / (h.scrollHeight - h.clientHeight) * 100) + '%';
}, { passive: true });

/* REVEAL + SKILL BARS */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skill-item')) {
            const bar = entry.target.querySelector('.skill-bar');
            if (bar) setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.skill-item').forEach(el => observer.observe(el));

/* CONTACT FORM */
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = e.target;

    btn.innerHTML = '✦ &nbsp;Sending...';
    btn.style.opacity = '0.7';

    // Updated with your actual Service ID and Template ID
    emailjs.sendForm('service_2slh3ch', 'template_hrixmfo', form)
        .then(() => {
            btn.innerHTML = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(135deg,#15803d,#16a34a)';
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.innerHTML = '✦ &nbsp;Send Message &nbsp;→';
                btn.style.background = '';
                form.reset();
            }, 3000);
        }, (error) => {
            console.error('FAILED...', error);
            btn.innerHTML = '✕ Failed to Send';
            btn.style.background = 'linear-gradient(135deg,#b91c1c,#ef4444)';
            btn.style.opacity = '1';

            setTimeout(() => {
                btn.innerHTML = '✦ &nbsp;Send Message &nbsp;→';
                btn.style.background = '';
            }, 3000);
        });
}

/* HERO CARD: Skill bars fire on load after short delay */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero-skill-bar').forEach((bar, i) => {
            setTimeout(() => {
                bar.style.width = bar.dataset.w + '%';
            }, i * 220);
        });
    }, 800);
});

/* HERO CARD: 3D magnetic tilt on mousemove */
const heroCard = document.getElementById('heroCard');
const heroVisual = document.getElementById('heroVisual');
if (heroVisual && heroCard) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotX = -dy * 12;   /* max ±12deg vertical   */
        const rotY = dx * 12;   /* max ±12deg horizontal */
        heroCard.style.transform =
            `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
}
