/**
 * This takes all the raw images in jpg format, resizes them, and saves that output as PNGs
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join("data", "raw");
const outputDir = path.join("data", "pixel-png");

const main = async () => {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".jpg") > -1);

  const promises = [];
  files.forEach((fileName) => {
    const _promise = new Promise<string>((resolve, reject) => {
      const file = fs.readFileSync(path.join(inputDir, fileName));
      sharp(file)
        .resize(64, 64, { fits: "inside", kernel: sharp.kernel.nearest })
        .png({ colors: 64, palette: true })
        .toFile(path.join(outputDir, fileName.replace("jpg", "png")))
        .then(() => {
          resolve(fileName);
          console.log(`.. ${fileName}`);
        })
        .catch((error) => reject(error));
    });

    promises.push(_promise);
  });

  Promise.all(promises).then(() => console.log("done!"));
};

main();
