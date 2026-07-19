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
// Scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {

  // 1. SPARK ARROW CURSOR
  const cursor = document.createElement('div');
  cursor.id = 'ez-cursor';
  document.body.appendChild(cursor);

  const NUM_SPARKS = 7;
  const sparks = Array.from({ length: NUM_SPARKS }, (_, i) => {
    const s = document.createElement('div');
    s.className = 'ez-spark';
    const size = (7 - i) + 'px';
    s.style.cssText = 'position:fixed;left:0;top:0;width:' + size + ';height:' + size + ';border-radius:50%;pointer-events:none;z-index:99997;will-change:transform;background:#ff9a5c;';
    s.style.opacity = (1 - i / NUM_SPARKS) * 0.85;
    document.body.appendChild(s);
    return s;
  });

  let mouse = { x: -200, y: -200 };
  let sparkPos = Array(NUM_SPARKS).fill().map(() => ({ x: -200, y: -200 }));
  let isClicking = false;

  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mousedown', () => { isClicking = true; cursor.classList.add('clicking'); });
  document.addEventListener('mouseup', () => { isClicking = false; cursor.classList.remove('clicking'); });

  function animCursor() {
    cursor.style.transform = 'translate(' + mouse.x + 'px,' + mouse.y + 'px)';
    sparkPos = [{ x: mouse.x, y: mouse.y }, ...sparkPos.slice(0, NUM_SPARKS - 1)];
    sparks.forEach(function(s, i) {
      var half = parseFloat(s.style.width) / 2;
      s.style.transform = 'translate(' + (sparkPos[i].x - half) + 'px,' + (sparkPos[i].y - half) + 'px)';
      s.style.background = isClicking ? '#e05c2a' : '#ff9a5c';
    });
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // 2. INTRO (homepage only, once per session)
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  if (isHome && !sessionStorage.getItem('introSeen')) {
    sessionStorage.setItem('introSeen', '1');
    const intro = document.createElement('div');
    intro.id = 'ez-intro';
    intro.innerHTML = `<div class="ez-intro-inner"><img src="ek-logo.gif" class="ez-intro-logo" alt="EK"/><div class="ez-intro-name">Ekhlasuzzaman Khan</div><div class="ez-intro-role">EEE &nbsp;·&nbsp; NSU &nbsp;·&nbsp; Bangladesh</div><div class="ez-intro-loader"><div class="ez-intro-fill"></div></div></div><div class="ez-intro-sweep"></div>`;
    document.body.prepend(intro);
    document.body.style.overflow = 'hidden';
    setTimeout(() => intro.classList.add('ez-show'), 80);
    setTimeout(() => intro.classList.add('ez-sweep'), 2500);
    setTimeout(() => { intro.remove(); document.body.style.overflow = ''; }, 3100);
  }

  // 3. LIVE CLOCK
  const clockWrap = document.createElement('div');
  clockWrap.id = 'ez-clock';
  clockWrap.innerHTML = `<div class="ez-clock-time" id="ez-ct">00:00:00</div><div class="ez-clock-date" id="ez-cd">Mon 01 Jan</div>`;
  const nav = document.querySelector('nav');
  if (nav) { const t = nav.querySelector('.dark-toggle'); t ? nav.insertBefore(clockWrap, t) : nav.appendChild(clockWrap); }
  const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const pad = v => String(v).padStart(2,'0');
  function tickClock() {
    const n = new Date();
    const ct = document.getElementById('ez-ct');
    const cd = document.getElementById('ez-cd');
    if(ct) ct.textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    if(cd) cd.textContent = `${DAYS[n.getDay()]} ${pad(n.getDate())} ${MONTHS[n.getMonth()]}`;
  }
  tickClock(); setInterval(tickClock, 1000);

  // 4. CIRCUIT BACKGROUND
  const hero = document.querySelector('.hero');
  if (hero) {
    const cbg = document.createElement('div');
    cbg.className = 'circuit-bg';
    cbg.innerHTML = `<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><g stroke="#e05c2a" stroke-width="1" fill="none"><line x1="0" y1="80" x2="250" y2="80"/><line x1="250" y1="80" x2="250" y2="0"/><line x1="250" y1="80" x2="550" y2="80"/><line x1="550" y1="80" x2="550" y2="200"/><line x1="550" y1="200" x2="350" y2="200"/><line x1="350" y1="200" x2="350" y2="320"/><line x1="350" y1="320" x2="150" y2="320"/><line x1="150" y1="320" x2="150" y2="200"/><line x1="150" y1="200" x2="0" y2="200"/><line x1="550" y1="200" x2="750" y2="200"/><line x1="750" y1="200" x2="750" y2="80"/><line x1="750" y1="80" x2="900" y2="80"/><line x1="0" y1="400" x2="100" y2="400"/><line x1="100" y1="400" x2="100" y2="440"/><line x1="100" y1="440" x2="500" y2="440"/><line x1="500" y1="440" x2="500" y2="320"/><line x1="500" y1="320" x2="650" y2="320"/><line x1="650" y1="320" x2="650" y2="500"/><rect x="220" y="73" width="30" height="14" rx="2" fill="var(--bg)" stroke="#e05c2a"/><rect x="520" y="73" width="30" height="14" rx="2" fill="var(--bg)" stroke="#e05c2a"/><circle cx="250" cy="80" r="4" fill="#e05c2a"/><circle cx="550" cy="80" r="4" fill="#e05c2a"/><circle cx="350" cy="200" r="4" fill="#e05c2a"/><circle cx="550" cy="200" r="4" fill="#e05c2a"/><circle cx="750" cy="200" r="4" fill="#e05c2a"/><circle cx="100" cy="400" r="4" fill="#e05c2a"/><circle cx="500" cy="320" r="4" fill="#e05c2a"/><circle r="5" fill="#e05c2a" stroke="none"><animateMotion dur="5s" repeatCount="indefinite" path="M0,80 L250,80 L250,0"/></circle><circle r="3.5" fill="#2563eb" stroke="none" opacity="0.8"><animateMotion dur="7s" repeatCount="indefinite" path="M0,400 L100,400 L100,440 L500,440 L500,320 L650,320 L650,500"/></circle></g></svg>`;
    hero.prepend(cbg);
    hero.style.position = 'relative';
  }

  // 5. KONAMI EASTER EGG
  const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let ki = 0;
  document.addEventListener('keydown', e => {
    ki = e.key === CODE[ki] ? ki + 1 : 0;
    if (ki === CODE.length) { ki = 0; overclock(); }
  });
  function overclock() {
    if (document.getElementById('ez-overclock')) return;
    const box = document.createElement('div');
    box.id = 'ez-overclock';
    box.innerHTML = `<div class="ez-oc-inner"><span class="ez-oc-badge">⚡</span><div class="ez-oc-title">OVERCLOCKED</div><div class="ez-oc-sub">System frequency pushed beyond rated limits.<br>EEE Engineer mode: <span style="color:#e05c2a">ACTIVATED</span></div><div class="ez-oc-grid"><div class="ez-oc-stat"><span class="ez-oc-key">CPU</span><span class="ez-oc-val" id="oc-cpu">999 MHz</span></div><div class="ez-oc-stat"><span class="ez-oc-key">VOLTAGE</span><span class="ez-oc-val">3.3V → 5V</span></div><div class="ez-oc-stat"><span class="ez-oc-key">TEMP</span><span class="ez-oc-val">🔥 CRITICAL</span></div><div class="ez-oc-stat"><span class="ez-oc-key">STATUS</span><span class="ez-oc-val" style="color:#16a34a">STABLE ✓</span></div></div><button class="ez-oc-btn">SHUTDOWN SYSTEM</button><div class="ez-oc-hint">↑↑↓↓←→←→BA — You found it.</div></div>`;
    document.body.appendChild(box);
    document.body.classList.add('overclocked');
    setTimeout(() => box.classList.add('ez-oc-show'), 10);
    const cpuEl = document.getElementById('oc-cpu');
    const g = setInterval(() => { if (cpuEl) cpuEl.textContent = (Math.floor(Math.random() * 400) + 800) + ' MHz'; }, 120);
    const close = () => { clearInterval(g); box.classList.remove('ez-oc-show'); document.body.classList.remove('overclocked'); setTimeout(() => box.remove(), 400); };
    box.querySelector('.ez-oc-btn').addEventListener('click', close);
    setTimeout(close, 9000);
  }

});

// ═══════════════════════════════════════════
// FEATURE: SCROLL PROGRESS BAR
// ═══════════════════════════════════════════
(function() {
  const bar = document.createElement('div');
  bar.id = 'scroll-bar';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#e05c2a,#ff9a5c);z-index:99999;transition:width 0.1s;border-radius:0 2px 2px 0;box-shadow:0 0 8px rgba(224,92,42,0.6);';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

// ═══════════════════════════════════════════
// FEATURE: PARTICLE BACKGROUND
// ═══════════════════════════════════════════
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.5;';
  hero.style.position = 'relative';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 55;
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,92,42,${p.opacity})`;
      ctx.fill();

      // Connect nearby particles
      particles.slice(i + 1).forEach(q => {
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(224,92,42,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();

// ═══════════════════════════════════════════
// FEATURE: WAVE HERO TEXT ANIMATION
// ═══════════════════════════════════════════
(function() {
  const title = document.querySelector('.hero h1');
  if (!title) return;

  // Split each text node into spans
  title.childNodes.forEach(node => {
    if (node.nodeType === 3) { // text node
      const chars = node.textContent.split('');
      const frag = document.createDocumentFragment();
      chars.forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.cssText = `display:inline-block;opacity:0;transform:translateY(20px);animation:waveIn 0.5s ease forwards;animation-delay:${i * 0.04}s;`;
        frag.appendChild(span);
      });
      node.parentNode.replaceChild(frag, node);
    }
  });
})();

// ═══════════════════════════════════════════
// FEATURE: FADE PAGE TRANSITIONS
// ═══════════════════════════════════════════
(function() {
  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  // Fade out on nav link click
  document.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http') || a.hasAttribute('download')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });
})();

