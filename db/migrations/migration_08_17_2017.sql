
-- psql -d project_3_db 
-- SELECT * FROM deck;


DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS users;




CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    firstname VARCHAR,
    lastname VARCHAR
);


CREATE TABLE deck(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT,
    correct BOOLEAN NOT NULL,
    setTime VARCHAR NOT NULL,
    timesRight INT NOT NULL,
    timesWrong INT NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    deckNumber INT NOT NULL
);


