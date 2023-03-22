const express = require('express');
const router = express.Router();
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
require("dotenv").config();

router.post('/getListData', async (req, res) => {

  const url =req.body.url

  console.log(req.body)

  let response = await apiCallGet(url);

  if ((await response.status) !== 200) {
      return res.status(response.status).json(response.data);
  } else {
      return res.json(response.data);
  }

});

module.exports = router;
