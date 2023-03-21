const express = require('express');
const router = express.Router();
const helpers = require("./helpers.js");



router.get('/', (req, res) => {
  res.json('Hello World!');
});

router.post('/users', (req, res) => {
  // Create a new user
});

router.put('/users/:id', (req, res) => {
  // Update a user with the given ID
});

router.delete('/users/:id', (req, res) => {
  // Delete a user with the given ID
});

module.exports = router;
