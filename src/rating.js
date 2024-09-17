const db = require('./db');

async function ratePost(postId, userId, rating) {
  const checkSql = 'SELECT * FROM ratings WHERE post_id = ? AND user_id = ?';
  const existingRating = await db.query(checkSql, [postId, userId]);

  if (existingRating.length > 0) {
    const updateSql = 'UPDATE ratings SET rating = ?, updated_at = CURRENT_TIMESTAMP WHERE post_id = ? AND user_id = ?';
    await db.query(updateSql, [rating, postId, userId]);
  } else {
    const insertSql = 'INSERT INTO ratings (post_id, user_id, rating) VALUES (?, ?, ?)';
    await db.query(insertSql, [postId, userId, rating]);
  }

  await updateAverageRating(postId);
}

async function getPostRating(postId) {
  const sql = 'SELECT AVG(rating) as average_rating, COUNT(*) as total_ratings FROM ratings WHERE post_id = ?';
  const result = await db.query(sql, [postId]);
  return {
    averageRating: result[0].average_rating || 0,
    totalRatings: result[0].total_ratings || 0
  };
}

async function getUserRating(postId, userId) {
  const sql = 'SELECT rating FROM ratings WHERE post_id = ? AND user_id = ?';
  const result = await db.query(sql, [postId, userId]);
  return result.length > 0 ? result[0].rating : null;
}

async function updateAverageRating(postId) {
  const avgSql = 'SELECT AVG(rating) as avg_rating FROM ratings WHERE post_id = ?';
  const avgResult = await db.query(avgSql, [postId]);
  const averageRating = avgResult[0].avg_rating || 0;

  const updateSql = 'UPDATE posts SET average_rating = ? WHERE id = ?';
  await db.query(updateSql, [averageRating, postId]);
}

module.exports = {
  ratePost,
  getPostRating,
  getUserRating
};