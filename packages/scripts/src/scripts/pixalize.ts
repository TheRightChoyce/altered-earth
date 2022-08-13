/**
 * This takes all the raw images in jpg format, resizes them, and saves that output as PNGs
 */

import path from "path";

import { pixalize } from "../pixalize";

const main = async () => {
  await pixalize();
};

main();
