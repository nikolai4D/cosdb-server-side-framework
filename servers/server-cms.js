const express = require("express");
const fs = require("fs");
const path = require("path");
const cms = express();

cms.use(express.json());
cms.use(express.urlencoded({ extended: true }));
cms.use(
  "/cms",
  express.static(
    path.join(__dirname, "/../../../node_modules/cosdb-client-framework/cms")
  )
);
cms.use(
  "/core",
  express.static(
    path.join(__dirname, "/../../../node_modules/cosdb-client-framework/core")
  )
);
cms.use(
  "/components",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/components"
    )
  )
);

cms.get("/read", (req, res) => {
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
  );
});

cms.put("/update", (req, res) => {
  const data = req.body;
  fs.writeFile(
    path.join(__dirname, "/../../../model.json"),
    JSON.stringify(data, null, 4),
    (error) => {
      if (error) {
        res
          .status(500)
          .send({ message: "An error occurred while saving the file." });
      } else {
        res.send({ message: "The file has been successfully updated." });
      }
    }
  );
});

cms.get("/componentsdir", (req, res) => {
  console.log("componentsdir called");
  const directoryPath = path.join(
    __dirname,
    "/../../../node_modules/cosdb-client-framework/components/"
  );
  try {
    const files = fs.readdirSync(directoryPath);
    console.log({files})
    res.status(200).json( files );

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});

cms.get("/components/:type", (req, res) => {
  const type = req.params.type;
  console.log(`components of type ${type} called`);
  const directoryPath = path.join(
    __dirname,
    `/../../../node_modules/cosdb-client-framework/components/${type}`
  );
  try {
    const files = fs.readdirSync(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach(file => {
        const fileName = path.parse(file).name;
        console.log(fileName);
      })
    });

    res.status(200).json( files );

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});

cms.listen(3001, () => {
  console.log("cmsServer is listening on port 3001");
});
