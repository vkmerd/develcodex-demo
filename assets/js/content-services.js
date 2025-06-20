const section = document.getElementById("content-services-slogan");
const textEl = document.querySelector(".content-services-slogan-text");

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

document.addEventListener('DOMContentLoaded', () => {

    const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
    const servicesContainer = document.getElementById('content-services-referencesContainer');
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