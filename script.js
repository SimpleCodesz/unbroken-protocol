// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

mobileToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = isOpen ? 'none' : 'flex';
  mobileToggle.classList.toggle('open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    mobileToggle.classList.remove('open');
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ===== STATS COUNT-UP ANIMATION =====
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate count-up numbers
      entry.target.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });

      // Fade in "British Triathlon" text
      entry.target.querySelectorAll('.stat-number:not([data-count])').forEach(el => {
        el.style.opacity = '1';
      });

      // Stagger fade-in for each stat item
      entry.target.querySelectorAll('.stat-item').forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('stat-visible');
        }, i * 150);
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== CAROUSEL ARROWS =====
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel-track');
  const prev = wrap.querySelector('.carousel-prev');
  const next = wrap.querySelector('.carousel-next');
  if (!track || !prev || !next) return;

  const scrollAmount = () => {
    const card = track.querySelector(':scope > *');
    return card ? card.offsetWidth + 20 : 360;
  };

  const updateArrows = () => {
    prev.classList.toggle('hidden', track.scrollLeft <= 10);
    next.classList.toggle('hidden', track.scrollLeft >= track.scrollWidth - track.clientWidth - 10);
  };

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();
  // Re-check after layout settles
  setTimeout(updateArrows, 100);
});

// ===== APPLE-STYLE SCROLL REVEAL (STAGGERED) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // For cards inside carousels, stagger by sibling index
      const parent = entry.target.parentElement;
      const isCard = entry.target.classList.contains('problem-card') ||
                     entry.target.classList.contains('race-card') ||
                     entry.target.classList.contains('coaching-card') ||
                     entry.target.classList.contains('testimonial-card');

      if (isCard && parent) {
        const siblings = Array.from(parent.children).filter(c =>
          c.classList.contains('scroll-reveal'));
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80; // 80ms stagger per card
        entry.target.style.transitionDelay = delay + 'ms';
      }

      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

const revealElements = document.querySelectorAll('section:not(.hero):not(.stats-bar), .philosophy-quote, .problem-card, .race-card, .coaching-card, .testimonial-card, .pricing-card-v2, .faq-group, .about-grid, .apply-card, .form-card, .lead-magnet-card');
revealElements.forEach(el => {
  el.classList.add('scroll-reveal');
  revealObserver.observe(el);
});

// Reveal elements already above viewport (handles anchor link jumps)
const revealAbove = () => {
  revealElements.forEach(el => {
    if (el.classList.contains('revealed')) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0) {
      el.style.transition = 'none';
      el.classList.add('revealed');
      revealObserver.unobserve(el);
    }
  });
};
window.addEventListener('scroll', revealAbove, { passive: true });
// Run once on load for pages loaded at scroll position
revealAbove();

// ===== HERO LOAD ORCHESTRATION =====
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;

  const h1 = hero.querySelector('h1');
  const sub = hero.querySelector('.hero-sub');
  const ctas = hero.querySelector('.hero-ctas');

  // Remove the blanket animation and stagger individually
  hero.style.animation = 'none';
  hero.style.opacity = '1';

  [h1, sub, ctas].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + (i * 200)); // 300ms initial delay, 200ms between elements
  });
});

// ===== TIER PRE-SELECTION =====
function preselectTier(tierName) {
  const tierRadio = document.querySelector('input[name="tier-interest"][value="' + tierName + '"]');
  const tierHidden = document.getElementById('tierField');
  if (tierRadio) tierRadio.checked = true;
  if (tierHidden) tierHidden.value = tierName;
}

// Pricing tier buttons → scroll to form + pre-select tier
document.querySelectorAll('[data-tier]').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const tier = this.dataset.tier;
    preselectTier(tier);
    const formSection = document.getElementById('apply-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== APPLICATION FORM — AJAX SUBMISSION =====
const applicationForm = document.getElementById('applicationForm');
const formSuccess = document.getElementById('formSuccess');

if (applicationForm) {
  applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.form-submit');
    if (submitBtn) {
      submitBtn.textContent = 'Submitting…';
      submitBtn.disabled = true;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function(response) {
      if (response.ok) {
        applicationForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        if (submitBtn) {
          submitBtn.innerHTML = 'Submit Application <span class="btn-arrow">&rsaquo;</span>';
          submitBtn.disabled = false;
        }
        alert('There was an issue submitting your application. Please try again or email welcome@unbrokenclub.com directly.');
      }
    })
    .catch(function() {
      if (submitBtn) {
        submitBtn.innerHTML = 'Submit Application <span class="btn-arrow">&rsaquo;</span>';
        submitBtn.disabled = false;
      }
      alert('There was an issue submitting your application. Please try again or email welcome@unbrokenclub.com directly.');
    });
  });
}

// ===== LEAD MAGNET FORM — AJAX SUBMISSION =====
const leadForm = document.getElementById('leadMagnetForm');
const leadSuccess = document.getElementById('leadMagnetSuccess');

if (leadForm) {
  leadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.lead-magnet-btn');
    if (submitBtn) {
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(function(response) {
      if (response.ok) {
        leadForm.style.display = 'none';
        leadSuccess.style.display = 'block';
      } else {
        if (submitBtn) {
          submitBtn.innerHTML = 'Get the Assessment <span class="btn-arrow">&rsaquo;</span>';
          submitBtn.disabled = false;
        }
        alert('There was an issue. Please try again.');
      }
    })
    .catch(function() {
      if (submitBtn) {
        submitBtn.innerHTML = 'Get the Assessment <span class="btn-arrow">&rsaquo;</span>';
        submitBtn.disabled = false;
      }
      alert('There was an issue. Please try again.');
    });
  });
}
