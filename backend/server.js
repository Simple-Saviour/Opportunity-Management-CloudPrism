// backend/server.js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

// Allow all origins
app.use(cors());

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle requests
});
app.use(bodyParser.json());

app.get('/opportunities', (req, res) => {
  db.all('SELECT * FROM opportunities', (err, rows) => {
    if (err) {
      // console.log("hello");
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/opportunities', (req, res) => {
  const { name, value, stage, close_date, customer_id, user_id } = req.body;
  db.run(
    `INSERT INTO opportunities (name, value, stage, close_date, customer_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, value, stage, close_date, customer_id, user_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// PUT route to update an existing opportunity
app.put('/opportunities/:id', (req, res) => {
  const { id } = req.params;
  const { name, value, stage, close_date, customer_id, user_id } = req.body;
  db.run(
    `UPDATE opportunities SET name=?, value=?, stage=?, close_date=?, customer_id=?, user_id=? WHERE id=?`,
    [name, value, stage, close_date, customer_id, user_id, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Opportunity updated successfully' });
    }
  );
});

// DELETE route to delete an opportunity
app.delete('/opportunities/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM opportunities WHERE id=?`, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Opportunity deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
