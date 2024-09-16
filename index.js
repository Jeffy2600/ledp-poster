// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize language
  initializeLanguage();

  // Load posts
  loadPosts();

  // Set up event listeners
  setupEventListeners();
});

function initializeLanguage() {
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const selectedLanguage = languageSelect.value;
      language.changeLanguage(selectedLanguage);
    });
  }
  // Set initial language
  language.changeLanguage(languageSelect ? languageSelect.value : 'en');
}

function loadPosts() {
  // Implement your post loading logic here
  // For example:
  // fetchPosts().then(posts => displayPosts(posts));
}

function setupEventListeners() {
  const searchButton = document.getElementById('search-btn');
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  // Add more event listeners as needed
}

function performSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const searchTerm = searchInput.value;
    // Implement your search logic here
    // For example:
    // searchPosts(searchTerm).then(results => displaySearchResults(results));
  }
}

// Add any other necessary functions for your application