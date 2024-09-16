// language.js

const translations = {
    en: {
        welcome: "Welcome to the Post Sharing Platform",
        login: "Login",
        profile: "Profile",
        createPost: "Create Post",
        searchPlaceholder: "Search posts...",
        searchButton: "Search"
    },
    th: {
        welcome: "ยินดีต้อนรับสู่แพลตฟอร์มแบ่งปันโพสต์",
        login: "เข้าสู่ระบบ",
        profile: "โปรไฟล์",
        createPost: "สร้างโพสต์",
        searchPlaceholder: "ค้นหาโพสต์...",
        searchButton: "ค้นหา"
    }
};

function changeLanguage(lang) {
    document.querySelector('html').setAttribute('lang', lang);
    document.querySelector('h1').textContent = translations[lang].welcome;
    document.querySelector('#login-btn').textContent = translations[lang].login;
    document.querySelector('a[href="profile.html"]').textContent = translations[lang].profile;
    document.querySelector('a[href="post.html"]').textContent = translations[lang].createPost;
    document.querySelector('#search-input').setAttribute('placeholder', translations[lang].searchPlaceholder);
    document.querySelector('#search-btn').textContent = translations[lang].searchButton;
}

document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', function() {
        changeLanguage(this.value);
    });

    // Set initial language
    changeLanguage(languageSelect.value);
});