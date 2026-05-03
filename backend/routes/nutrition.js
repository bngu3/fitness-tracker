const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT * FROM nutrition WHERE user_id = ? ORDER BY date DESC').all(req.user.id);
  res.json(rows);
});

router.post('/', auth, (req, res) => {
  const { food_name, calories, protein, carbs, fats } = req.body;
  const result = db.prepare('INSERT INTO nutrition (user_id, food_name, calories, protein, carbs, fats) VALUES (?,?,?,?,?,?)')
    .run(req.user.id, food_name, calories, protein, carbs, fats);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM nutrition WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

module.exports = router;