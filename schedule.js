const CSV_URL = "data/schedule.csv";
let currentLang = "en";
let scheduleData = [];
let days = [];

// initialize flag
let _scheduleInitialized = false;
let _scheduleObserverAttached = false;

function initSchedule() {
  console.log('initSchedule() called');
  // If the schedule containers are not yet present in the current DOM,
  // defer initialization until they appear. This prevents noisy warnings
  // when SPA navigation causes scripts to run before the page fragment
  // has been inserted.
  const hasDayTabs = !!document.getElementById('day-tabs');
  const hasScheduleDay = !!document.getElementById('schedule-day');
  if (!hasDayTabs || !hasScheduleDay) {
    if (!_scheduleObserverAttached) {
      _scheduleObserverAttached = true;
      const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('day-tabs') && document.getElementById('schedule-day')) {
          obs.disconnect();
          _scheduleObserverAttached = false;
          try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
        }
      });
      observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

      // Fallback: if the DOM doesn't appear within a short time, try again once
      setTimeout(() => {
        if (document.getElementById('day-tabs') && document.getElementById('schedule-day')) {
          try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
        }
      }, 300);
    }
    console.log('initSchedule: DOM not ready, deferring initialization');
    return;
  }
  // If we already fetched data, just re-render into current DOM
  if (scheduleData && scheduleData.length > 0) {
    days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
    renderDayTabs();
    // try to preserve selected tab
    const activeTab = document.querySelector('.day-tab.active');
    const startDay = activeTab ? activeTab.dataset.day : (days[0] || undefined);
    if (startDay) renderDay(startDay);
    _scheduleInitialized = true;
    return;
  }

  // otherwise fetch CSV and initialize
  try {
    const resolvedCSV = new URL(CSV_URL, window.location.href).href;
    console.log('initSchedule: fetching CSV from', resolvedCSV);
  } catch (e) {
    console.log('initSchedule: fetching CSV from (raw)', CSV_URL);
  }
  fetch(CSV_URL)
    .then(res => {
      console.log('initSchedule: fetch response', res.status, res.url);
      if (!res.ok) {
        throw new Error('CSV fetch failed: ' + res.status);
      }
      return res.text();
    })
    .then(text => {
      scheduleData = parseCSV(text);
      console.log('schedule CSV parsed — rows:', scheduleData.length);
      days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
      renderDayTabs();
      if (days.length) renderDay(days[0]);
      _scheduleInitialized = true;
    })
    .catch(err => {
      console.error('Failed to load schedule CSV:', err);
    });
}

// expose for page-loader
window.initSchedule = initSchedule;

function parseCSV(text) {
  // split into non-empty lines and normalize header names
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) { console.warn('parseCSV: no lines found in CSV'); return []; }
  const rawHeaders = lines.shift().split(",").map(h => h.trim());
  const headers = rawHeaders.map(h => String(h).toLowerCase());
  console.log('parseCSV: headers=', headers);

  return lines.map(line => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const obj = {};
    headers.forEach((h, i) => {
      const raw = values[i] ?? "";
      obj[h] = raw.replace(/^"|"$/g, "").trim();
    });
    return obj;
  });
}

function renderDayTabs() {
  const tabs = document.getElementById('day-tabs');
  if (!tabs) { console.warn('renderDayTabs: #day-tabs not found in DOM'); return; }
  tabs.innerHTML = '';
  days.forEach((day, i) => {
    const btn = document.createElement('button');
    btn.className = 'day-tab' + (i===0 ? ' active' : '');
    btn.dataset.day = day;
    // show date on the tab if available in CSV
    const sample = scheduleData.find(s => String(s.day) === String(day));
    const dayDate = sample?.date || '';
    btn.textContent = dayDate ? `Day ${day} - ${dayDate}` : `Day ${day}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.day-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderDay(day);
    });
    tabs.appendChild(btn);
  });
}

function renderDay(day) {
  const container = document.getElementById('schedule-day');
  if (!container) { console.warn('renderDay: #schedule-day not found in DOM');
    // retry shortly in case DOM is still being updated
    setTimeout(() => { const c = document.getElementById('schedule-day'); if (c) renderDay(day); }, 120);
    return;
  }
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'day-header';

  const dayItems = scheduleData.filter(item => String(item.day) === String(day)).sort((a,b)=> (a.time||'').localeCompare(b.time||''));
  const date = dayItems[0]?.date || '';
  header.textContent = date ? `Day ${day} - ${date}` : `Day ${day}`;
  container.appendChild(header);

  // separator before the first row of the day
  if (dayItems.length > 0) {
    const sep = document.createElement('div');
    sep.className = 'day-separator';
    container.appendChild(sep);
  }

  dayItems.forEach(item => {
    // use the new CSV columns: title and speaker
    const title = item.title || item[`title_${currentLang}`] || item.title_en || '';
    const speaker = item.speaker || item.speaker_en || '';

    const div = document.createElement('div');
    // add classes when the talk type is plenary or keynote for styling
    const typeNorm = String(item.type || '').toLowerCase();
    const classes = ['talk'];
    if (typeNorm === 'plenary') classes.push('plenary');
    if (typeNorm === 'keynote') classes.push('keynote');
    // treat any type containing 'break' as a break row
    if (typeNorm.includes('break')) classes.push('break');
    // treat panels similarly to breaks (light yellow)
    if (typeNorm.includes('panel')) classes.push('panel');
    div.className = classes.join(' ');
    div.innerHTML = `
      <div class="time">${item.time || ''}</div>
      <div class="content">
        <div class="title">${escapeHtml(title)}</div>
        ${speaker ? `<div class="speaker">${escapeHtml(speaker)}</div>` : ''}
      </div>
    `;

    container.appendChild(div);
  });
}

// small helper to avoid injecting raw CSV content as HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ensure initSchedule runs when the schedule container appears in the DOM.
// This covers cases where the script is loaded before the SPA inserts the page
// as well as when the script is appended after the DOM is already present.
function _ensureScheduleInitOnDom() {
  if (typeof initSchedule !== 'function') return;
  if (document.getElementById('schedule-day')) {
    try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    if (document.getElementById('schedule-day')) {
      try { initSchedule(); } catch (e) { console.error('initSchedule error', e); }
      obs.disconnect();
    }
  });
  observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
}

_ensureScheduleInitOnDom();
