const db = require('./db');

async function createPost(title, content, userId) {
  const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
  const result = await db.query(sql, [title, content, userId]);
  return result.insertId;
}

async function getPosts(limit = 10, offset = 0) {
  const sql = 'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
  return await db.query(sql, [limit, offset]);
}

async function getPostById(postId) {
  const sql = 'SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?';
  const posts = await db.query(sql, [postId]);
  return posts[0];
}

async function updatePost(postId, title, content) {
  const sql = 'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  await db.query(sql, [title, content, postId]);
}

async function deletePost(postId) {
  const sql = 'DELETE FROM posts WHERE id = ?';
  await db.query(sql, [postId]);
}

async function getPostsByUser(userId, limit = 10, offset = 0) {
  const sql = 'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
  return await db.query(sql, [userId, limit, offset]);
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser
};