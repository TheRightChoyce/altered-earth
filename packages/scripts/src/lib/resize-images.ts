/**
 * This takes all the raw images in jpg format, resizes them, and saves that output as PNGs
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.join("data", "renamed");
const outputDir = path.join("data", "resized");

const resize = async (width: number, height: number, fileName: string) => {
  return new Promise<string>((resolve, reject) => {
    sharp(fs.readFileSync(path.join(inputDir, fileName)))
      .resize(width, height)
      .jpeg({
        quality: 100,
        chromaSubsampling: "4:4:4",
      })
      .toFile(path.join(outputDir, width + "", fileName))
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
};

export const resizeAll = async (width: number, height: number) => {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".jpg") > -1);

  await Promise.all(files.map((fileName) => resize(width, height, fileName)));

  console.log(".. done!");
};
