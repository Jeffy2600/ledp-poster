// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize language
  initializeLanguage();

  // Load posts
  loadPosts();

  // Set up event listeners
  setupEventListeners();

  // Check authentication status
  checkAuthStatus();
});

function initializeLanguage() {
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const selectedLanguage = languageSelect.value;
      changeLanguage(selectedLanguage);
    });
  }
  // Set initial language
  changeLanguage(languageSelect ? languageSelect.value : 'en');
}

function loadPosts() {
  db.getPosts()
    .then(posts => {
      displayPosts(posts);
      initializeRatings();
      initializeComments();
    })
    .catch(error => console.error('Error loading posts:', error));
}

function setupEventListeners() {
  const searchButton = document.getElementById('search-btn');
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  }
}

function performSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const searchTerm = searchInput.value;
    search.searchPosts(searchTerm)
      .then(results => displaySearchResults(results))
      .catch(error => console.error('Error searching posts:', error));
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById('posts');
  if (postsContainer) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  }
}

function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <div class="post-meta">
      <span>Author: ${post.author}</span>
      <span>Date: ${new Date(post.date).toLocaleDateString()}</span>
    </div>
    <div class="rating" data-post-id="${post.id}"></div>
    <div class="comments" data-post-id="${post.id}"></div>
  `;
  return postDiv;
}

function displaySearchResults(results) {
  const postsContainer = document.getElementById('posts');
  if (postsContainer) {
    postsContainer.innerHTML = '';
    if (results.length === 0) {
      postsContainer.innerHTML = '<p>No results found.</p>';
    } else {
      results.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
      });
    }
  }
}

function checkAuthStatus() {
  const user = auth.getCurrentUser();
  updateNavigation(user);
}

function updateNavigation(user) {
  const loginLink = document.querySelector('a[data-lang="login"]');
  const profileLink = document.querySelector('a[data-lang="profile"]');
  const createPostLink = document.querySelector('a[data-lang="createPost"]');

  if (user) {
    if (loginLink) loginLink.textContent = getTranslation('logout');
    if (profileLink) profileLink.style.display = 'inline-block';
    if (createPostLink) createPostLink.style.display = 'inline-block';
  } else {
    if (loginLink) loginLink.textContent = getTranslation('login');
    if (profileLink) profileLink.style.display = 'none';
    if (createPostLink) createPostLink.style.display = 'none';
  }
}

function initializeRatings() {
  const ratingElements = document.querySelectorAll('.rating');
  ratingElements.forEach(element => {
    const postId = element.getAttribute('data-post-id');
    rating.initRating(element, postId);
  });
}

function initializeComments() {
  const commentElements = document.querySelectorAll('.comments');
  commentElements.forEach(element => {
    const postId = element.getAttribute('data-post-id');
    comment.loadComments(element, postId);
  });
}

// Load advertisements
ads.loadAds();

// Initialize recommendations
recommendation.initRecommendations();