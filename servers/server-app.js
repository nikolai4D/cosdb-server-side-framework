const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/app")));

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
