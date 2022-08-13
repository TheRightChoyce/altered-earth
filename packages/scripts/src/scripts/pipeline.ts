// for each raw file in the data folder:
// update its name i.e ALTERED-EARTH-01.jpg => 01.jpg
// Create the pixel png version
// convert pixel version into XSQTGFX format
// save output
// copy XSQTGFX to contract package
// copy images and svgs to app package

/**
 * This takes all the raw images in jpg format, resizes them, and saves that output as PNGs
 */

import fs, { promises as fsp } from "fs";
import path from "path";

import { pixalize } from "../pixalize";
import { makeSVGFromPixelPNG } from "../svg";
import {
  writeJpgsToProject,
  writeSvgsToProject,
} from "../write-images-to-project";
import { writeXQSTGFXFilesToProject } from "../write-xsqtgfx-to-project";

const rawJpgDir = path.join("data", "raw");
const renamedJpgDir = path.join("data", "renamed");

const renamePhoto = async (fileName): Promise<void> => {
  const fileIndex = parseInt(
    fileName.replace("ALTERED-EARTH-", "").replace(".jpg", "")
  );
  const newFileIndex = fileIndex - 1;
  const newFileName = `${
    newFileIndex < 10 ? `0${newFileIndex}` : newFileIndex
  }.jpg`;

  console.log(newFileName);

  return fsp.rename(
    path.join(rawJpgDir, fileName),
    path.join(renamedJpgDir, newFileName)
  );
};

const renamePhotos = async () => {
  const files = fs
    .readdirSync(rawJpgDir)
    .filter((file) => file.indexOf(".jpg") > -1);

  await Promise.all(
    files.map((fileName) => {
      return renamePhoto(fileName);
    })
  );

  console.log("finished!");
};

const main = async () => {
  console.log("Renaming raw photos...");
  await renamePhotos();

  console.log("Pixalizing jpgs to pngs...");
  await pixalize();

  console.log("Converting pngs to svgs...");
  await makeSVGFromPixelPNG();

  console.log("Writing XSQTGFX to contracts package...");
  writeXQSTGFXFilesToProject();

  console.log("Writing jpgs and svgs to app...");
  writeJpgsToProject();
  writeSvgsToProject();
};

main();
