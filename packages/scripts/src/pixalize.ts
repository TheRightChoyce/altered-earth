/**
 * This takes all the raw images in jpg format, resizes them, and saves that output as PNGs
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join("data", "renamed");
const outputDir = path.join("data", "pixel-png");

export const pixalize = async () => {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".jpg") > -1);

  await Promise.all(
    files.map((fileName) => {
      const _promise = new Promise<string>((resolve, reject) => {
        const file = fs.readFileSync(path.join(inputDir, fileName));
        sharp(file)
          .resize(64, 64, { fits: "inside", kernel: sharp.kernel.nearest })
          .png({ colors: 256, palette: true, quality: 75 })
          .toFile(path.join(outputDir, fileName.replace("jpg", "png")))
          .then(() => {
            resolve(fileName);
            console.log(`.. ${fileName}`);
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch((error: any) => {
            console.log(`.. ${error}`);
            reject(error);
          });
      });

      return _promise;
    })
  );

  console.log(".. done!");
};
