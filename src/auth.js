// โค้ดสำหรับการจัดการการยืนยันตัวตน
console.log('Auth module loaded');

export function login(username, password) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json());
}

export function logout() {
    return fetch('/api/logout', {
        method: 'POST',
    })
    .then(response => response.json());
}

export function checkAuth() {
    return fetch('/api/checkAuth')
        .then(response => response.json());
}
