const express = require("express");
const router = express.Router();
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
require("dotenv").config();

router.post("/getListData", async (req, res) => {
  const url = req.body.body;

  let response = await apiCallGet(url);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

router.get("/:key/:parentId", async (req, res) => {
  const { key, parentId } = req.params;
  console.log("key: ", key, "parentId: ", parentId);
  if (key !== "type" && key !== "instance" && key !== "object") {
    return res.status(400).json({ error: "Invalid key" });
  }

  const url = process.env.API_URL + key + "?parentId=" + parentId;

  console.log("url: ", url);

  let response = await apiCallGet(url);

  console.log(response);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

module.exports = router;
