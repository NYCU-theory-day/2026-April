// Load shared hero carousel into the page
(function() {
  function loadHero() {
    const pageContainer = document.querySelector('.page-container');
    const main = document.querySelector('main');

    if (!pageContainer || !main) {
      return;
    }

    if (pageContainer.querySelector('.hero-carousel')) {
      if (typeof window.initHeroCarousel === 'function') {
        window.initHeroCarousel();
      }
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'hero.html', true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        main.insertAdjacentHTML('beforebegin', xhr.responseText);

        if (typeof window.initHeroCarousel === 'function') {
          window.initHeroCarousel();
        }
      } else {
        console.error('Failed to load hero. Status:', xhr.status);
      }
    };

    xhr.onerror = function() {
      console.error('Error loading hero:', xhr.statusText);
    };

    xhr.send();
  }

  loadHero();
})();
