const db = require('../db/config');

const User = {};

User.findByUserName = (username) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

User.create = (user) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO users (username, email, password_digest, firstname, lastname) 
            VALUES (?, ?, ?, ?, ?)`,
            [user.username, user.email, user.password_digest, user.firstname, user.lastname],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...user });
            }
        );
    });
};

module.exports = User;
