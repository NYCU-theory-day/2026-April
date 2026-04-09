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
    const heroUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
      ? window.cacheUtils.appendCacheBuster('hero.html')
      : 'hero.html';
    xhr.open('GET', heroUrl, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    xhr.setRequestHeader('Pragma', 'no-cache');

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
