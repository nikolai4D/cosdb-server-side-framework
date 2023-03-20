const fs = require("fs");
const execSync = require("child_process").execSync;

const backupFile = "./package.json.backup";

function backupPackageJson() {
  fs.copyFileSync("./package.json", backupFile);
}

function restorePackageJson() {
  fs.copyFileSync(backupFile, "./package.json");
  fs.unlinkSync(backupFile);
}

function updateDependencies() {
  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim();

  const packageJson = require("./package.json");

  packageJson.dependencies[
    "cosdb-client-framework"
  ] = `github:nikolai4D/cosdb-client-side-framework#${currentBranch}`;
  packageJson.dependencies[
    "cosdb-server-framework"
  ] = `github:nikolai4D/cosdb-server-side-framework#${currentBranch}`;

  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 4));
}

backupPackageJson();
updateDependencies();

try {
  execSync("npm update", { stdio: "inherit" });
} finally {
  restorePackageJson();
}
