const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Replace with a secure secret key

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  try {
    const result = await db.query(sql, [username, hashedPassword]);
    return { success: true, userId: result.insertId };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: 'Username already exists' };
    }
    throw error;
  }
}

async function login(username, password) {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const users = await db.query(sql, [username]);
  if (users.length === 0) {
    return { success: false, message: 'User not found' };
  }
  const user = users[0];
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    return { success: true, token: token };
  } else {
    return { success: false, message: 'Incorrect password' };
  }
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { success: true, userId: decoded.userId, username: decoded.username };
  } catch (error) {
    return { success: false, message: 'Invalid token' };
  }
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await getUserById(userId);
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    return { success: false, message: 'Incorrect old password' };
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  await db.query(sql, [hashedNewPassword, userId]);
  return { success: true, message: 'Password updated successfully' };
}

async function getUserById(userId) {
  const sql = 'SELECT id, username FROM users WHERE id = ?';
  const users = await db.query(sql, [userId]);
  return users[0];
}

module.exports = {
  register,
  login,
  verifyToken,
  changePassword,
  getUserById
};