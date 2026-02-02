const CSV_URL = "data/schedule.csv"; // CSV exported from Excel
let currentLang = "en";
let scheduleData = [];

// Fetch CSV and parse
fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    scheduleData = parseCSV(text);
    renderSchedule();
  });

// Simple CSV parser
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines.shift().split(",");
  return lines.map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]?.replace(/^"|"$/g, ""));
    return obj;
  });
}

// Render schedule

function renderSchedule() {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  scheduleData.forEach(item => {
    const abstract = item[`abstract_${currentLang}`]?.trim();
    const hasAbstract = abstract && abstract.length > 0;

    // For breaks or items with no abstract
    const noAbstractClass = hasAbstract ? "" : "no-abstract";

    const html = `
      <div class="talk">
        <button class="talk-header ${noAbstractClass}">
          <span class="time">${item.time}</span>
          <span class="title">${item[`title_${currentLang}`]}</span>
          ${hasAbstract ? `<span class="toggle">+</span>` : ""}
        </button>
        ${hasAbstract ? `<div class="abstract"><p>${abstract}</p></div>` : ""}
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });

  // Attach click events AFTER all talks are in DOM
  document.querySelectorAll(".talk-header").forEach(header => {
    if (header.classList.contains("no-abstract")) return;
    header.addEventListener("click", () => {
      const talk = header.parentElement;
      const toggle = header.querySelector(".toggle");
      talk.classList.toggle("open");
      toggle.textContent = talk.classList.contains("open") ? "–" : "+";
    });
  });
}



// Language toggle
document.querySelectorAll(".lang-toggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lang-toggle button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentLang = btn.dataset.lang;
    document.documentElement.lang = currentLang === "zh" ? "zh-Hant" : "en";
    document.getElementById("page-title").textContent =
      currentLang === "zh" ? "議程" : "Schedule";

    renderSchedule();
  });
});
