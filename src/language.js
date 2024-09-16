// language.js

const translations = {
  en: {
    // Index page
    welcome: "Welcome to the Post Sharing Platform",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    createPost: "Create Post",
    searchPlaceholder: "Search posts...",
    searchButton: "Search",

    // Login page
    login_title: "Login - Post Sharing Platform",
    login_heading: "Login",
    username_label: "Username:",
    password_label: "Password:",
    login_button: "Login",
    no_account: "Don't have an account?",
    register_link: "Register here",
    language_label: "Language:"
  },
  th: {
    // Index page
    welcome: "ยินดีต้อนรับสู่แพลตฟอร์มแบ่งปันโพสต์",
    login: "เข้าสู่ระบบ",
    logout: "ออกจากระบบ",
    profile: "โปรไฟล์",
    createPost: "สร้างโพสต์",
    searchPlaceholder: "ค้นหาโพสต์...",
    searchButton: "ค้นหา",

    // Login page
    login_title: "เข้าสู่ระบบ - แพลตฟอร์มแบ่งปันโพสต์",
    login_heading: "เข้าสู่ระบบ",
    username_label: "ชื่อผู้ใช้:",
    password_label: "รหัสผ่าน:",
    login_button: "เข้าสู่ระบบ",
    no_account: "ยังไม่มีบัญชี?",
    register_link: "ลงทะเบียนที่นี่",
    language_label: "ภาษา:"
  }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  updatePageContent();
  localStorage.setItem('preferredLanguage', lang);
}

function getTranslation(key) {
  return translations[currentLanguage][key] || key;
}

function updatePageContent() {
  document.querySelectorAll('[data-lang]').forEach(element => {
    const key = element.getAttribute('data-lang');
    if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text') {
      element.setAttribute('placeholder', getTranslation(key));
    } else if (element.tagName === 'A' && element.getAttribute('href')) {
      element.textContent = getTranslation(key);
    } else {
      element.textContent = getTranslation(key);
    }
  });
}

function initializeLanguage() {
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      changeLanguage(this.value);
    });

    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    languageSelect.value = preferredLanguage;
    changeLanguage(preferredLanguage);
  }
  updatePageContent();
}

document.addEventListener('DOMContentLoaded', initializeLanguage);

// Export functions for use in other scripts
window.changeLanguage = changeLanguage;
window.getTranslation = getTranslation;
window.updatePageContent = updatePageContent;