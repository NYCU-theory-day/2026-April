// Use a plain relative path for the schedule CSV.
const CSV_URL = 'data/schedule.csv';
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
  attachProgramDownloadButton();
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
  const fetchUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
    ? window.cacheUtils.appendCacheBuster(CSV_URL)
    : CSV_URL;
  fetch(fetchUrl, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  })
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

  // fallback: if scheduleData still empty shortly after initial fetch,
  // try fetching with an absolute path (covers edge cases with base URL).
  setTimeout(() => {
    if (scheduleData.length === 0) {
      const alt = 'data/schedule.csv';
      console.log('initSchedule: no data after initial fetch — retrying with', alt);
      const altUrl = (window.cacheUtils && typeof window.cacheUtils.appendCacheBuster === 'function')
        ? window.cacheUtils.appendCacheBuster(alt)
        : alt;
      fetch(altUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }).then(r => {
        if (!r.ok) throw new Error('alt fetch failed: ' + r.status);
        return r.text();
      }).then(text => {
        scheduleData = parseCSV(text);
        console.log('initSchedule: alt CSV parsed — rows:', scheduleData.length);
        days = Array.from(new Set(scheduleData.map(s => String(s.day || '').trim()).filter(Boolean))).sort((a,b)=> (Number(a) || 0) - (Number(b) || 0));
        renderDayTabs();
        if (days.length) renderDay(days[0]);
        _scheduleInitialized = true;
      }).catch(e => console.error('initSchedule: alt fetch failed', e));
    }
  }, 350);
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

  const rows = lines.map((line, idx) => {
    const values = line.split(/,(?=(?:(?:[^\"]*"){2})*[^\"]*$)/);
    const obj = { idx };
    headers.forEach((h, i) => {
      const raw = values[i] ?? "";
      obj[h] = raw.replace(/^"|"$/g, "").trim();
    });
    return obj;
  });

  // carry forward day/date values for rows that omit them intentionally.
  // If a blank-time row appears immediately before a new explicit day,
  // assign it to the upcoming day rather than the previous day.
  let lastDay = '';
  let lastDate = '';
  rows.forEach((row, index) => {
    if (row.day) {
      lastDay = row.day;
      if (row.date) lastDate = row.date;
      else row.date = lastDate;
      return;
    }

    const nextExplicit = rows.slice(index + 1).find(r => r.day);
    if (!row.time && nextExplicit && nextExplicit.day && nextExplicit.day !== lastDay) {
      row.day = nextExplicit.day;
      row.date = nextExplicit.date || lastDate;
    } else {
      row.day = lastDay;
      row.date = row.date || lastDate;
    }
  });

  return rows;
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

  const dayItems = scheduleData
    .filter(item => String(item.day) === String(day))
    .sort((a, b) => a.idx - b.idx);
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
    // use the new CSV columns: title, speaker, and chairman
    const title = item.title || item[`title_${currentLang}`] || item.title_en || '';
    const speaker = item.speaker || item.speaker_en || '';
    const chairman = item.chairman || item[`chairman_${currentLang}`] || item.chairman_en || '';

    const div = document.createElement('div');
    // add classes when the talk type is plenary or keynote for styling
    const typeNorm = String(item.type || '').toLowerCase();
    const classes = ['talk'];
    if (typeNorm === 'plenary') classes.push('plenary');
    if (typeNorm === 'keynote') classes.push('keynote');
    if (typeNorm.includes('break')) classes.push('break');
    if (typeNorm.includes('panel')) classes.push('panel');

    if (!item.time) {
      classes.push('chairman-row');
      div.className = classes.join(' ');
      const speakerLabel = item.speaker && !item.chairman ? `Chairman: ${escapeHtml(item.speaker)}` : '';
      const chairmanLabel = item.chairman ? `Chairman: ${escapeHtml(item.chairman)}` : '';
      div.innerHTML = `
        <div class="time"></div>
        <div class="content">
          <div class="title">${escapeHtml(title)}</div>
          ${speakerLabel ? `<div class="speaker">${speakerLabel}</div>` : ''}
          ${chairmanLabel ? `<div class="speaker">${chairmanLabel}</div>` : ''}
        </div>
      `;
    } else {
      div.className = classes.join(' ');
      div.innerHTML = `
        <div class="time">${escapeHtml(item.time)}</div>
        <div class="content">
          <div class="title">${escapeHtml(title)}</div>
          ${speaker ? `<div class="speaker">${escapeHtml(speaker)}</div>` : ''}
        </div>
      `;
    }

    container.appendChild(div);
  });
}

function attachProgramDownloadButton() {
  const button = document.getElementById('download-program-pdf');
  if (!button || button.dataset.downloadAttached) return;
  button.dataset.downloadAttached = '1';
  button.addEventListener('click', () => {
    const files = [
      'TheoryDay_program_poster_p1.pdf',
      'TheoryDay_program_poster_p2.pdf'
    ];

    files.forEach(file => {
      const link = document.createElement('a');
      link.href = file;
      link.download = file;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
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
