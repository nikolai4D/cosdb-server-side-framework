const fs = require("fs");
const path = require("path");

async function readModelFromParentId(key, parentId) {
  const model = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `/../../../../model/model_${key}.json`),
      "utf-8"
    )
  );
  const comp = model.filter((c) => c.parentId === parentId);
  return comp;
}

module.exports = readModelFromParentId;
