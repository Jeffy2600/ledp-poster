// src/auth.js
async function login(username, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', data.token);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}