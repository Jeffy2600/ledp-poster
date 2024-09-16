document.addEventListener('DOMContentLoaded', function() {
  // เช็คสถานะการล็อกอิน
  checkAuthStatus();

  // โหลดโพสต์
  loadPosts();

  // เพิ่ม event listener สำหรับปุ่มค้นหา
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', searchPosts);

  // เพิ่ม event listener สำหรับการเปลี่ยนภาษา
  const languageSelect = document.getElementById('language-select');
  languageSelect.addEventListener('change', changeLanguage);
});

function checkAuthStatus() {
  // เช็คสถานะการล็อกอินจาก auth.js
  auth.checkAuth().then(isLoggedIn => {
    const loginBtn = document.getElementById('login-btn');
    if (isLoggedIn) {
      loginBtn.textContent = 'Logout';
      loginBtn.href = '#';
      loginBtn.addEventListener('click', logout);
    } else {
      loginBtn.textContent = 'Login';
      loginBtn.href = 'login.html';
    }
  });
}

function loadPosts() {
  // โหลดโพสต์จาก db.js
  db.getPosts().then(posts => {
    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = '';
    posts.forEach(post => {
      const postElement = createPostElement(post);
      postsSection.appendChild(postElement);
    });
  });
}

function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="like-btn" data-id="${post.id}">Like</button>
        <span class="like-count">${post.likes}</span>
    `;
  return postDiv;
}

function searchPosts() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  // ค้นหาโพสต์โดยใช้ฟังก์ชันจาก search.js
  search.searchPosts(query).then(loadPosts);
}

function changeLanguage() {
  const selectedLanguage = document.getElementById('language-select').value;
  // เปลี่ยนภาษาโดยใช้ฟังก์ชันจาก language.js
  language.changeLanguage(selectedLanguage);
}

function logout() {
  // ล็อกเอาท์โดยใช้ฟังก์ชันจาก auth.js
  auth.logout().then(() => {
    window.location.reload();
  });
}