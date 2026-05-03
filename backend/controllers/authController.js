const db = require('../config/db');
const jwt = require('jsonwebtoken');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(name, email, password);
    res.json({ token: genToken(result.lastInsertRowid) });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  res.json({ token: genToken(user.id), user });
};

exports.getProfile = (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
};

exports.updateProfile = (req, res) => {
  const { name, age, weight, height, gender } = req.body;
  db.prepare('UPDATE users SET name=?, age=?, weight=?, height=?, gender=? WHERE id=?')
    .run(name, age, weight, height, gender, req.user.id);
  res.json({ success: true });
};