const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Missing error handling for missing or invalid user data
  db.createUser(user) // Assuming a database interaction
    .then(() => res.status(201).send())
    .catch(err => {
      console.error(err); // Log the error, but don't handle it gracefully
      res.status(500).send(); // Generic error response
    });
});