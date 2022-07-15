import fs from "fs";
import path from "path";

const outputDir = path.join("data", "metadata", "testnets");
const numFiles = 2550;

for (let id = 0; id < numFiles; id++) {
  const file = `{
        "name": "Test NFT #${id}",
        "description": "An original 1 of 1 artwork documenting The Hydra and explores this Earth tree through the lens of deep textures and wonderful colors. Each photo represents a small portion of The Hydra, starting with its majestic heads and working across each intricate skin texture and tone. Each original also comes with an on-chain edition of the same photo.",
        "image": "ipfs://bafybeihinnkaqb3lfukwbzkhuz4nm3hh35cczes62d63ytcil6uk6ufas4",
        "svg": "ipfs://bafkreiclkdvx6kf4o5uvnx3tprhigzzlexn5osv4vnvh3cb4pw4d6lwxoi",
        "external_url": "https://altered-earth.xyz/the-hydra/${id}",
        "attributes": [
            {
                "trait_type": "State",
                "value": "Dream State"
            },
            {
                "trait_type": "Another",
                "value": "test"
            }
        ]
    }
    `;
  fs.writeFileSync(path.join(outputDir, `${id}`), file);
}
