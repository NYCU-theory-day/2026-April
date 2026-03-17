// load-footer.js
document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
    <footer>
      © 2026 NYCU Theory Day — 
      Contact: <a href="mailto:cmct2026.workshop@gmail.com">cmct2026.workshop@gmail.com</a>
    </footer>
  `;
  
  // 找到 </div> 結束前或 body 結束前插入
  document.querySelector('.page-container').insertAdjacentHTML('beforeend', footerHTML);
});