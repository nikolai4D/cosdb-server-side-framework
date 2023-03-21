const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const helpers = require("./helpers.js");

//Bodyparser
router.use(bodyParser.json());

//APIs
router.post("/test", async (req, res) => {
  return res.send({"hello": "hello"})
});