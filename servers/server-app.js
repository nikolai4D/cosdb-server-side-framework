const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  "/",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/app-boilerplate"
    )
  )
);

app.get("/read/:key", (req, res) => {
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

app.get("/read", (req, res) => {
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

app.use(
  "/core",
  express.static(
    path.join(__dirname, "/../../../node_modules/cosdb-client-framework/core")
  )
);

app.use(
  "/components",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/components"
    )
  )
);

app.use(
  "/data-mgmt",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/data-mgmt"
    )
  )
);

// Api
app.use("/api", require("../api/routes.js"));

app.get("*", function (req, res, next) {
  res.sendFile(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/app-boilerplate/index.html"
    )
  );
});

app.listen(3005, () => {
  console.log("server is listening on port 3005");
});

module.exports = app;
