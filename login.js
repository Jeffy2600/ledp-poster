document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const languageSelect = document.getElementById('language-select');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Initialize language
    updateLanguage(languageSelect.value);

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const result = await login(username, password);
            if (result.success) {
                showNotification(getTranslation('login_success'), 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification(getTranslation('login_failed') + ': ' + result.message, 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showNotification(getTranslation('login_error'), 'error');
        }
    });

    languageSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });
});

function updateLanguage(lang) {
    changeLanguage(lang);
    document.querySelectorAll('[data-lang]').forEach(elem => {
        const key = elem.getAttribute('data-lang');
        elem.textContent = getTranslation(key);
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}