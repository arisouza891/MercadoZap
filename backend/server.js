const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products');

const app = express(); // ✅ app vem ANTES de usar

// ======================
// MIDDLEWARES
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ARQUIVOS ESTÁTICOS
// ======================
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../frontend/admin')));

// ======================
// ROTAS DA API
// ======================
app.use('/products', productRoutes);

// ======================
// BANCO DE DADOS
// ======================
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT
    )
  `);

  db.get('SELECT COUNT(*) AS total FROM products', (err, row) => {
    if (!err && row.total === 0) {
      db.run(`
        INSERT INTO products (name, price, image)
        VALUES 
        ('Arroz 5kg', 25.00, 'https://via.placeholder.com/150'),
        ('Feijão 1kg', 8.00, 'https://via.placeholder.com/150'),
        ('Açúcar 1kg', 5.50, 'https://via.placeholder.com/150')
      `);
    }
  });
});

// ======================
// SERVIDOR
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
