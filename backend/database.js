require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

// SQLite database file path
const dbPath = process.env.DB_PATH || './visit-sri-lanka.db';

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Initialize database tables
function initializeDatabase() {
    // Create users table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone TEXT,
            role TEXT NOT NULL DEFAULT 'traveler',
            acceptTerms INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table verified/created');
        }
    });

    // Create feedback table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            rating INTEGER NOT NULL,
            category TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating feedback table:', err.message);
        } else {
            console.log('Feedback table verified/created');
        }
    });

    // Create contact_messages table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating contact_messages table:', err.message);
        } else {
            console.log('Contact messages table verified/created');
        }
    });

    console.log('Database tables verified');
}

// Run migrations to handle schema updates on existing databases
function runMigrations() {
    // Add created_at to users table if missing (handles old schemas)
    db.run(`ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP`, (err) => {
        if (err && !err.message.includes('duplicate column')) {
            // Column already exists or table doesn't exist yet - both OK
        }
    });
}

// Initialize on load
initializeDatabase();
runMigrations();

// Promisify db methods for async/await
const dbPromise = {
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve({ lastID: this.lastID, changes: this.changes });
            });
        });
    },
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};

module.exports = dbPromise;
