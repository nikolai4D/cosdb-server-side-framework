const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { apiCallPost, apiCallGet, apiCallDelete } = require("./helpers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
require("dotenv").config();

router.get("/auth/:viewPath", async (req, res) => {
  const { viewPath } = req.params;
  try {
    const views = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, `/../../../model/model_views.json`),
        "utf-8"
      )
    );
    const view = views.find((view) => view.value === viewPath);
    if (view) {
      console.log("protected :" + view.protected); // AUTH FOR PROTECTED ROUTES WILL BE IMPLEMENTED HERE
      res.send(view);
    } else {
      const view404 = views.find((view) => view.value === "404");
      console.log(viewPath + " not found");
      res.send({ value: view404.value, id: view404.id }); // path = "" to redirect to 404 page
    }
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    res.sendStatus(500);
  }
});

router.get("/read/:key/:parentId", async (req, res) => {
  const { key, parentId } = req.params;
  try {
    const datas = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, `/../../../model/model_${key}.json`),
        "utf-8"
      )
    );
    const data = datas.filter((d) => d.parentId === parentId);
    if (data.length > 0) {
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    res.sendStatus(500);
  }
});

router.get("/read/:key", (req, res) => {
  const { key } = req.params;
  fs.readFile(
    path.join(__dirname, `/../../../model/model_${key}.json`),
    "utf-8",
    (error, data) => {
      if (error) {
        console.error("An error occurred while reading the file:", error);
        res.sendStatus(500);
      } else {
        res.json(JSON.parse(data));
      }
    }
  );
});

router.get("/read", (req, res) => {
  fs.readFile(
    path.join(__dirname, "/../../../model/model.json"),
    "utf-8",
    (error, data) => {
      if (error) {
        console.error("An error occurred while reading the file:", error);
        res.sendStatus(500);
      } else {
        res.json(JSON.parse(data));
      }
    }
  );
});

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

router.post("/relatedNodes", async (req, res) => {
  console.log("req.body", req.body);
  const url = process.env.API_URL + "typeData/getRelatedNodes";

  let response = await apiCallPost(req.body.body, url);

  if ((await response.status) !== 200) {
    return res.status(response.status).json(response.data);
  } else {
    return res.json(response.data);
  }
});

module.exports = router;
