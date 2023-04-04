const express = require("express");
const fs = require("fs");
const path = require("path");
const cms = express();
const { v4: uuidv4 } = require("uuid");

cms.use(express.json());
cms.use(express.urlencoded({ extended: true }));

cms.use(
  "/",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/app-boilerplate"
    )
  )
);

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
  "/data-mgmt",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/data-mgmt"
    )
  )
);




cms.get("/getuuid", async (req, res) => {
  const newUuid = JSON.stringify(uuidv4());
  res.send(newUuid);
});

cms.get("/read", (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "/../../../model.json"),
      "utf-8"
    );
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("An error occurred while reading the file:", error);
    res.sendStatus(500);
  }
});

cms.put("/update", async (req, res) => {
  try {
    const data = req.body;
    await fs.promises.writeFile(
      path.join(__dirname, "/../../../model.json"),
      JSON.stringify(data, null, 4)
    );
    res.send({ data, message: "The file has been successfully updated." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while saving the file." });
  }
});

cms.get("/componentsdir", (req, res) => {
  const directoryPath = path.join(
    __dirname,
    "/../../../node_modules/cosdb-client-framework/components/"
  );
  try {
    const files = fs.readdirSync(directoryPath);
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reading directory" });
  }
});

cms.get("/componentsdir/:type", (req, res) => {
  const type = req.params.type;
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
