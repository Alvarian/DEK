const fs = require('fs');
const path = require('path');
const db = require('../db/config');

const runSeeds = () => {
    const seedPath = path.join(__dirname, '../db/seeds/seeds.sql');
    const sql = fs.readFileSync(seedPath, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error('Seeding Error:', err.message);
        } else {
            console.log('Database seeded successfully.');
        }
    });
};

runSeeds();
