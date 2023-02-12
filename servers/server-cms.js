const express = require("express");
const fs = require("fs");
const path = require("path");
const cms = express();

cms.use(express.json());
cms.use(express.urlencoded({ extended: true }));

cms.use(express.static(path.join(__dirname, "/app/_ff/cms")));

cms.get("/read", (req, res) => {
  fs.readFile("./app/model.json", "utf-8", (error, data) => {
    if (error) {
      console.error("An error occurred while reading the file:", error);
      res.sendStatus(500);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

cms.put("/update", (req, res) => {
  const data = req.body;
  fs.writeFile("./app/model.json", JSON.stringify(data), (error) => {
    if (error) {
      res
        .status(500)
        .send({ message: "An error occurred while saving the file." });
    } else {
      res.send({ message: "The file has been successfully updated." });
    }
  });
});

cms.listen(3001, () => {
  console.log("cmsServer is listening on port 3001");
});
