document.addEventListener("DOMContentLoaded", function() {
    const hambruger = document.getElementById("hambruger");
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});