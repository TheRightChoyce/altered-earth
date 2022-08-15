// Node includes
import { parse } from "csv-parse";
import fs from "fs";
import path from "path";

const metadataPath = path.join("data", "metadata", "metadata.csv");
const outputDir = path.join("data", "metadata", "mainnet");
const limit = null;
const verbose = false;

const main = async () => {
  // load CSV metadata
  const parser = parse({ delimiter: "," });
  fs.createReadStream(metadataPath).pipe(parser);

  let headerRow: Array<string> = [];
  const output: Array<object> = [];
  let firstTraitIndex = 0;
  let lastTraitIndex = 0;
  let rowCounter = 0;

  const parseHeaders = (row) => {
    row.forEach((col, index) => {
      if (col === "trait" || col.includes("trait_type")) {
        firstTraitIndex = firstTraitIndex || index;
        lastTraitIndex = index;
      }
    });
  };

  const mapRowTraitsToAttributes = (row) => {
    const attributes: Array<object> = [];
    for (let i = firstTraitIndex; i <= lastTraitIndex; i += 2) {
      attributes.push({
        trait_type: row[i],
        value: row[i + 1],
      });
    }

    return attributes;
  };

  for await (const row of parser) {
    // Row is an array of columns.. i.e.
    // ['0', 'NFT #0', 'Description', etc..]

    if (limit && limit > 0 && rowCounter > limit) {
      return;
    }

    if (verbose) {
      console.log(row);
    }

    // If header:
    // Parse and set various header elements, then goto the next interation
    if (headerRow.length === 0) {
      parseHeaders(row);
      headerRow = row;
      continue;
    }

    // If not a header:
    // aggregate this row and generate metadata json

    output.push({
      token_id: row[headerRow.indexOf("token")],
      name: row[headerRow.indexOf("name")],
      description: row[headerRow.indexOf("description")],
      image: row[headerRow.indexOf("image")],
      svg: row[headerRow.indexOf("svg image")],
      external_url: row[headerRow.indexOf("external url")],
      attributes: mapRowTraitsToAttributes(row),
    });

    try {
      fs.writeFileSync(
        path.join(outputDir, `${row[headerRow.indexOf("token")]}`),
        JSON.stringify(output[output.length - 1])
      );
    } catch (err) {
      console.log(err);
    }

    rowCounter++;
  }

  // Write out everything into a single json file
  fs.writeFileSync(
    path.join(outputDir, "metadata.json"),
    JSON.stringify(output)
  );
};

main();
