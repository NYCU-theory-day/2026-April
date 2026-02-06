// Load shared header into the page
(function() {
  function loadHeader() {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) {
      console.error('Page container not found');
      return;
    }

    // Use XMLHttpRequest for better compatibility
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'header.html', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Insert header at the beginning of page-container
        pageContainer.insertAdjacentHTML('afterbegin', xhr.responseText);
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
