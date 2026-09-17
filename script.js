/* ==========================================================
   BIRTHDAY WEBSITE — script.js
   Nothing in this file NEEDS to be edited. It just wires up
   the buttons and animations. Scroll down if you're curious
   how the confetti works, but you can leave it as-is.
========================================================== */

// ---------- Confetti ----------
const CONFETTI_COLORS = ["#FF9EBB", "#FFC857", "#CBB8FF", "#FFB088", "#7AD0C9", "#E8558E"];

function launchConfetti(count = 90) {
  const layer = document.getElementById("confettiLayer");
  if (!layer) return;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";

    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const left = Math.random() * 100;
    const duration = 2.6 + Math.random() * 1.8;
    const delay = Math.random() * 0.4;
    const size = 6 + Math.random() * 6;
    const isRound = Math.random() > 0.5;

    piece.style.left = left + "vw";
    piece.style.background = color;
    piece.style.width = size + "px";
    piece.style.height = (size * 1.4) + "px";
    piece.style.borderRadius = isRound ? "50%" : "2px";
    piece.style.animationDuration = duration + "s";
    piece.style.animationDelay = delay + "s";

    layer.appendChild(piece);

    // Clean up after the animation finishes so the DOM doesn't pile up
    setTimeout(() => piece.remove(), (duration + delay) * 1000 + 200);
  }
}

// ---------- Celebrate button ----------
const celebrateBtn = document.getElementById("celebrateBtn");
if (celebrateBtn) {
  celebrateBtn.addEventListener("click", () => {
    launchConfetti(120);
    document.getElementById("messages")?.scrollIntoView({ behavior: "smooth" });
  });
}

// ---------- Cake cutting ----------
const cutBtn = document.getElementById("cutBtn");
const cakeEl = document.getElementById("cake");
const flameEl = document.getElementById("flame");
const knifeEl = document.getElementById("knife");
const cakeResult = document.getElementById("cakeResult");

const CAKE_LINES = [
  "The candle is out, the cake is cut — officially another year of chaos begins. 🍰",
  "May this year bring you slightly fewer dramatic moments. Slightly. 😌",
  "Cake: cut. Wish: made. Sibling: still very fond of you. 💗"
];

if (cutBtn) {
  cutBtn.addEventListener("click", () => {
    cutBtn.disabled = true;

    flameEl.classList.add("out");

    setTimeout(() => {
      knifeEl.classList.add("slice");
    }, 350);

    setTimeout(() => {
      cakeEl.classList.add("cut");
      launchConfetti(70);
      const line = CAKE_LINES[Math.floor(Math.random() * CAKE_LINES.length)];
      cakeResult.textContent = line;
    }, 950);

    setTimeout(() => {
      cutBtn.disabled = false;
      cutBtn.textContent = "Cut again? 🍰";
      cakeEl.classList.remove("cut");
      flameEl.classList.remove("out");
      knifeEl.classList.remove("slice");
    }, 3200);
  });
}

// ---------- Secret envelope ----------
const envelope = document.getElementById("envelope");

function toggleEnvelope() {
  const isOpening = !envelope.classList.contains("open");
  envelope.classList.toggle("open");
  if (isOpening) {
    launchConfetti(50);
  }
}

if (envelope) {
  envelope.addEventListener("click", toggleEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleEnvelope();
    }
  });
}
