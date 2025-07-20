const texts = [
  "Markanıza özel sizlere dijital çözümler sunuyoruz.",
  "Web siteniz için modern çözümler üretiyoruz.",
  "SEO ile markanızı zirveye taşıyoruz.",
  "Yazılımda inovatif fikirlerle yanınızdayız."
];

const element = document.getElementById("banner-typewriter");
let textIndex = 0;
let charIndex = 0;

function typeText() {
  if (charIndex < texts[textIndex].length) {
    element.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); 
  } else {
    setTimeout(eraseText, 1500); 
  }
}

function eraseText() {
  if (charIndex > 0) {
    element.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length; 
    setTimeout(typeText, 500);
  }
}

typeText();

// Sayfa kararma - section gozukme fonksiyonu


document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('banner-bottom-text');
    const titleElement = section.querySelector('.banner-bottom-title');
    const overlay = document.getElementById('dim-overlay');
    const stickyWrapper = document.getElementById('sticky-wrapper');

    const originalText = titleElement.textContent;
    titleElement.innerHTML = '';
    const letterSpans = [];
    originalText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        titleElement.appendChild(span);
        letterSpans.push(span);
    });

    const letterAnimationScrollDistance = 400;
    let sectionOriginalTop = 0;
    let isSticky = false;
    let sectionHeight = 0;

    function calculatePositions() {
        sectionOriginalTop = stickyWrapper.offsetTop;
        sectionHeight = section.offsetHeight;
    }

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const sectionRect = section.getBoundingClientRect();
        const maxOverlayOpacity = 0.85;
        let newOverlayOpacity = 0;

        // Karartma sadece section tamamen görünüyorsa aktif
        const isSectionFullyVisible =
            sectionRect.top >= 0 &&
            sectionRect.bottom <= viewportHeight;

        if (isSectionFullyVisible) {
            newOverlayOpacity = maxOverlayOpacity;
        } else {
            newOverlayOpacity = 0;
        }
        overlay.style.backgroundColor = `rgba(0, 0, 0, ${newOverlayOpacity})`;

        const stickyTriggerScroll = sectionOriginalTop - (viewportHeight / 2) + (sectionHeight / 2);
        const animationEndScroll = stickyTriggerScroll + letterAnimationScrollDistance;

        if (scrollY >= stickyTriggerScroll && scrollY < animationEndScroll) {
            if (!isSticky) {
                isSticky = true;
                section.style.position = 'fixed';
                section.style.top = '50%';
                section.style.left = '0';
                section.style.width = '100%';
                section.style.transform = 'translateY(-50%)';
                stickyWrapper.style.height = `${sectionHeight + letterAnimationScrollDistance}px`;
            }

            const scrollWithinAnimation = scrollY - stickyTriggerScroll;
            let progress = Math.min(1, Math.max(0, scrollWithinAnimation / letterAnimationScrollDistance));
            const lettersToShowThick = Math.floor(progress * letterSpans.length);

            letterSpans.forEach((span, index) => {
                if (index < lettersToShowThick) {
                    span.classList.add('thick');
                } else {
                    span.classList.remove('thick');
                }
            });

        } else if (scrollY >= animationEndScroll) {
            if (isSticky) {
                isSticky = false;
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = 'auto';
                section.style.transform = 'none';
                stickyWrapper.style.height = `${sectionHeight}px`;
                letterSpans.forEach(span => span.classList.add('thick'));
            }
        } else {
            if (isSticky) {
                isSticky = false;
                section.style.position = 'relative';
                section.style.top = 'auto';
                section.style.left = 'auto';
                section.style.width = 'auto';
                section.style.transform = 'none';
                stickyWrapper.style.height = `${sectionHeight}px`;
                letterSpans.forEach(span => span.classList.remove('thick'));
            }
            if (scrollY < stickyTriggerScroll - viewportHeight * 0.1) {
                letterSpans.forEach(span => span.classList.remove('thick'));
            }
        }
    });

    window.dispatchEvent(new Event('scroll'));
});



// Services

document.addEventListener('DOMContentLoaded', () => {

    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const servicesContainer = document.getElementById('servicesContainer');
    const progressBar = document.getElementById('scrollProgressBar');


    if (!scrollWrapper || !servicesContainer || !progressBar) {
        return; 
    }

    let currentScrollX = 0;
    let maxScrollX = 0;
    const scrollSpeedFactor = 1.2;

    function calculateScrollLimits() {
        const wrapperWidth = scrollWrapper.offsetWidth;
        const containerWidth = servicesContainer.scrollWidth;

        if (containerWidth <= wrapperWidth) {
            maxScrollX = 0;
            servicesContainer.style.transform = `translateX(0px)`;
        } else {
            maxScrollX = containerWidth - wrapperWidth;
        }

        currentScrollX = Math.max(-maxScrollX, Math.min(0, currentScrollX));
        servicesContainer.style.transform = `translateX(${currentScrollX}px)`;
        updateProgressBar();
    }

    function handleWheelScroll(event) {
        event.preventDefault();

        let scrollAmount = event.deltaY * scrollSpeedFactor;
        currentScrollX -= scrollAmount;
        currentScrollX = Math.max(-maxScrollX, Math.min(0, currentScrollX));

        servicesContainer.style.transform = `translateX(${currentScrollX}px)`;
        updateProgressBar();
    }

    function updateProgressBar() {
        if (maxScrollX === 0) {
            progressBar.style.width = '0%';
            return;
        }
        const scrollPercentage = (Math.abs(currentScrollX) / maxScrollX) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    }

    let isDragging = false;
    let startX;
    let scrollLeftStart;

    scrollWrapper.addEventListener('mousedown', (e) => {
        if (maxScrollX === 0) {
            return;
        }
        isDragging = true;
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeftStart = currentScrollX;
        scrollWrapper.style.cursor = 'grabbing';
        servicesContainer.style.transition = 'none';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging || maxScrollX === 0) return;
        e.preventDefault();
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        let newScrollX = scrollLeftStart + walk;
        newScrollX = Math.max(-maxScrollX, Math.min(0, newScrollX));
        currentScrollX = newScrollX;
        servicesContainer.style.transform = `translateX(${currentScrollX}px)`;
        updateProgressBar();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            scrollWrapper.style.cursor = 'grab';
            servicesContainer.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
    });


    calculateScrollLimits();
    window.addEventListener('resize', () => {
        calculateScrollLimits();
    });

    scrollWrapper.addEventListener('wheel', handleWheelScroll, { passive: false });

});

const section = document.querySelector('#home-properties-section');
const slides = section.querySelectorAll('.properties-section-col');

function handleScrollAnimation() {
  const scrollY = window.scrollY;
  const winHeight = window.innerHeight;

  slides.forEach(slide => {
    const slideTop = slide.getBoundingClientRect().top + scrollY;
    const slideBottom = slideTop + slide.offsetHeight;

    if (scrollY + winHeight > slideTop && scrollY < slideBottom) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function handleResponsiveFeatures() {
  if (window.innerWidth >= 991) {
    section.classList.add('scroll-stacked-section');
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // sayfa yüklendiğinde de kontrol et
  } else {
    section.classList.remove('scroll-stacked-section');
    window.removeEventListener('scroll', handleScrollAnimation);
    slides.forEach(slide => slide.classList.remove('active'));
  }
}

document.addEventListener('DOMContentLoaded', handleResponsiveFeatures);
window.addEventListener('resize', handleResponsiveFeatures);





const header = document.querySelector(".accordion-header");
const content = document.querySelector(".accordion-content");

header.addEventListener("click", () => {
  header.classList.toggle("active");

  if (content.classList.contains("active")) {
    content.style.height = 0;
    content.classList.remove("active");
  } else {
    content.style.height = content.scrollHeight + "px";
    content.classList.add("active");
  }
});

window.addEventListener("resize", () => {
  if (content.classList.contains("active")) {
    content.style.height = content.scrollHeight + "px";
  }
});

var blogSwiper = new Swiper('.blog-swiper', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30, 
  navigation: {
    nextEl: '.swiper-blog-button-next',
    prevEl: '.swiper-blog-button-prev',
  },
  breakpoints: {
    992: {
      slidesPerView: 3
    },
    768: {
      slidesPerView: 2
    },
    0: {
      slidesPerView: 1
    }
  }
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