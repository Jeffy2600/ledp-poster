// Application configuration settings
const config = {
    // Database configuration
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'your_username',
        password: process.env.DB_PASSWORD || 'your_password',
        database: process.env.DB_NAME || 'your_database_name',
        connectionLimit: 10
    },
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || 'your-api-key',
    timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000,
};

const mysql = require('mysql2/promise');
let pool;

// Function to initialize database connection pool
function initializePool() {
    pool = mysql.createPool(config.database);
}

// Function to execute database queries
async function query(sql, params) {
    if (!pool) {
        initializePool();
    }
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

// Function to get configuration data from the database
async function getDatabaseConfig() {
    const sql = 'SELECT * FROM app_config WHERE id = 1';
    try {
        const result = await query(sql);
        if (result.length > 0) {
            config.apiUrl = result[0].api_url || config.apiUrl;
            config.apiKey = result[0].api_key || config.apiKey;
            config.timeout = result[0].timeout || config.timeout;
        }
    } catch (error) {
        console.error('Error fetching config from database:', error);
    }
}

// Function to initialize configuration
async function initializeConfig() {
    await getDatabaseConfig();
    return config;
}

module.exports = {
    config,
    query,
    initializeConfig
};