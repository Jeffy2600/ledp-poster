const db = require('./db');

class Post {
  constructor(id, title, content, author, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
  }

  static async create(title, content, author) {
    const [result] = await db.query(
      'INSERT INTO posts (title, content, author, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, author]
    );
    return new Post(result.insertId, title, content, author, new Date());
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (rows.length > 0) {
      const post = rows[0];
      return new Post(post.id, post.title, post.content, post.author, post.created_at);
    }
    return null;
  }

  static async getAll() {
    const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    return rows.map(post => new Post(post.id, post.title, post.content, post.author, post.created_at));
  }

  async update() {
    await db.query(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [this.title, this.content, this.id]
    );
  }

  async delete() {
    await db.query('DELETE FROM posts WHERE id = ?', [this.id]);
  }
}

module.exports = Post;