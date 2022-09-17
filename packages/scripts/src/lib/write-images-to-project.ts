// Node includes
import fs from "fs";
import path from "path";

export const writeJpgsToProject = async () => {
  // This is expected to be called from the root of the "scripts" package
  const renamedDir = path.join("data", "renamed");
  const jpgOutputDir = path.join(
    "..",
    "app",
    "public",
    "the-hydra",
    "previews"
  );

  const resized256Dir = path.join("data", "resized", "256");
  const resized256OutputDir = path.join(jpgOutputDir, "256");

  const resized1024Dir = path.join("data", "resized", "1024");
  const resized1024OutputDir = path.join(jpgOutputDir, "1024");

  fs.mkdirSync(jpgOutputDir, { recursive: true });

  const files = fs
    .readdirSync(renamedDir)
    .filter((file) => file.indexOf(".jpg") > -1);

  files.forEach((fileName) => {
    fs.copyFileSync(
      path.join(renamedDir, fileName),
      path.join(jpgOutputDir, fileName)
    );
    fs.copyFileSync(
      path.join(resized256Dir, fileName),
      path.join(resized256OutputDir, fileName)
    );
    fs.copyFileSync(
      path.join(resized1024Dir, fileName),
      path.join(resized1024OutputDir, fileName)
    );
  });
};

export const writeSvgsToProject = async () => {
  // This is expected to be called from the root of the "scripts" package
  const renamedDir = path.join("data", "svg");
  const jpgOutputDir = path.join("..", "app", "public", "the-hydra", "svgs");

  fs.mkdirSync(jpgOutputDir, { recursive: true });

  const files = fs
    .readdirSync(renamedDir)
    .filter((file) => file.indexOf(".svg") > -1);

  files.forEach((fileName) => {
    fs.copyFileSync(
      path.join(renamedDir, fileName),
      path.join(jpgOutputDir, fileName)
    );
  });
};
