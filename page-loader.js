// Single Page Navigation - Load only content without reloading header
(function() {
  // List of pages and their corresponding files
  const pages = {
    'index.html': { title: 'NYCU Theory Day 2026', file: 'index.html' },
    'registration.html': { title: 'Registration – NYCU Theory Day 2026', file: 'registration.html' },
    'schedule.html': { title: 'Schedule – NYCU Theory Day 2026', file: 'schedule.html' },
    'city-tour.html': { title: 'City Tour – NYCU Theory Day 2026', file: 'city-tour.html' }
  };

  function loadPage(pageName) {
    const pageInfo = pages[pageName];
    if (!pageInfo) return false;

    // Fetch the page
    const xhr = new XMLHttpRequest();
    xhr.open('GET', pageName, true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Parse the loaded page
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(xhr.responseText, 'text/html');
        
        // Extract content from the loaded page (everything after header)
        const newMain = newDoc.querySelector('main');
        const newFooter = newDoc.querySelector('footer');
        const newHero = newDoc.querySelector('.hero');
        
        // Get current container
        const pageContainer = document.querySelector('.page-container');
        if (!pageContainer) return;
        
        // Get current content areas
        const currentHero = pageContainer.querySelector('.hero');
        const currentMain = pageContainer.querySelector('main');
        const currentFooter = pageContainer.querySelector('footer');
        
        // Replace content smoothly
        if (newHero && currentHero) {
          currentHero.innerHTML = newHero.innerHTML;
        }
        
        if (newMain && currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
        }
        
        if (newFooter && currentFooter) {
          currentFooter.innerHTML = newFooter.innerHTML;
        }
        
        // Update page title
        document.title = pageInfo.title;
        
        // Update URL without page reload
        window.history.pushState({ page: pageName }, pageInfo.title, pageName);
        
        // Update active navigation link
        updateActiveLink(pageName);
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const toggle = document.querySelector('.nav-toggle');
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.classList.remove('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
      }
    };
    
    xhr.onerror = function() {
      console.error('Error loading page:', pageName);
    };
    
    xhr.send();
    return true;
  }

  function updateActiveLink(pageName) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');
      if (href === pageName) {
        link.classList.add('active');
      }
    });
  }

  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip external links
      if (href.startsWith('http')) {
        return;
      }
      
      // Skip non-HTML pages
      if (!href.endsWith('.html')) {
        return;
      }
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        loadPage(href);
      });
    });
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(e) {
    if (e.state && e.state.page) {
      loadPage(e.state.page);
    }
  });

  // Setup navigation when header is loaded
  const observer = new MutationObserver(function(mutations) {
    const header = document.querySelector('.header-bar');
    if (header) {
      setupNavigation();
      observer.disconnect();
    }
  });

  // Start observing the page-container for header insertion
  const pageContainer = document.querySelector('.page-container');
  if (pageContainer) {
    observer.observe(pageContainer, { childList: true, subtree: true });
  }

  // Initial setup in case header is already loaded
  setupNavigation();
})();
