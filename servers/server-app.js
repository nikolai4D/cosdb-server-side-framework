const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(
  "/",
  express.static(
    path.join(__dirname, "/../../../node_modules/cosdb-client-framework/app-boilerplate")
  )
);

app.get("/read", (req, res) => {
  fs.readFile(
    path.join(__dirname, "/../../../model.json"),
    "utf-8",
    (error, data) => {
      if (error) {
        console.error("An error occurred while reading the file:", error);
        res.sendStatus(500);
      } else {
        res.json(JSON.parse(data));
      }
    }
  )
);



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



// app.get('*', function(req, res, next) {
//     res.sendFile("index.html", { root: 'dist' });
// })

// path.join(__dirname, "/../../../node_modules/cosdb-client-framework/app-boilerplate/

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

module.exports = app;
