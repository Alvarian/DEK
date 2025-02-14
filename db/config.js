const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const databaseFile = path.join(__dirname, 'database.sqlite'); // SQLite file location

const db = new sqlite3.Database(databaseFile, (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database:', databaseFile);
  }
});

// Log all queries (similar to pg-promise options)
db.on('trace', (query) => {
  console.log('Executing query:', query);
});

// Export the database object
module.exports = db;