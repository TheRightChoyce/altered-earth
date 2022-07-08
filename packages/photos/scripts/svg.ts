import {
  getBinarySVG_Array,
  getSVG,
  PixelBuffer,
  pngToPixels,
} from "@exquisite-graphics/js";
// node includes
import fs from "fs";
import path from "path";

const sourceDir = path.join("data", "pixel-png");
const svgDir = path.join("data", "svg");
const storageDir = path.join("data", "svg-storage");

const main = async () => {
  const sourceImage = path.join(sourceDir, "ALTERED-EARTH-02.png");

  const pixels = await pngToPixels(sourceImage);
  //console.log(pixels);
  const data = getBinarySVG_Array(pixels) as PixelBuffer;
  const editionStorageData = data.getPixelBuffer();

  // console.log(editionStorageData);

  fs.writeFileSync(
    path.join(storageDir, "ALTERED-EARTH-02.txt"),
    editionStorageData
  );

  fs.writeFileSync(
    path.join(svgDir, "ALTERED-EARTH-02.svg"),
    getSVG(editionStorageData)
  );
};

main();
