// Mobile Menu

function openMobileMenu() {
    const hamburgerLink = document.querySelector('a.mobile-hamburger-menu');
    const hamburgerIcon = document.querySelector('.hamburger-menu');
    const body = document.body;
    const header = document.querySelector('header');
    const sideMenu = document.getElementById('side-menu');
    const content = sideMenu.querySelector('.content');

    hamburgerLink.setAttribute('onclick', 'closeMobileMenu()');
    hamburgerIcon.classList.add('animate');
    body.classList.add('modal-opened');
    header.classList.add('mobile-menu-opened');

    sideMenu.style.opacity = 0;
    sideMenu.style.display = 'flex';

    // Fade in efekti
    let opacity = 0;
    const fadeIn = setInterval(() => {
        opacity += 0.05;
        sideMenu.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeIn);
            content.classList.add('in');
        }
    }, 20);
}

function closeMobileMenu() {
    const hamburgerLink = document.querySelector('a.mobile-hamburger-menu');
    const hamburgerIcon = document.querySelector('.hamburger-menu');
    const body = document.body;
    const header = document.querySelector('header');
    const sideMenu = document.getElementById('side-menu');
    const content = sideMenu.querySelector('.content');

    hamburgerLink.setAttribute('onclick', 'openMobileMenu()');
    hamburgerIcon.classList.remove('animate');
    body.classList.remove('modal-opened');
    header.classList.remove('mobile-menu-opened');
    content.classList.remove('in');

    // Fade out efekti
    let opacity = 1;
    const fadeOut = setInterval(() => {
        opacity -= 0.05;
        sideMenu.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeOut);
            sideMenu.style.display = 'none';
        }
    }, 20); // Yaklaşık 400ms
}

document.querySelectorAll("#side-menu ul.menu li.menu-item-has-children > a").forEach(link => {
    const wrapper = document.createElement("span");
    wrapper.innerHTML = `
<svg><use xlink:href="#chevron-down"></use></svg>   
    `;
    const svg = wrapper.firstElementChild;
    link.appendChild(svg);

    svg.addEventListener("click", function (e) {
        e.preventDefault();
        const li = link.closest('li');
        li.classList.toggle('opened');
    });
});


// document.querySelector("#side-menu ul.menu li.menu-item-has-children > a").append('<svg><use xlink:href="#chevron-down"></use></svg>');

// document.querySelector('#side-menu ul.menu li.menu-item-has-children > a > svg').click(function(e) {
//     e.preventDefault();
//     this.parent('a').parent('li').toggleClass('opened');
// });

// const menuicon = document.querySelector(".menu-icons");
// const desktop = document.querySelector(".desktop-menu");
// const closemenu = document.querySelector(".close-menu");
// const backMenu = document.querySelector(".back-menu")
// const hizmetlerimizItem = document.querySelector('.desktop-menu-item.has-submenu');
// const mainMenu = document.querySelector('.main-menu-container');
// const submenuContainer = document.querySelector('.submenu-container')
// const submenuLeft = document.querySelector('.submenu-left');
// const submenuRight = document.querySelector('.submenu-right');
// const submenuItems = document.querySelectorAll('.submenu-left .has-submenu');

// menuicon.addEventListener("click", function() {
//     desktop.classList.add("desktop-active");
// });

// backMenu.addEventListener("click", function(){
//     submenuContainer.classList.remove("active");
//     mainMenu.classList.remove("main-menu-hidden")
//     closemenu.classList.remove('hidden');
// })

// closemenu.addEventListener("click", function() {
//     desktop.classList.remove("desktop-active");
//     mainMenu.classList.remove('main-menu-hidden');
//     submenuLeft.classList.remove('active');
//     submenuRight.classList.remove('active');
// });

// hizmetlerimizItem.addEventListener('click', function(e) {
//     e.preventDefault();
//     mainMenu.classList.add('main-menu-hidden');
//     submenuContainer.classList.add('active');
//     closemenu.classList.add('hidden');
// });

// submenuItems.forEach(item => {
//     item.addEventListener('click', function(e) {
//         e.preventDefault();
//         submenuRight.classList.add('active');
//     });
// });


const submenuItemList = document.querySelectorAll('.submenu-item.has-submenu'); // Sol menü öğeleri
const submenuLists = document.querySelectorAll('.has-submenu-list'); // Sağdaki alt menüler

submenuItemList.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault(); 

        const menuId = this.getAttribute('data-id');

        submenuLists.forEach(list => {
            list.classList.remove('testimonial-active');
        });

        const activeMenu = document.querySelector(`.has-submenu-list[data-id="${menuId}"]`);
        if (activeMenu) {
            activeMenu.classList.add('testimonial-active');
        }
    });
});
