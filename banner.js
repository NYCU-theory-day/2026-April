(function () {
  function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel || carousel.dataset.initialized === 'true') return;

    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.hero-prev');
    const nextBtn = carousel.querySelector('.hero-next');
    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    let intervalId;

    function showSlide(index) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      currentIndex = index;
    }

    function startCarousel() {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        showSlide((currentIndex + 1) % slides.length);
      }, 4000);
    }

    function stopCarousel() {
      clearInterval(intervalId);
    }

    prevBtn.addEventListener('click', () => {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
    });

    nextBtn.addEventListener('click', () => {
      showSlide((currentIndex + 1) % slides.length);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.index, 10)));
    });

    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    carousel.dataset.initialized = 'true';
    startCarousel();
  }

  window.initHeroCarousel = initHeroCarousel;
  initHeroCarousel();
})();
