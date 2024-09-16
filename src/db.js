const mysql = require('mysql2/promise');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ฟังก์ชันสำหรับค้นหาโพสต์
async function searchPosts(searchTerm) {
  const [rows] = await pool.execute(
    'SELECT * FROM posts WHERE MATCH(title, content) AGAINST(? IN NATURAL LANGUAGE MODE)',
    [searchTerm]
  );
  return rows;
}

// ฟังก์ชันสำหรับดึงโพสต์มาแสดง
async function getPosts(limit = 10, offset = 0) {
  const [rows] = await pool.execute(
    'SELECT * FROM posts ORDER BY createdAt DESC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows;
}

// คงไว้สำหรับระบบควบคุมโฆษณา
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  keywords: [String]
});

adSchema.index({ title: 'text', description: 'text', keywords: 'text' });

const Ad = mongoose.model('Ad', adSchema);

module.exports = { searchPosts, getPosts, Ad };