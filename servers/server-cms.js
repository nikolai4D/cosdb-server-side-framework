const express = require("express");
const fs = require("fs");
const path = require("path");
const cms = express();
const { v4: uuidv4 } = require("uuid");
const { promisify } = require('util');
const Semaphore  = require('./helpers/Semaphore.js');


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

cms.use(
  "/components",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/data-mgmt"
    )
  )
);

cms.get("/getuuid", async(req, res) => {
  const newUuid = JSON.stringify(uuidv4());
  res.send(newUuid);
});

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



cms.put("/update", async (req, res) => {
  const data = req.body;
  const fileSemaphore = new Semaphore();
  const filePath = path.join(__dirname, "/../../../model.json");
  const dataJSON = JSON.stringify(data, null, 4)
  const writeFile = promisify(fs.writeFile);


  async function writeToFile(filePath, data) {
    await fileSemaphore.acquire();
    try {
      await writeFile(filePath, data);
      console.log("writing to file")
    } finally {
      fileSemaphore.release();
      console.log("Releasing fileSemaphore")

    }
  }

  try {
    await writeToFile(filePath, dataJSON)
    res.send({ message: "The file has been successfully updated." });
  }
  catch (error) {
    res
    .status(500)
    .send({ message: "An error occurred while saving the file." });
    }

})



cms.get("/componentsdir", (req, res) => {
  console.log("componentsdir called");
  const directoryPath = path.join(
    __dirname,
    "/../../../node_modules/cosdb-client-framework/components/"
  );
  try {
    const files = fs.readdirSync(directoryPath);
    console.log({ files });
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});

cms.get("/componentsdir/:type", (req, res) => {
  const type = req.params.type;
  console.log(`components of type ${type} called`);
  const directoryPath = path.join(
    __dirname,
    `/../../../node_modules/cosdb-client-framework/components/${type}`
  );
  try {
    const fileNames = fs.readdirSync(directoryPath).map((file) => {
      return { file, name: file.split(".")[0] };
    });

    res.status(200).json(fileNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});

cms.get("/functions", (req, res) => {

  console.log(`functions directory called`);
  const directoryPath = path.join(
    __dirname,
    `/../../../node_modules/cosdb-client-framework/data-mgmt/actions`
  );
  try {
    const fileNames = fs.readdirSync(directoryPath).map((file) => {
      return { file, name: file.split(".")[0] };
    });

    res.status(200).json(fileNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});


cms.listen(3001, () => {
  console.log("cmsServer is listening on port 3001");
});
