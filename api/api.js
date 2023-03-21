const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const helpers = require("./helpers.js");

// Bodyparser
// api.use(bodyParser.json());
router.use(
    bodyParser.json({
      limit: "50mb",
    })
  );
  
router.use(
bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 1000000,
    extended: true,
}))


//Bodyparser
router.use(bodyParser.json());

//APIs
router.get("/test", async (req, res) => {
  return res.send({"hello": "hello"})
});