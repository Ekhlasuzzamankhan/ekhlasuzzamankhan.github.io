document.addEventListener('DOMContentLoaded', () => {
  // ── Active nav link ──
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === page) a.classList.add('active');
  });

  // ── Hamburger ──
  const ham = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (ham) ham.addEventListener('click', () => navLinks.classList.toggle('open'));

  // ── Dark mode ──
  const toggle = document.getElementById('darkToggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    if (toggle) toggle.textContent = '☀️ Light';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggle.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    });
  }

  // ── Visitor counter ──
  // Uses localStorage to count unique visits per browser
  const counterEls = document.querySelectorAll('.visitor-count');
  if (counterEls.length > 0) {
    let count = parseInt(localStorage.getItem('visitorCount') || '0');
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      count++;
      localStorage.setItem('visitorCount', count);
      localStorage.setItem('lastVisit', today);
    }
    // Add a base number so it doesn't start from 1
    const display = count + 120;
    counterEls.forEach(el => el.textContent = display);
  }
});
