window.addEventListener('DOMContentLoaded', function() {
    const loginPrompt = document.getElementById('loginPrompt');
    const updateForm = document.getElementById('updateForm');
    const postsDiv = document.getElementById('updates');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');

    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    function renderPosts() {
        postsDiv.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem('galleryPosts') || '[]');
        posts.forEach(post => {
            const wrap = document.createElement('div');
            wrap.className = 'RevivalBox2 post';

            const title = document.createElement('h3');
            title.textContent = post.title;
            wrap.appendChild(title);

            const date = document.createElement('p');
            date.textContent = post.date;
            wrap.appendChild(date);

            if (post.media) {
                if (post.type === 'video') {
                    const vid = document.createElement('video');
                    vid.src = post.media;
                    vid.controls = true;
                    vid.className = 'post-video';
                    wrap.appendChild(vid);
                } else {
                    const img = document.createElement('img');
                    img.src = post.media;
                    img.className = 'post-image';
                    wrap.appendChild(img);
                }
            }

            if (loggedIn) {
                const del = document.createElement('button');
                del.textContent = 'Delete';
                del.className = 'btn delete-btn';
                del.addEventListener('click', function() {
                    const all = JSON.parse(localStorage.getItem('galleryPosts') || '[]');
                    const idx = all.findIndex(p => p.id === post.id);
                    if (idx > -1) {
                        all.splice(idx, 1);
                        localStorage.setItem('galleryPosts', JSON.stringify(all));
                        renderPosts();
                    }
                });
                wrap.appendChild(del);
            }

            postsDiv.appendChild(wrap);
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

    renderPosts();

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('mediaTitle').value.trim();
        const date = document.getElementById('mediaDate').value;
        const fileInput = document.getElementById('mediaInput');
        const file = fileInput.files[0];
        if (!title || !date || !file) return;
        const posts = JSON.parse(localStorage.getItem('galleryPosts') || '[]');

        const reader = new FileReader();
        reader.onload = function(evt) {
            posts.unshift({
                id: Date.now(),
                title,
                date,
                media: evt.target.result,
                type: file.type.startsWith('video') ? 'video' : 'image'
            });
            localStorage.setItem('galleryPosts', JSON.stringify(posts));
            updateForm.reset();
            renderPosts();
        };
        reader.readAsDataURL(file);
    });

    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedIn');
        window.location.reload();
    });

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            window.location.href = 'login.html?from=Galery.html';
        });
    }
});