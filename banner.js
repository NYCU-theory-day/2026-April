const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
let currentIndex = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentIndex = index;
}

function startCarousel() {
  intervalId = setInterval(() => {
    showSlide((currentIndex + 1) % slides.length);
  }, 4000); // 4s
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

dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.index)));
});

// Pause on hover
document.querySelector('.hero-carousel').addEventListener('mouseenter', stopCarousel);
document.querySelector('.hero-carousel').addEventListener('mouseleave', startCarousel);

// Initialize
startCarousel();
