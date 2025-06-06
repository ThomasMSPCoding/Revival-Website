window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const error = document.getElementById('error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'Journal.html';
        } else {
            error.textContent = 'Invalid credentials';
        }
    });
});
