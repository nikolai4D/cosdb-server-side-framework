const fs = require("fs");
const path = require("path");

async function writeFilesPerKey(data) {
  const baseDir = path.join(__dirname, "/../../../");

  for (const key of Object.keys(data)) {
    const fileName = `model_${key}.json`;
    const filePath = path.join(baseDir, fileName);

    await fs.promises.writeFile(filePath, JSON.stringify(data[key], null, 4));
  }
}

module.exports = writeFilesPerKey;
