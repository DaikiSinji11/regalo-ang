const palabras = [
  "Me encantas", "Preciosa", "Guapa", "Linda", "Mi amor", "Te adoro",
  "Perfecta", "Bonita", "Mi vida", "Hermosa", "Sole Mio", "Amorcito",
  "Mi niña", "Me gustas", "Te quiero", "Me fascinas", "Mi todo", "Encanto", "Te amo",
  "Te adoro", "Me enamoras"
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const palabraObjs = [];

function crearPalabra() {
  const texto = palabras[Math.floor(Math.random() * palabras.length)];
  const tamaño = Math.random() * 24 + 16;
  const velocidad = Math.random() * 1 + 0.5;
  const x = Math.random() * (window.innerWidth - 100);
  const y = -30;

  const div = document.createElement("div");
  div.classList.add("floating-word");
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  div.style.fontSize = `${tamaño}px`;
  div.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
  div.textContent = texto;
  document.body.appendChild(div);

  div.addEventListener("click", () => {
    div.classList.add("flash");
    setTimeout(() => div.classList.remove("flash"), 500);
  });

  palabraObjs.push({ el: div, x, y, velocidad });
}

function animarPalabras() {
  palabraObjs.forEach((palabra, index) => {
    palabra.y += palabra.velocidad;
    palabra.el.style.top = `${palabra.y}px`;

    if (palabra.y > window.innerHeight + 50) {
      palabra.el.remove();
      palabraObjs.splice(index, 1);
    }
  });

  requestAnimationFrame(animarPalabras);
}

setInterval(crearPalabra, 300);
animarPalabras();

// Carta
function mostrarCarta() {
  document.getElementById("carta").classList.add("mostrar");
}

function cerrarCarta() {
  document.getElementById("carta").classList.remove("mostrar");
}

// Corazones animados
const heartCanvas = document.getElementById("heart-canvas");
const hctx = heartCanvas.getContext("2d");
heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

const hearts = [];

function drawHeart(x, y, size) {
  hctx.beginPath();
  hctx.moveTo(x, y);
  hctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
  hctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  hctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  hctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
  hctx.fillStyle = `rgba(255, 0, 79, 0.4)`;
  hctx.fill();
}

function crearCorazon() {
  hearts.push({
    x: Math.random() * heartCanvas.width,
    y: heartCanvas.height + 20,
    size: Math.random() * 10 + 10,
    speed: Math.random() * 1 + 0.5
  });
}

function animarCorazones() {
  hctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
  hearts.forEach((heart, i) => {
    heart.y -= heart.speed;
    drawHeart(heart.x, heart.y, heart.size);

    if (heart.y < -20) {
      hearts.splice(i, 1);
    }
  });
  requestAnimationFrame(animarCorazones);
}

setInterval(crearCorazon, 200);
animarCorazones();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;
});






