// Node includes
import fs from "fs";
import path from "path";

// This is expected to be called from the root of the "scripts" package
const inputDir = path.join("data", "xqstgfx");
const ouputDir = path.join("..", "contracts", "data", "xqstgfx");

export const writeXQSTGFXFilesToProject = async () => {
  fs.mkdirSync(ouputDir, { recursive: true });

  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".txt") > -1);

  files.forEach((fileName) => {
    fs.copyFileSync(
      path.join(inputDir, fileName),
      path.join(ouputDir, fileName)
    );
  });
};
