// Application configuration settings
const config = {
    // Database configuration
    database: {
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'your_database_name',
        connectionLimit: 10
    },
    apiUrl: 'https://api.example.com',
    apiKey: 'your-api-key',
    timeout: 5000,
};

// Function to get database connection
const mysql = require('mysql2/promise');
const pool = mysql.createPool(config.database);

// Function to execute database queries
async function query(sql, params) {
    try {
        const [rows, fields] = await pool.execute(sql, params);
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
            config.apiUrl = result[0].api_url;
            config.apiKey = result[0].api_key;
            config.timeout = result[0].timeout;
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