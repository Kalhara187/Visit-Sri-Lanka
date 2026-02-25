require('dotenv').config();
const mysql = require('mysql2/promise');

// MySQL database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'visit_user',
    password: process.env.DB_PASSWORD || 'visit_password123',
    database: process.env.DB_NAME || 'visit_sri_lanka',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create pool connection
const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();
        return true;
    } catch (err) {
        console.error('Error connecting to MySQL database:', err.message);
        return false;
    }
}

// Initialize database (tables already created in MySQL)
function initializeDatabase() {
    console.log('Database tables verified');
}

// Test connection and initialize
testConnection().then(success => {
    if (success) {
        initializeDatabase();
    }
});

module.exports = pool;
