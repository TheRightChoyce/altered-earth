import {
  getBinarySVG_Array,
  getSVG,
  PixelBuffer,
  pngToPixels,
} from "@exquisite-graphics/js";
// node includes
import fs from "fs";
import path from "path";

const inputDir = path.join("data", "pixel-png");
const svgDir = path.join("data", "svg");
const storageDir = path.join("data", "svg-storage");

const main = async () => {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".png") > -1);

  files.forEach((fileName) => {
    new Promise<string>((resolve, reject) => {
      pngToPixels(path.resolve(inputDir, fileName)).then((pixels) => {
        const data = getBinarySVG_Array(pixels) as PixelBuffer;
        const svgStorageData = data.getPixelBuffer();

        fs.writeFileSync(
          path.join(storageDir, fileName.replace("png", "txt")),
          svgStorageData
        );

        const svgName = path.join(svgDir, fileName.replace("png", "svg"));
        fs.writeFileSync(svgName, getSVG(svgStorageData));
        resolve(svgName);
      });
    });
  });
};

main();
