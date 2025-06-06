window.addEventListener('DOMContentLoaded', function() {
    const loginPrompt = document.getElementById('loginPrompt');
    const updateForm = document.getElementById('updateForm');
    const updatesDiv = document.getElementById('updates');
    const logoutBtn = document.getElementById('logoutBtn');

    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    function renderUpdates() {
        updatesDiv.innerHTML = '';
        const updates = JSON.parse(localStorage.getItem('journalUpdates') || '[]');
        updates.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            updatesDiv.appendChild(p);
        });
    }

    if (loggedIn) {
        loginPrompt.style.display = 'none';
        updateForm.style.display = 'block';
        logoutBtn.style.display = 'inline-block';
    } else {
        updateForm.style.display = 'none';
        logoutBtn.style.display = 'none';
    }

    renderUpdates();

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = document.getElementById('updateContent').value.trim();
        if (!text) return;
        const updates = JSON.parse(localStorage.getItem('journalUpdates') || '[]');
        updates.unshift(text);
        localStorage.setItem('journalUpdates', JSON.stringify(updates));
        document.getElementById('updateContent').value = '';
        renderUpdates();
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.reload();
    });
});
