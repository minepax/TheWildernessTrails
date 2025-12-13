const menuBtn = document.querySelector('.hamburger-btn');
const nav = document.querySelector('.article-nav');

menuBtn.addEventListener('click', () => {
    nav.toggleAttribute("data-visible");
});