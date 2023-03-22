const express = require('express');
const router = express.Router();
const helpers = require("./helpers.js");
require("dotenv").config();
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post('/getListData', async (req, res) => {

  console.log(req.body)
  // const parentId = process.env[req.body.myBody];

  // let response = await apiCallGet(``);

  // if ((await response.status) !== 200) {
  //     return res.status(response.status).json(response.data);
  // } else {
  //     return res.json(response.data);
  // }
  res.json('Hello World!');
});

module.exports = router;
