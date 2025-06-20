const aboutWrapper = document.querySelector(".custom-about-text-wrapper");
const aboutContent = document.querySelector(".custom-about-bottom-text-editor");

function handleAboutScrollOpacity() {
  if (!aboutWrapper || !aboutContent) return;

  const rect = aboutWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Section’ın ekranda görünen kısmını hesapla
  const visibleArea = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const ratio = Math.max(0, Math.min(visibleArea / rect.height, 1)); // 0 ile 1 arası sınırla

  // Opacity değerini hesapla
  const minOpacity = 0.5;
  const finalOpacity = minOpacity + (1 - minOpacity) * ratio;

  aboutContent.style.opacity = finalOpacity.toFixed(3); // 0.500 → 1.000
}

window.addEventListener("scroll", handleAboutScrollOpacity);
window.addEventListener("resize", handleAboutScrollOpacity);
handleAboutScrollOpacity(); // Sayfa ilk yüklendiğinde de uygula
