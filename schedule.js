const CSV_URL = "data/schedule.csv";
let currentLang = "en";
let currentDay = "1";
let scheduleData = [];

// Fetch CSV
fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    scheduleData = parseCSV(text);
    renderSchedule();
  });

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

function renderSchedule() {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  scheduleData.forEach(item => {
    if (item.day !== currentDay) return;

    const abstract = item[`abstract_${currentLang}`]?.trim();
    const hasAbstract = !!abstract;

    const div = document.createElement("div");
    div.className = "talk";

    div.innerHTML = `
      <div class="time">${item.time}</div>
      <div class="content">
        <div class="title">${item[`title_${currentLang}`]}</div>
        ${hasAbstract ? `<div class="abstract"><p>${abstract}</p></div>` : ""}
      </div>
    `;

    container.appendChild(div);
  });
}

// Toggle abstract
document.getElementById("schedule").addEventListener("click", e => {
  const title = e.target.closest(".title");
  if (!title) return;
  const talk = title.closest(".talk");
  const abstract = talk.querySelector(".abstract");
  if (!abstract) return;
  talk.classList.toggle("open");
});

// Day buttons
document.querySelectorAll(".day-toggle button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".day-toggle button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentDay = btn.dataset.day;
    renderSchedule();
  });
});
