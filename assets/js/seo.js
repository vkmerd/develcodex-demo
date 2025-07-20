const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
const TAGS = ['HTML', 'CSS', 'JavaScript', 'Typescript', 'Tailwind', 'React', 'Next.js', 'Gatsby', 'UI/UX', 'SVG', 'animation', 'webdev'];
const DURATION = 15000;
const ROWS = 5;

// Ortalama bir .tag kutusunun genişliği (padding, margin dahil)
const APPROX_TAG_WIDTH = 140;
// Döngünün kesintisiz çalışması için fazladan eklenecek tag sayısı
const EXTRA_TAG_COUNT = 5;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

function createTag(text) {
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.innerHTML = `<span>#</span> ${text}`;
  return tag;
}

function createLoopSlider(containerWidth, duration, reverse) {
  const wrapper = document.createElement('div');
  wrapper.className = 'loop-slider';
  wrapper.style.setProperty('--duration', `${duration}ms`);
  wrapper.style.setProperty('--direction', reverse ? 'reverse' : 'normal');

  const inner = document.createElement('div');
  inner.className = 'inner';

  const tagsPerRow = Math.ceil(containerWidth / APPROX_TAG_WIDTH) + EXTRA_TAG_COUNT;

  const neededTags = [];
  while (neededTags.length < tagsPerRow) {
    neededTags.push(...shuffle(TAGS));
  }

  const finalTags = neededTags.slice(0, tagsPerRow);

  // 2 kez ekleniyor: loop için
  finalTags.forEach(tag => inner.appendChild(createTag(tag)));
  finalTags.forEach(tag => inner.appendChild(createTag(tag)));

  wrapper.appendChild(inner);
  return wrapper;
}

function init() {
  const tagList = document.getElementById('tag-list');
  tagList.innerHTML = ''; // Önceki içerikleri temizle
  const containerWidth = tagList.offsetWidth;

  for (let i = 0; i < ROWS; i++) {
    const slider = createLoopSlider(containerWidth, random(DURATION - 5000, DURATION + 5000), i % 2 === 1);
    tagList.appendChild(slider);
  }

  const fade = document.createElement('div');
  fade.className = 'fade';
  tagList.appendChild(fade);
}

// DOM yüklendiğinde ve pencere yeniden boyutlandırıldığında yeniden başlat
window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => {
  init();
});


/* process area */


const line = document.querySelector('.fixed-line');

  function positionFixedLine() {
    const rows = document.querySelectorAll('.process-row');
    if (rows.length < 2) return;

    const firstHeight = rows[0].offsetHeight;
    const lastHeight = rows[rows.length - 1].offsetHeight;

    const topOffset = firstHeight / 2;
    const bottomOffset = lastHeight / 2;

    line.style.top = topOffset + 'px';
    line.style.bottom = bottomOffset + 'px';
  }

  // Başta ve pencere resize olduğunda pozisyonu ayarla
  window.addEventListener('load', positionFixedLine);
  window.addEventListener('resize', positionFixedLine);

  // Scroll eventinde progress bar yüksekliğini güncelle
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const lineRect = line.getBoundingClientRect();
    const lineTop = lineRect.top + scrollTop;
    const lineHeight = line.offsetHeight;

    const windowHeight = window.innerHeight;
    const scrollProgress = (scrollTop + windowHeight / 2 - lineTop) / lineHeight;

    // 0 ile 1 arasında sınırlama
    const clamped = Math.min(Math.max(scrollProgress, 0), 1);

    const progressBar = line.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.height = (clamped * lineHeight) + 'px';
    }
  });

  // İlk çağrı
  positionFixedLine();


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


const header = document.querySelector(".accordion-header");
const content = document.querySelector(".accordion-content");

header.addEventListener("click", () => {
  header.classList.toggle("active");

  if (content.classList.contains("active")) {
    content.style.height = "0";
    content.classList.remove("active");
  } else {
    content.style.height = content.scrollHeight + "px";
    content.classList.add("active");
  }
});
