const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC').all(req.user.id);
  res.json(rows);
});

router.post('/', auth, (req, res) => {
  const { type, duration, intensity, notes } = req.body;
  const result = db.prepare('INSERT INTO workouts (user_id, type, duration, intensity, notes) VALUES (?,?,?,?,?)')
    .run(req.user.id, type, duration, intensity, notes);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM workouts WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

module.exports = router;