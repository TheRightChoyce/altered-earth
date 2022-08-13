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
const storageDir = path.join("data", "xqstgfx");

const main = async () => {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => file.indexOf(".png") > -1);

  files.forEach((fileName) => {
    new Promise<boolean>((resolve, reject) => {
      pngToPixels(path.resolve(inputDir, fileName)).then((pixels) => {
        const data = getBinarySVG_Array(pixels) as PixelBuffer;
        const svgStorageData = data.getPixelBuffer();

        let outputFileName = fileName
          .replace("png", "txt")
          .replace("ALTERED-EARTH-", "");

        // filenames were 1-based when exporting from Lightroom!
        outputFileName = `${(parseInt(outputFileName) - 1).toString()}.txt`;

        // Write the xqstgfx file
        fs.writeFileSync(
          path.join(storageDir, `${parseInt(outputFileName).toString()}.txt`),
          svgStorageData
        );

        fs.writeFileSync(
          path.join(svgDir, `${parseInt(outputFileName).toString()}.svg`),
          getSVG(svgStorageData)
        );
        resolve(true);
      });
    });
  });
};

main();
