// src/login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const languageSelect = document.getElementById('language-select');

  // Initialize language
  updateLanguage(languageSelect.value);

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const result = await login(username, password);
      if (result.success) {
        alert(getTranslation('login_success'));
        window.location.href = 'index.html';
      } else {
        alert(getTranslation('login_failed') + ': ' + result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(getTranslation('login_error'));
    }
  });

  languageSelect.addEventListener('change', (e) => {
    updateLanguage(e.target.value);
  });
});

function updateLanguage(lang) {
  changeLanguage(lang);
  document.querySelectorAll('[data-lang]').forEach(elem => {
    const key = elem.getAttribute('data-lang');
    elem.textContent = getTranslation(key);
  });
}