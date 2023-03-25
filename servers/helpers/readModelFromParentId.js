const fs = require("fs");
const path = require("path");

async function readModelFromParentId(key, parentId) {
  console.log("key", key, "parentId", parentId);
  const model = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, `/../../../../model/model_${key}.json`),
      "utf-8"
    )
  );
  console.log("model", model);
  const comp = model.filter((c) => c.parentId === parentId);
  console.log("comp", comp);
  return comp;
}

module.exports = readModelFromParentId;
