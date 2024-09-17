const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute SQL queries
async function query(sql, params) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Function to get ad settings
async function getAdSettings() {
  const sql = 'SELECT * FROM ad_settings WHERE id = 1';
  const result = await query(sql);
  return result[0];
}

// Function to update ad settings
async function updateAdSettings(settings) {
  const sql = 'UPDATE ad_settings SET frequency = ?, position = ?, type = ? WHERE id = 1';
  await query(sql, [settings.frequency, settings.position, settings.type]);
}

// Function to get ads
async function getAds() {
  const sql = 'SELECT * FROM ads WHERE active = 1 ORDER BY RAND() LIMIT 5';
  return await query(sql);
}

module.exports = {
  query,
  getAdSettings,
  updateAdSettings,
  getAds
};