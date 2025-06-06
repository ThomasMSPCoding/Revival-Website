window.addEventListener('DOMContentLoaded', function() {
    const loginPrompt = document.getElementById('loginPrompt');
    const updateForm = document.getElementById('updateForm');
    const updatesDiv = document.getElementById('updates');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');

    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    function renderUpdates() {
        updatesDiv.innerHTML = '';
        const updates = JSON.parse(localStorage.getItem('journalUpdates') || '[]');
        updates.forEach(update => {
            const post = document.createElement('div');
            post.className = 'RevivalBox2 post';

            const p = document.createElement('p');
            p.textContent = update.text;
            post.appendChild(p);

            if (update.image) {
                const img = document.createElement('img');
                img.src = update.image;
                img.className = 'post-image';
                post.appendChild(img);
            }

            if (loggedIn) {
                const del = document.createElement('button');
                del.textContent = 'Delete';
                del.className = 'btn delete-btn';
                del.addEventListener('click', function() {
                    const all = JSON.parse(localStorage.getItem('journalUpdates') || '[]');
                    const idx = all.findIndex(u => u.id === update.id);
                    if (idx > -1) {
                        all.splice(idx, 1);
                        localStorage.setItem('journalUpdates', JSON.stringify(all));
                        renderUpdates();
                    }
                });
                post.appendChild(del);
            }

            updatesDiv.appendChild(post);
        });
    }

    if (loggedIn) {
        loginPrompt.style.display = 'none';
        updateForm.style.display = 'flex';
        logoutBtn.style.display = 'inline-block';
        if (loginBtn) loginBtn.style.display = 'none';
    } else {
        updateForm.style.display = 'none';
        logoutBtn.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'block';
    }

    renderUpdates();

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = document.getElementById('updateContent').value.trim();
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];
        if (!text && !file) return;
        const updates = JSON.parse(localStorage.getItem('journalUpdates') || '[]');

        function save(imageData) {
            updates.unshift({ id: Date.now(), text, image: imageData || null });
            localStorage.setItem('journalUpdates', JSON.stringify(updates));
            document.getElementById('updateContent').value = '';
            fileInput.value = '';
            renderUpdates();
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                save(evt.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            save(null);
        }
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.reload();
    });

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

