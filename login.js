// Simple login handling. Edit validUser and validPass below to change credentials.
window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Change the following credentials to customize the login
        const validUser = 'Touge';
        const validPass = 'ReviTouge18';

        if (username === validUser && password === validPass) {
            localStorage.setItem('loggedIn', 'true');
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get('from') || 'Journal.html';
            window.location.href = redirect;
        } else {
            error.textContent = 'Invalid credentials';
        }
    });
});