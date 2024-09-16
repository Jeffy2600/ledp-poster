// index.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initializeLanguage();

    // Initialize other components
    initializeAuth();
    initializeSearch();
    initializePosts();
    initializeRating();
    initializeComments();
    initializeRecommendations();
    initializeAds();
});

function initializeLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });

        // Get browser language
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Set default language based on browser language
        let defaultLang = 'en';
        if (browserLang.startsWith('th')) {
            defaultLang = 'th';
        }

        // Use stored language preference if available, otherwise use the default
        const preferredLanguage = localStorage.getItem('preferredLanguage') || defaultLang;
        
        languageSelect.value = preferredLanguage;
        changeLanguage(preferredLanguage);
    }
}

function changeLanguage(lang) {
    if (typeof window.changeLanguage === 'function') {
        window.changeLanguage(lang);
    } else {
        console.error('changeLanguage function not found. Make sure language.js is loaded.');
    }
}

function initializeAuth() {
    // Initialize authentication
    if (typeof initAuth === 'function') {
        initAuth();
    } else {
        console.error('initAuth function not found. Make sure auth.js is loaded.');
    }
}

function initializeSearch() {
    // Initialize search functionality
    if (typeof initSearch === 'function') {
        initSearch();
    } else {
        console.error('initSearch function not found. Make sure search.js is loaded.');
    }
}

function initializePosts() {
    // Initialize posts
    if (typeof loadPosts === 'function') {
        loadPosts();
    } else {
        console.error('loadPosts function not found. Make sure post.js is loaded.');
    }
}

function initializeRating() {
    // Initialize rating system
    if (typeof initRating === 'function') {
        initRating();
    } else {
        console.error('initRating function not found. Make sure rating.js is loaded.');
    }
}

function initializeComments() {
    // Initialize comments system
    if (typeof initComments === 'function') {
        initComments();
    } else {
        console.error('initComments function not found. Make sure comment.js is loaded.');
    }
}

function initializeRecommendations() {
    // Initialize recommendation system
    if (typeof initRecommendations === 'function') {
        initRecommendations();
    } else {
        console.error('initRecommendations function not found. Make sure recommendation.js is loaded.');
    }
}

function initializeAds() {
    // Initialize ads
    if (typeof initAds === 'function') {
        initAds();
    } else {
        console.error('initAds function not found. Make sure ads.js is loaded.');
    }
}