const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "database.db"));
db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS teachers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        idNumber TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacherId INTEGER NOT NULL,
        name TEXT NOT NULL,
        className TEXT NOT NULL,
        phone TEXT NOT NULL,
        FOREIGN KEY (teacherId) REFERENCES teachers(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacherId INTEGER NOT NULL,
        title TEXT NOT NULL,
        className TEXT NOT NULL,
        dueDate TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (teacherId) REFERENCES teachers(id)
    );
`);

const teacherCount = db.prepare("SELECT COUNT(*) AS count FROM teachers").get();

if (teacherCount.count === 0) {
    db.prepare(`
        INSERT INTO teachers (name, idNumber)
        VALUES (? , ?)
    `).run("רז", "123456789");
}

module.exports = db;
