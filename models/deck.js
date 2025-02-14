const db = require('../db/config');

const Deck = {};

Deck.findAll = (user_id) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM deck WHERE user_id = ?`, [user_id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

Deck.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM deck WHERE id = ?`, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

Deck.create = (deck) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO deck (user_id, question, answer, correct, setTime, timesRight, timesWrong, deckNumber) 
            VALUES (?, ?, ?, FALSE, '', 0, 0, ?)`,
            [deck.user_id, deck.question, deck.answer, deck.deckNumber],
            function (err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...deck });
            }
        );
    });
};

Deck.update = (deck, id) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE deck SET user_id = ?, question = ?, answer = ?, correct = ?, setTime = ?, 
            timesRight = ?, timesWrong = ?, deckNumber = ? WHERE id = ?`,
            [
                deck.user_id, deck.question, deck.answer, deck.correct, deck.setTime,
                deck.timesRight, deck.timesWrong, deck.deckNumber, id
            ],
            function (err) {
                if (err) reject(err);
                else resolve({ id, ...deck });
            }
        );
    });
};

Deck.findByTime = (user_id, moment) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM deck WHERE user_id = ? AND (setTime < ? OR correct = FALSE)`,
            [user_id, moment],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

Deck.delete = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM deck WHERE id = ?`, [id], function (err) {
            if (err) reject(err);
            else resolve({ message: 'Deleted successfully', id });
        });
    });
};

module.exports = Deck;
