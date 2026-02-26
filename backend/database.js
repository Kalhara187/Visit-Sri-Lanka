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

// Initialize database (create tables if they don't exist)
async function initializeDatabase() {
    try {
        // Create feedback table if it doesn't exist
        const createFeedbackTable = `
            CREATE TABLE IF NOT EXISTS feedback (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                rating INT NOT NULL,
                category VARCHAR(50),
                subject VARCHAR(50),
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;
        
        await pool.query(createFeedbackTable);
        console.log('Feedback table verified/created');
        console.log('Database tables verified');
    } catch (err) {
        console.error('Error initializing database:', err.message);
    }
}

// Test connection and initialize
testConnection().then(success => {
    if (success) {
        initializeDatabase();
    }
});

module.exports = pool;
