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

const swipers = new Swiper(".programmingSwiper", {
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
