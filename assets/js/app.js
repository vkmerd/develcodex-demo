const section = document.getElementById("about-slogan");
const textEl = document.querySelector(".about-slogan-text");
const editorEl = document.querySelector(".about-slogan-editor");

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
  editorEl.style.opacity = opacity;
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);
handleScroll();



const milestoneItems = document.querySelectorAll('.milestone-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.6
});

milestoneItems.forEach(item => observer.observe(item));


const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.5,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    768: {
      slidesPerView: 1.7,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 1.9,
      spaceBetween: 50,
    },
  },
});
