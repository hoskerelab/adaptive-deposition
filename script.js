'use strict';

// Source-backed chart figures: unweighted mean of six trial-level MAEs.
const chartData = {
  fill: {
    values: [33.04, 30.18, 27.32, 12.17],
    units: '%',
    max: 40,
    title: 'Actual fill-error mean absolute errors, averaged over six standardized trials. PI 33.04%, IMC 30.18%, static calibration 27.32%, online IELM 12.17%.',
    source: 'Source: Genova & Hoskere, Table 6; unweighted means of six trial-level MAEs, not pooled pointwise errors.'
  },
  depth: {
    values: [2.54, 2.25, 2.27, 0.88],
    units: ' mm',
    max: 3.2,
    title: 'Actual depth-error mean absolute errors, averaged over six standardized trials. PI 2.54 mm, IMC 2.25 mm, static calibration 2.27 mm, online IELM 0.88 mm.',
    source: 'Source: Genova & Hoskere, Table 7; unweighted means of six trial-level depth-error MAEs.'
  }
};

const chart = document.getElementById('joshua-chart');
const buttons = [...document.querySelectorAll('[data-metric]')];
buttons.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.metric;
  const data = chartData[key];
  if (!chart || !data) return;
  buttons.forEach(item => {
    const active = item === button;
    item.classList.toggle('selected', active);
    item.setAttribute('aria-pressed', String(active));
  });
  [...chart.querySelectorAll('.chart-row')].forEach((row, index) => {
    row.querySelector('.chart-bar').style.width = (100 * data.values[index] / data.max).toFixed(2) + '%';
    row.querySelector('b').textContent = data.values[index].toFixed(2) + data.units;
  });
  chart.setAttribute('aria-label', data.title);
  document.getElementById('chart-description').textContent = data.source;
}));

const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

// Muted videos play when they enter the viewport and pause when they leave.
// Keeping playback viewport-limited avoids decoding every clip at once.
const videos = [...document.querySelectorAll('video[data-scroll-play]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let visibleVideos = new Set();

function updatePlayback() {
  for (const video of videos) {
    const shouldPlay = !document.hidden && !reducedMotion.matches && visibleVideos.has(video);
    if (shouldPlay && video.paused) {
      const playRequest = video.play();
      if (playRequest && typeof playRequest.catch === 'function') {
        playRequest.catch(() => { /* Poster and controls remain available. */ });
      }
    } else if (!shouldPlay && !video.paused) {
      video.pause();
    }
  }
}

for (const video of videos) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  if (reducedMotion.matches) video.controls = true;
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
        visibleVideos.add(entry.target);
      } else {
        visibleVideos.delete(entry.target);
      }
    }
    updatePlayback();
  }, { threshold: [0, 0.1, 0.28, 0.5, 0.75] });
  videos.forEach(video => observer.observe(video));
} else {
  // Older browsers keep normal video controls for manual playback.
  videos.forEach(video => { video.controls = true; });
}

document.addEventListener('visibilitychange', updatePlayback);
if (typeof reducedMotion.addEventListener === 'function') {
  reducedMotion.addEventListener('change', () => {
    videos.forEach(video => { video.controls = reducedMotion.matches; });
    updatePlayback();
  });
} else if (typeof reducedMotion.addListener === 'function') {
  reducedMotion.addListener(() => {
    videos.forEach(video => { video.controls = reducedMotion.matches; });
    updatePlayback();
  });
}


function renderEquations() {
  if (typeof renderMathInElement !== 'function') return;
  renderMathInElement(document.body, {
    delimiters: [
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ],
    throwOnError: false
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderEquations, { once: true });
} else {
  renderEquations();
}
