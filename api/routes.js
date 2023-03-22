const express = require('express');
const router = express.Router();
const helpers = require("./helpers.js");
require("dotenv").config();
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");


router.get('/getListData', async (req, res) => {

  console.log(req.body, "BODYYY")
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
