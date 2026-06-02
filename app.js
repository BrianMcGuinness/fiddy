const bgA = document.querySelector(".bg-a");
const bgB = document.querySelector(".bg-b");
const slides = Array.from(document.querySelectorAll(".slide"));

let currentBackground = null;
let visibleLayer = bgA;
let hiddenLayer = bgB;

function getMostVisibleSlide() {
  let bestSlide = slides[0];
  let bestScore = -Infinity;

  for (const slide of slides) {
    const rect = slide.getBoundingClientRect();

    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    if (visibleHeight > bestScore) {
      bestScore = visibleHeight;
      bestSlide = slide;
    }
  }

  return bestSlide;
}

function updateBackground() {
  const activeSlide = getMostVisibleSlide();
  const nextBackground = activeSlide.dataset.bg;

  if (!nextBackground || nextBackground === currentBackground) return;

  currentBackground = nextBackground;

  hiddenLayer.style.backgroundImage = `url("${nextBackground}")`;
  hiddenLayer.classList.add("is-visible");
  visibleLayer.classList.remove("is-visible");

  [visibleLayer, hiddenLayer] = [hiddenLayer, visibleLayer];
}

window.addEventListener("scroll", updateBackground, { passive: true });
window.addEventListener("resize", updateBackground);

updateBackground();