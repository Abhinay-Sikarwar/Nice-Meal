const byId = (id) => document.getElementById(id);

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Fake video play
const playBtn = document.querySelector('.video-frame .play');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    alert('This is a static demo. Replace with your video player.');
  });
}

// Footer year
const yearEl = byId('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu carousel + filters
const menuCarousel = byId('menuCarousel');
if (menuCarousel) {
  const track = menuCarousel.querySelector('.menu-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const chips = Array.from(document.querySelectorAll('.chip'));
  const cards = Array.from(menuCarousel.querySelectorAll('.menu-card'));

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= 0;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
  };

  const scrollByAmount = () => Math.max(280, Math.round(track.clientWidth * 0.8));

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });
  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });
  track.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // Filtering
  const applyFilter = (key) => {
    cards.forEach((card) => {
      const match = key === 'all' || card.dataset.category === key;
      card.style.display = match ? '' : 'none';
    });
    // Reset scroll when filter changes
    track.scrollTo({ left: 0, behavior: 'smooth' });
    updateArrows();
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      chips.forEach((c) => c.setAttribute('aria-selected', String(c === chip)));
      applyFilter(chip.dataset.filter);
    });
  });
}


