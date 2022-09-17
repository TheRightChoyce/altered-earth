import {
  getBinarySVG_Array,
  getSVG,
  PixelBuffer,
  pngToPixels,
} from "@exquisite-graphics/js";
// node includes
import fs from "fs";
import path from "path";

const pixelPngDir = path.join("data", "pixel-png");
const svgDir = path.join("data", "svg");
const storageDir = path.join("data", "xqstgfx");

export const makeSVGFromPixelPNG = async () => {
  const files = fs
    .readdirSync(pixelPngDir)
    .filter((file) => file.indexOf(".png") > -1);

  await Promise.all(
    files.map((fileName) => {
      new Promise<boolean>((resolve) => {
        pngToPixels(path.resolve(pixelPngDir, fileName)).then((pixels) => {
          const data = getBinarySVG_Array(pixels) as PixelBuffer;
          const svgStorageData = data.getPixelBuffer();

          const outputFileName = fileName.replace(".png", "");

          // Write the xqstgfx file
          fs.writeFileSync(
            path.join(storageDir, `${outputFileName}.txt`),
            svgStorageData
          );

          // Write the raw SVG file for reference
          fs.writeFileSync(
            path.join(svgDir, `${outputFileName}.svg`),
            getSVG(svgStorageData)
          );
          resolve(true);
        });
      });
    })
  );

  console.log(".. done!");
};
