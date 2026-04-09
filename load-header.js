// Load shared header into the page
(function() {
  function getRouteKey(pathValue) {
    const raw = (pathValue || '').split('?')[0].split('#')[0];
    const trimmed = raw.replace(/\/+$/, '');
    const segment = trimmed.split('/').pop();
    if (!segment) return 'index';
    return segment.replace(/\.html$/i, '').toLowerCase();
  }

  function loadHeader() {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) {
      console.error('Page container not found');
      return;
    }

    // Use XMLHttpRequest for better compatibility
    const xhr = new XMLHttpRequest();
    const headerUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
      ? window.cacheUtils.appendCacheBuster('header.html')
      : 'header.html';
    xhr.open('GET', headerUrl, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    xhr.setRequestHeader('Pragma', 'no-cache');
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Insert header at the beginning of page-container
        pageContainer.insertAdjacentHTML('afterbegin', xhr.responseText);
        
        // Set active link based on current page
        const currentRoute = getRouteKey(window.location.pathname);
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href') || '';
          if (getRouteKey(href) === currentRoute) {
            link.classList.add('active');
          }
        });
        
        // Mobile hamburger toggle
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
          toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
          });
        }
      } else {
        console.error('Failed to load header. Status:', xhr.status);
      }
    };
    
    xhr.onerror = function() {
      console.error('Error loading header:', xhr.statusText);
    };
    
    xhr.send();
  }

  // Load header immediately since script is at end of page-container
  loadHeader();
})();
