const Database = require('better-sqlite3');
const db = new Database('fitness.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    age INTEGER,
    weight REAL,
    height REAL,
    gender TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    duration INTEGER,
    intensity TEXT,
    notes TEXT,
    date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS nutrition (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    food_name TEXT,
    calories INTEGER,
    protein REAL,
    carbs REAL,
    fats REAL,
    date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    target_value REAL,
    current_value REAL DEFAULT 0,
    target_date TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;