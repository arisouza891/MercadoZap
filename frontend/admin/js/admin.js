const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

// LISTAR
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// CRIAR
router.post('/', (req, res) => {
  const { name, price, image } = req.body;

  db.run(
    'INSERT INTO products (name, price, image) VALUES (?, ?, ?)',
    [name, price, image],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// ATUALIZAR
router.put('/:id', (req, res) => {
  const { name, price } = req.body;

  db.run(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [name, price, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

// DELETAR
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM products WHERE id = ?',
    req.params.id,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

module.exports = router;
