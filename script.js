/* ============================================================
   REVEAL ON SCROLL
============================================================ */
(function() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
})();

/* ============================================================
   STEPPER
============================================================ */
(function() {
  const steps = document.querySelectorAll('.step');
  const cards = document.querySelectorAll('.stepper-card');
  if (!steps.length) return;

  steps.forEach(btn => {
    btn.addEventListener('click', () => {
      const i = +btn.dataset.step;
      steps.forEach(s => s.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      cards[i]?.classList.add('active');
    });
  });
})();

/* ============================================================
   AVIS CLIENTS — CAROUSEL
============================================================ */
(function() {
  const carousel = document.querySelector('.avis-carousel');
  const btnPrev  = document.querySelector('.avis-arrow.prev');
  const btnNext  = document.querySelector('.avis-arrow.next');
  const dotsWrap = document.querySelector('.avis-dots');
  if (!carousel || !btnPrev || !btnNext) return;

  const slides = carousel.querySelectorAll('.avis-slide');
  let current  = 0;

function spv() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

  function totalGroups() {
    return Math.ceil(slides.length / spv());
  }

function setWidths() {
  const w = 100 / spv();
  slides.forEach(s => {
    s.style.minWidth = w + '%';
    s.style.maxWidth = w + '%';
  });
}

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalGroups(); i++) {
      const d = document.createElement('button');
      d.className = 'avis-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(index) {
    const max = totalGroups() - 1;
    current = Math.max(0, Math.min(index, max));
    const slideWidth = 100 / spv();
    const offset = current * spv() * slideWidth;
    carousel.style.transform = `translateX(-${offset}%)`;
    dotsWrap.querySelectorAll('.avis-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  btnPrev.addEventListener('click', () => {
    goTo(current - 1 < 0 ? totalGroups() - 1 : current - 1);
  });
  btnNext.addEventListener('click', () => {
    goTo(current + 1 > totalGroups() - 1 ? 0 : current + 1);
  });

  function init() {
    current = 0;
    setWidths();
    buildDots();
    goTo(0);
  }

  init();

  let autoplay = setInterval(() => {
    goTo(current + 1 > totalGroups() - 1 ? 0 : current + 1);
  }, 5000);

  const outer = carousel.closest('.avis-carousel-outer');
  outer.addEventListener('mouseenter', () => clearInterval(autoplay));
  outer.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      goTo(current + 1 > totalGroups() - 1 ? 0 : current + 1);
    }, 5000);
  });

  window.addEventListener('resize', init);
})();

/* ============================================================
   PHOTOS TERRAIN — LOOP INFINIE
============================================================ */
document.querySelectorAll('.photos-track').forEach(track => {
  const original = track.innerHTML;
  track.innerHTML = original + original;
});

/* ============================================================
   TÉMOIGNAGES — SWITCH VIDÉO AU CLIC
============================================================ */
(function() {
  const mainIframe = document.getElementById('temo-main-iframe');
  const mainTitle  = document.getElementById('temo-main-title');
  const mainDesc   = document.getElementById('temo-main-desc');
  const thumbs     = document.querySelectorAll('.temo-thumb');

  if (!mainIframe || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src   = thumb.dataset.src;
      const title = thumb.dataset.title;
      const desc  = thumb.dataset.desc;

      mainIframe.src = '';
      requestAnimationFrame(() => {
        mainIframe.src = src + '?autoplay=1&rel=0';
      });

      if (mainTitle) mainTitle.textContent = title;
      if (mainDesc)  mainDesc.textContent  = desc;

      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
