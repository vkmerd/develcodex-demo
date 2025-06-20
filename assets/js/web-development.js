const developmenttexts = [
  "Web Yazılım Ajansı",
  "SEO Ajansı",
  "Reklam Ajansı",
];

const typeWriteElement = document.getElementById("development-typewriter");
let textDevelopmentIndex = 0;
let textDevelopmentCharIndex = 0;
let isDeleting = false;

function typeDevelopMentText() {
  const currentText = developmenttexts[textDevelopmentIndex];
  
  if (!isDeleting) {
    // Yazma modu
    typeWriteElement.textContent = currentText.substring(0, textDevelopmentCharIndex + 1);
    textDevelopmentCharIndex++;

    if (textDevelopmentCharIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeDevelopMentText, 1500); 
    } else {
      setTimeout(typeDevelopMentText, 100); 
    }
  } else {
    // Silme modu
    typeWriteElement.textContent = currentText.substring(0, textDevelopmentCharIndex - 1);
    textDevelopmentCharIndex--;

    if (textDevelopmentCharIndex === 0) {
      isDeleting = false;
      textDevelopmentIndex = (textDevelopmentIndex + 1) % developmenttexts.length;
      setTimeout(typeDevelopMentText, 500); 
    } else {
      setTimeout(typeDevelopMentText, 50); 
    }
  }
}

typeDevelopMentText();



document.addEventListener('DOMContentLoaded', () => {
  let allowScroll = false;
  let manualProgress = 0;
  let animatedProgress = 0;
  let hasRevealedOnce = false;

  const section = document.querySelector('.web-software-intro-section');
  const targetEl = document.querySelector('.custom-video-wrapper');
  const sloganText = document.getElementById('animated-slogan-text');
  const textReveal = document.getElementById('animated-text-reveal');
  const scrollDuration = window.innerHeight * 0.8;

  section.classList.add('lock-scroll');

  window.addEventListener('wheel', (e) => {
    if (!allowScroll) e.preventDefault();

    manualProgress += e.deltaY / scrollDuration;
    manualProgress = Math.max(0, Math.min(1, manualProgress));

    if (manualProgress >= 1 && !allowScroll) {
      allowScroll = true;
      section.classList.remove('lock-scroll');
    }

    if (manualProgress < 1 && allowScroll && !hasRevealedOnce) {
      allowScroll = false;
      section.classList.add('lock-scroll');
    }
  }, { passive: false });

  function animate() {
    const easing = 0.1;
    const delta = manualProgress - animatedProgress;

    if (Math.abs(delta) > 0.001) {
      animatedProgress += delta * easing;
      applyAnimation(animatedProgress);
    }

    requestAnimationFrame(animate);
  }

  function applyAnimation(progress) {
    const translateStart = -7.102;
    const translateEnd = -90;
    const maxWidthStart = 51.9232;
    const maxWidthEnd = 90;
    const maxProgressForGrowth = 0.9;

    const clampedGrowthProgress = Math.min(progress, maxProgressForGrowth);
    const currentTranslate = translateStart + (translateEnd - translateStart) * clampedGrowthProgress;
    const currentMaxWidth = maxWidthStart + (maxWidthEnd - maxWidthStart) * clampedGrowthProgress;

    targetEl.style.transform = `translate(-50%, 0%) translate3d(0, ${currentTranslate}%, 0) rotate(0deg) scale(1)`;
    targetEl.style.maxWidth = `${currentMaxWidth}%`;

    const fillStart = 0.8;
    const fillEnd = 1;

    if (progress >= fillStart || hasRevealedOnce) {
      const effectiveProgress = hasRevealedOnce ? 1 : Math.min(1, (progress - fillStart) / (fillEnd - fillStart));
      sloganText.style.backgroundSize = `${effectiveProgress * 100}% 100%`;

      if (textReveal) {
        const percent = Math.floor(effectiveProgress * 100);
        textReveal.classList.add('reveal-visible');
        textReveal.style.backgroundSize = `${percent}% 100%`;
      }

      if (effectiveProgress >= 1 && !allowScroll) {
        allowScroll = true;
        section.classList.remove('lock-scroll');
        hasRevealedOnce = true;
      }
    } else {
      sloganText.style.backgroundSize = `0% 100%`;

      if (!hasRevealedOnce && textReveal) {
        textReveal.classList.remove('reveal-visible');
        textReveal.style.backgroundSize = `0% 100%`;
      }
    }
  }

  animate();
});

const items = document.querySelectorAll('.web-software-programmer-box.swiper-slide');
const total = items.length;
let currentIndex = 0;

function updateCarousel() {
    items.forEach(item => {
        item.classList.remove(
            'swiper-slide-active',
            'swiper-slide-left',
            'swiper-slide-right',
            'swiper-slide-hidden'
        );
    });

    items[currentIndex].classList.add('swiper-slide-active');

    const leftIndex = (currentIndex - 1 + total) % total;
    const rightIndex = (currentIndex + 1) % total;

    items[leftIndex].classList.add('swiper-slide-left');
    items[rightIndex].classList.add('swiper-slide-right');

    items.forEach((item, idx) => {
        if (idx !== currentIndex && idx !== leftIndex && idx !== rightIndex) {
            item.classList.add('swiper-slide-hidden');
        }
    });
}

function rotateCarousel() {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
}

updateCarousel();
setInterval(rotateCarousel, 6000);

const teamItems = document.querySelectorAll('.team-item');
const detailItems = document.querySelectorAll('.team-light-detail-item');
const lines = document.querySelectorAll('.team-line');
const linesTop = document.querySelectorAll('#walks .line');
const linesBottom = document.querySelectorAll('#walks-bottom .line');

teamItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        detailItems.forEach(detail => detail.classList.remove('active'));
        if (detailItems[index]) {
            detailItems[index].classList.add('active');
        }

        lines.forEach(line => line.classList.remove('active'));
        if (lines[index]) {
            lines[index].classList.add('active');
        }
    });

    item.addEventListener('mouseleave', () => {
        lines.forEach(line => line.classList.remove('active'));
    });
});

document.querySelectorAll('.team-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const lineId = item.getAttribute('data-line');
        document.querySelectorAll(`.line-${lineId}, .fill-${lineId}, #walks-bottom .line-${lineId}, #walks-bottom .fill-${lineId}`).forEach(path => {
            path.style.opacity = '1';
        });
    });

    item.addEventListener('mouseleave', () => {
        const lineId = item.getAttribute('data-line');
        document.querySelectorAll(`.line-${lineId}, .fill-${lineId}, #walks-bottom .line-${lineId}, #walks-bottom .fill-${lineId}`).forEach(path => {
            path.style.opacity = '0.3';
        });
    });
});

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
