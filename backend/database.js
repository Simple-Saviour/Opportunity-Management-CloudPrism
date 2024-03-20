// backend/database.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
// console.log("hello");
db.serialize(() => {
    db.run(`CREATE TABLE opportunities (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value REAL,
        stage TEXT DEFAULT 'Prospect',
        close_date DATE,
        customer_id INTEGER,
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
