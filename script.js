/* =========================================================
   BART LAB 2025 — INTERACTIVE SCRIPT
   ========================================================= */

/* ========= 1. Scroll Navbar Effect ========= */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========= 2. Particle Background ========= */
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.id = 'particle-canvas';
document.body.appendChild(canvas);

let particlesArray;
const colors = ['#00c3ff', '#ffd700', '#ffffff', '#ff5f6d'];
const maxSize = 3;
const minSize = 0.5;
let mouse = { x: null, y: null };
let particleCount = window.innerWidth < 768 ? 40 : 80;

/* Resize handler */
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

/* Mouse tracking */
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

/* Particle Object */
class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    // Bounce from edges
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.dy = -this.dy;
    }

    // Interact with mouse
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 80 && this.size < 6) {
      this.size += 0.2;
    } else if (this.size > minSize) {
      this.size -= 0.05;
    }

    this.draw();
  }
}

/* Init Particles */
function init() {
  particlesArray = [];
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * (window.innerWidth - size * 2);
    const y = Math.random() * (window.innerHeight - size * 2);
    const dx = (Math.random() - 0.5) * 0.8;
    const dy = (Math.random() - 0.5) * 0.8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
}

/* Animate Loop */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

/* Start */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
animate();

/* ========= 3. Glow Mouse Follow ========= */
const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.pageX + 'px';
  glow.style.top = e.pageY + 'px';
});

/* ========= 4. Smooth Anchor Scroll ========= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* ========= 5. VanillaTilt Config ========= */
if (typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 300,
    glare: true,
    "max-glare": 0.2,
  });
}

/* ========= 6. Custom Glow Cursor Style ========= */
const styleEl = document.createElement('style');
styleEl.textContent = `
.cursor-glow {
  position: fixed;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
  z-index: 10000;
}
`;
document.head.appendChild(styleEl);

/* ========= 7. Lazy Load Fade-In ========= */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 1s ease';
});
