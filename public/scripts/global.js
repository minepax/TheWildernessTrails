function initMenu() {
    const menuBtn = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('.article-nav');
    
    menuBtn.addEventListener('click', () => {
        nav.toggleAttribute("data-visible");
    });
}

initMenu()
document.addEventListener("astro:after-swap", initMenu)