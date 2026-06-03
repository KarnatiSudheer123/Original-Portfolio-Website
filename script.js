/* ============ TYPING ANIMATION ============ */
(() => {
  const words = ["Full Stack Developer","Front-End Developer","React Developer","Python Developer","B.Tech Student"];
  const el = document.getElementById("typing");
  if (!el) return;
  let w=0, c=0, del=false;
  function tick(){
    const word = words[w];
    el.textContent = word.substring(0, c);
    if (!del && c < word.length){ c++; setTimeout(tick, 90); }
    else if (del && c > 0){ c--; setTimeout(tick, 50); }
    else { del = !del; if (!del) w = (w+1) % words.length; setTimeout(tick, 1200); }
  }
  tick();
})();

/* ============ NAVBAR SCROLL + ACTIVE ============ */
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#nav-links a");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
  backTop.classList.toggle("show", window.scrollY > 400);
  let current = "home";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* ============ MOBILE MENU ============ */
const hamburger = document.getElementById("hamburger");
const navUl = document.getElementById("nav-links");
hamburger.addEventListener("click", () => navUl.classList.toggle("open"));
navLinks.forEach(a => a.addEventListener("click", () => navUl.classList.remove("open")));

/* ============ REVEAL ON SCROLL ============ */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add("show");
      // skill bars
      e.target.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.p + "%");
      // skill % counter
      e.target.querySelectorAll(".pct").forEach(p => animateCounter(p, +p.dataset.c, "%"));
      // stats
      e.target.querySelectorAll(".counter").forEach(c => animateCounter(c, +c.dataset.c, "+"));
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ============ COUNTER ANIMATION ============ */
function animateCounter(el, target, suffix=""){
  if (el.dataset.done) return;
  el.dataset.done = "1";
  let cur = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const tick = () => {
    cur += step;
    if (cur >= target){ el.textContent = target + suffix; return; }
    el.textContent = cur + suffix;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ============ CERT MODAL ============ */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
document.querySelectorAll(".cert-card").forEach(c => {
  c.addEventListener("click", () => {
    modalTitle.textContent = c.dataset.title || "Certificate";
    modal.classList.add("show");
  });
});
document.getElementById("modal-close").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });

/* ============ CONTACT FORM ============ */
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const subject = data.get("subject").trim();
  const message = data.get("message").trim();
  if (!name || !email || !subject || !message){
    status.style.color = "#ff6b6b"; status.textContent = "⚠ Please fill all required fields.";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)){
    status.style.color = "#ff6b6b"; status.textContent = "⚠ Please enter a valid email.";
    return;
  }
  status.style.color = "lightblue";
  status.textContent = "✔ Message sent! I'll get back to you soon.";
  form.reset();
});

/* ============ PARTICLES BACKGROUND ============ */
(() => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, particles;
  const COUNT = window.innerWidth < 768 ? 40 : 90;
  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", () => { resize(); init(); });
  function init(){
    particles = Array.from({length: COUNT}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
      r: Math.random()*1.8 + .6
    }));
  }
  init();
  function draw(){
    ctx.clearRect(0,0,w,h);
    for (let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>w) p.vx*=-1;
      if (p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = "rgba(173,216,230,0.7)";
      ctx.fill();
      for (let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x-q.x, dy = p.y-q.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120){
          ctx.beginPath();
          ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle = `rgba(173,216,230,${0.15*(1-d/120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();