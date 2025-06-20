const section = document.getElementById("corporate-slogan-slogan");
const textEl = document.querySelector(".corporate-slogan-slogan-text");

function handleScroll() {
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const sectionHeight = rect.height;
  const visibleTop = Math.min(Math.max(windowHeight - rect.top, 0), sectionHeight);
  const visibleRatio = visibleTop / sectionHeight;
  const percentage = Math.min(visibleRatio * 100, 100);

  textEl.style.backgroundSize = `${percentage}% 100%`;

  const minOpacity = 0.4;
  const opacity = minOpacity + (1 - minOpacity) * visibleRatio;
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);
handleScroll();
