const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  if (!user || !user.username || !user.email) {
    return res.status(400).send({ error: 'Missing username or email' });
  }
  db.createUser(user)
    .then(() => res.status(201).send())
    .catch(err => {
      console.error('Database error:', err);
      if (err.code === '23505') { //Example duplicate key error code
        return res.status(409).send({ error: 'User already exists' });
      }
      res.status(500).send({ error: 'Failed to create user' });
    });
});