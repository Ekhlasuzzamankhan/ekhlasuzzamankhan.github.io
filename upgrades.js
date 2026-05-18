document.addEventListener('DOMContentLoaded', () => {

  // 1. CUSTOM CURSOR
  const cursor = document.createElement('div');
  cursor.id = 'ez-cursor';
  document.body.appendChild(cursor);
  const NUM_TRAILS = 10;
  const trailEls = Array.from({ length: NUM_TRAILS }, (_, i) => {
    const d = document.createElement('div');
    d.className = 'ez-trail';
    const s = (10 - i) + 'px';
    d.style.cssText = `width:${s};height:${s};opacity:${(1 - i / NUM_TRAILS) * 0.65};`;
    document.body.appendChild(d);
    return d;
  });
  let mouse = { x: -200, y: -200 };
  let trailPos = Array(NUM_TRAILS).fill().map(() => ({ x: -200, y: -200 }));
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  function animCursor() {
    cursor.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;
    trailPos = [{ ...mouse }, ...trailPos.slice(0, NUM_TRAILS - 1)];
    trailEls.forEach((el, i) => { el.style.transform = `translate(${trailPos[i].x}px,${trailPos[i].y}px)`; });
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
    document.getElementById('ez-ct').textContent = `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    document.getElementById('ez-cd').textContent = `${DAYS[n.getDay()]} ${pad(n.getDate())} ${MONTHS[n.getMonth()]}`;
  }
  tickClock(); setInterval(tickClock, 1000);

  // 4. CIRCUIT BACKGROUND
  const hero = document.querySelector('.hero');
  if (hero) {
    const cbg = document.createElement('div');
    cbg.className = 'circuit-bg';
    cbg.innerHTML = `<svg viewBox="0 0 900 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><g stroke="#e05c2a" stroke-width="1" fill="none"><line x1="0" y1="80" x2="250" y2="80"/><line x1="250" y1="80" x2="250" y2="0"/><line x1="250" y1="80" x2="550" y2="80"/><line x1="550" y1="80" x2="550" y2="200"/><line x1="550" y1="200" x2="350" y2="200"/><line x1="350" y1="200" x2="350" y2="320"/><line x1="350" y1="320" x2="150" y2="320"/><line x1="150" y1="320" x2="150" y2="200"/><line x1="150" y1="200" x2="0" y2="200"/><line x1="550" y1="200" x2="750" y2="200"/><line x1="750" y1="200" x2="750" y2="80"/><line x1="750" y1="80" x2="900" y2="80"/><line x1="0" y1="400" x2="100" y2="400"/><line x1="100" y1="400" x2="100" y2="440"/><line x1="100" y1="440" x2="500" y2="440"/><line x1="500" y1="440" x2="500" y2="320"/><line x1="500" y1="320" x2="650" y2="320"/><line x1="650" y1="320" x2="650" y2="500"/><rect x="220" y="73" width="30" height="14" rx="2" fill="var(--bg)" stroke="#e05c2a"/><rect x="520" y="73" width="30" height="14" rx="2" fill="var(--bg)" stroke="#e05c2a"/><rect x="340" y="193" width="20" height="14" rx="2" fill="var(--bg)" stroke="#e05c2a"/><circle cx="250" cy="80" r="4" fill="#e05c2a"/><circle cx="550" cy="80" r="4" fill="#e05c2a"/><circle cx="350" cy="200" r="4" fill="#e05c2a"/><circle cx="550" cy="200" r="4" fill="#e05c2a"/><circle cx="750" cy="200" r="4" fill="#e05c2a"/><circle cx="100" cy="400" r="4" fill="#e05c2a"/><circle cx="500" cy="320" r="4" fill="#e05c2a"/><circle r="5" fill="#e05c2a" stroke="none"><animateMotion dur="5s" repeatCount="indefinite" path="M0,80 L250,80 L250,0"/></circle><circle r="3.5" fill="#2563eb" stroke="none" opacity="0.8"><animateMotion dur="7s" repeatCount="indefinite" path="M0,400 L100,400 L100,440 L500,440 L500,320 L650,320 L650,500"/></circle></g></svg>`;
    hero.prepend(cbg);
    hero.style.position = 'relative';
  }

  // 5 & 6. SINE WAVE SKILL BARS
  const skillsSection = document.querySelector('.skills-categories');
  if (skillsSection) {
    const skills = [
      { name: 'C Programming',     color: '#e05c2a', oscillate: false },
      { name: 'AutoCAD',           color: '#2563eb', oscillate: false },
      { name: 'Multisim',          color: '#2563eb', oscillate: false },
      { name: 'Circuit Building',  color: '#2563eb', oscillate: false },
      { name: 'Project Designing', color: '#2563eb', oscillate: false },
      { name: 'Canva',             color: '#16a34a', oscillate: false },
      { name: 'Illustration',      color: '#16a34a', oscillate: false },
      { name: 'Problem Solving',   color: '#7c3aed', oscillate: true  },
    ];
    const waveSection = document.createElement('div');
    waveSection.style.marginTop = '3rem';
    waveSection.innerHTML = `<p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:2rem;display:flex;align-items:center;gap:12px;">Skill Waves<span style="flex:1;height:1px;background:var(--border);display:block;"></span></p>`;
    const canvases = [];
    skills.forEach(skill => {
      const id = skill.name.replace(/\s/g,'-');
      const item = document.createElement('div');
      item.className = 'skill-wave-item';
      item.innerHTML = `<div class="skill-wave-header"><span class="skill-wave-label">${skill.name}</span><span class="skill-wave-pct" id="pct-${id}">100%</span></div><canvas class="skill-wave-canvas" id="wave-${id}" height="52"></canvas>`;
      waveSection.appendChild(item);
      canvases.push({ canvas: item.querySelector('canvas'), skill, id });
    });
    skillsSection.appendChild(waveSection);

    let t = 0;
    function drawWaves() {
      t += 0.035;
      canvases.forEach(({ canvas, skill, id }) => {
        canvas.width = canvas.offsetWidth || 800;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);
        const pct = skill.oscillate ? 50 + 50 * Math.sin(t * 0.6) : 100;
        const pctEl = document.getElementById(`pct-${id}`);
        if (pctEl) pctEl.textContent = Math.round(pct) + '%';
        const amp = (pct / 100) * (H / 2 - 5);
        const mid = H / 2;
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, skill.color + '50');
        grad.addColorStop(1, skill.color + '08');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, mid);
        for (let x = 0; x <= W; x++) { ctx.lineTo(x, mid - amp * Math.sin((x / W) * 4 * Math.PI + t * 2)); }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = skill.color; ctx.lineWidth = 2;
        ctx.shadowColor = skill.color; ctx.shadowBlur = 7;
        ctx.beginPath();
        for (let x = 0; x <= W; x++) { const y = mid - amp * Math.sin((x / W) * 4 * Math.PI + t * 2); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.strokeStyle = skill.color + '25'; ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(0, mid); ctx.lineTo(W, mid); ctx.stroke(); ctx.setLineDash([]);
      });
      requestAnimationFrame(drawWaves);
    }
    drawWaves();
  }

  // 7. KONAMI EASTER EGG
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
