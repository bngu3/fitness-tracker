const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

router.get('/', auth, (req, res) => {
  const rows = db.prepare('SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json(rows);
});

router.post('/', auth, (req, res) => {
  const { type, target_value, target_date } = req.body;
  const result = db.prepare('INSERT INTO goals (user_id, type, target_value, target_date) VALUES (?,?,?,?)')
    .run(req.user.id, type, target_value, target_date);
  res.json({ id: result.lastInsertRowid });
});

router.put('/:id', auth, (req, res) => {
  const { current_value } = req.body;
  db.prepare('UPDATE goals SET current_value = ? WHERE id = ? AND user_id = ?')
    .run(current_value, req.params.id, req.user.id);
  res.json({ success: true });
});

router.delete('/:id', auth, (req, res) => {
  db.prepare('DELETE FROM goals WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

module.exports = router;