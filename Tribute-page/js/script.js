side_bar = document.querySelector(".side-bar");
menu_icon = document.querySelector(".menu-icon");
closing_icon = document.querySelector(".closing-icon");
nav_bars = document.getElementsByClassName('nav-bar');
themeSwitch = document.getElementById('theme-switch');
let darkMode = localStorage.getItem('darkMode');
const enableDarkMode = () => {
    document.body.classList.add('darkMode');
    localStorage.setItem('darkMode', 'active');
}
const disableDarkMode = () =>{
    document.body.classList.remove('darkMode');
    localStorage.setItem('darkMode', null);
}
if(darkMode === 'active') enableDarkMode() 
themeSwitch.onclick = function(){
    darkMode = localStorage.getItem('darkMode')
    darkMode !== 'active' ? enableDarkMode() : disableDarkMode();
}
menu_icon.onclick = function () {
    side_bar.style.display = 'flex';
}
closing_icon.onclick = function () {
    side_bar.style.display = 'none';
}
for (let i = 0; i < nav_bars.length; i++) {
    nav_bars[i].onclick = function () {
        side_bar.style.display = 'none';
    }
}
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Adjust the scroll value as needed
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
