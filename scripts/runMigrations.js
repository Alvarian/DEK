const fs = require('fs');
const path = require('path');
const db = require('../db/config');

const runMigrations = () => {
    const migrationPath = path.join(__dirname, '../db/migrations/migration_08_17_2017.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error('Migration Error:', err.message);
        } else {
            console.log('Database schema migrated successfully.');
        }
    });
};

runMigrations();
