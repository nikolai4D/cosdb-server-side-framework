const express = require('express');
const router = express.Router();
const helpers = require("./helpers.js");


router.get('/', (req, res) => {
  res.json('Hello World!');
});

module.exports = router;
