import fs from "fs";
import path from "path";

import { Photo } from "../components/Photo";
import { PhotoCollection } from "../components/PhotoCollection";

const collection = new PhotoCollection(
  0,
  "the HydrA",
  "The Hydra exists where the river meets the woods.... The journey is forever changing and The Hydra is always the destination.",
  "The Hydra Collection explores this Earth tree through the lens of deep textures and wonderful colors. Each photo represents a small portion of The Hydra starting with its majestic heads and working across each intricate skin texture and tone."
);

const metadata = [
  {
    token_id: "0",
    name: "The Hydra",
    description: "Dream. This is The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/0.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/0.svg",
    external_url: "https://altered-earth.xyz/the-hydra/0",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Crown" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "1",
    name: "The Hydra #1",
    description:
      "Can you hear it? The majestic trunks give The Hydra her voice.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/1.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/1.svg",
    external_url: "https://altered-earth.xyz/the-hydra/1",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Throat" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "2",
    name: "The Hydra #2",
    description:
      "Can you hear it? The majestic trunks give The Hydra her voice.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/2.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/2.svg",
    external_url: "https://altered-earth.xyz/the-hydra/2",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Throat" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "3",
    name: "The Hydra #3",
    description:
      "Can you hear it? The majestic trunks give The Hydra her voice.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/3.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/3.svg",
    external_url: "https://altered-earth.xyz/the-hydra/3",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Throat" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "4",
    name: "The Hydra #4",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/4.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/4.svg",
    external_url: "https://altered-earth.xyz/the-hydra/4",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "5",
    name: "The Hydra #5",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/5.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/5.svg",
    external_url: "https://altered-earth.xyz/the-hydra/5",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "6",
    name: "The Hydra #6",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/6.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/6.svg",
    external_url: "https://altered-earth.xyz/the-hydra/6",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "7",
    name: "The Hydra #7",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/7.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/7.svg",
    external_url: "https://altered-earth.xyz/the-hydra/7",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "8",
    name: "The Hydra #8",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/8.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/8.svg",
    external_url: "https://altered-earth.xyz/the-hydra/8",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "9",
    name: "The Hydra #9",
    description: "Lifeblood. Serpent energy courses through The Hydra.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/9.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/9.svg",
    external_url: "https://altered-earth.xyz/the-hydra/9",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Sacral" },
      { trait_type: "Season", value: "Fall" },
    ],
  },
  {
    token_id: "10",
    name: "The Hydra #10",
    description:
      "Open your heart. The Hydra's energy radiates through the whole forest.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/10.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/10.svg",
    external_url: "https://altered-earth.xyz/the-hydra/10",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Heart" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "11",
    name: "The Hydra #11",
    description:
      "Open your heart. The Hydra's energy radiates through the whole forest.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/11.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/11.svg",
    external_url: "https://altered-earth.xyz/the-hydra/11",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Heart" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "12",
    name: "The Hydra #12",
    description:
      "Open your heart. The Hydra's energy radiates through the whole forest.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/12.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/12.svg",
    external_url: "https://altered-earth.xyz/the-hydra/12",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Heart" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "13",
    name: "The Hydra #13",
    description:
      "Open your heart. The Hydra's energy radiates through the whole forest.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/13.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/13.svg",
    external_url: "https://altered-earth.xyz/the-hydra/13",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Heart" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "14",
    name: "The Hydra #14",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/14.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/14.svg",
    external_url: "https://altered-earth.xyz/the-hydra/14",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "15",
    name: "The Hydra #15",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/15.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/15.svg",
    external_url: "https://altered-earth.xyz/the-hydra/15",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "16",
    name: "The Hydra #16",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/16.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/16.svg",
    external_url: "https://altered-earth.xyz/the-hydra/16",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "17",
    name: "The Hydra #17",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/17.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/17.svg",
    external_url: "https://altered-earth.xyz/the-hydra/17",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "18",
    name: "The Hydra #18",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/18.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/18.svg",
    external_url: "https://altered-earth.xyz/the-hydra/18",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "19",
    name: "The Hydra #19",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/19.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/19.svg",
    external_url: "https://altered-earth.xyz/the-hydra/19",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "20",
    name: "The Hydra #20",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/20.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/20.svg",
    external_url: "https://altered-earth.xyz/the-hydra/20",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "21",
    name: "The Hydra #21",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/21.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/21.svg",
    external_url: "https://altered-earth.xyz/the-hydra/21",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Fall" },
    ],
  },
  {
    token_id: "22",
    name: "The Hydra #22",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/22.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/22.svg",
    external_url: "https://altered-earth.xyz/the-hydra/22",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "23",
    name: "The Hydra #23",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/23.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/23.svg",
    external_url: "https://altered-earth.xyz/the-hydra/23",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "24",
    name: "The Hydra #24",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/24.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/24.svg",
    external_url: "https://altered-earth.xyz/the-hydra/24",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Fall" },
    ],
  },
  {
    token_id: "25",
    name: "The Hydra #25",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/25.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/25.svg",
    external_url: "https://altered-earth.xyz/the-hydra/25",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "26",
    name: "The Hydra #26",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/26.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/26.svg",
    external_url: "https://altered-earth.xyz/the-hydra/26",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "27",
    name: "The Hydra #27",
    description:
      "Trust and exhale. The Hydra's roots allow dreams the freedom to fly.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/27.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/27.svg",
    external_url: "https://altered-earth.xyz/the-hydra/27",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Root" },
      { trait_type: "Season", value: "Winter" },
    ],
  },
  {
    token_id: "28",
    name: "The Hydra #28",
    description:
      "Trust and exhale. The Hydra's roots allow dreams the freedom to fly.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/28.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/28.svg",
    external_url: "https://altered-earth.xyz/the-hydra/28",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Root" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "29",
    name: "The Hydra #29",
    description:
      "Trust and exhale. The Hydra's roots allow dreams the freedom to fly.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/29.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/29.svg",
    external_url: "https://altered-earth.xyz/the-hydra/29",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Root" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "30",
    name: "The Hydra #30",
    description:
      "Trust and exhale. The Hydra's roots allow dreams the freedom to fly.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/30.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/30.svg",
    external_url: "https://altered-earth.xyz/the-hydra/30",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Root" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "31",
    name: "The Hydra #31",
    description: "Dream deeper. The Hydra's eyes observe all realities.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/31.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/31.svg",
    external_url: "https://altered-earth.xyz/the-hydra/31",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Third Eye" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "32",
    name: "The Hydra #32",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/32.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/32.svg",
    external_url: "https://altered-earth.xyz/the-hydra/32",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Fall" },
    ],
  },
  {
    token_id: "33",
    name: "The Hydra #33",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/33.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/33.svg",
    external_url: "https://altered-earth.xyz/the-hydra/33",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "34",
    name: "The Hydra #34",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/34.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/34.svg",
    external_url: "https://altered-earth.xyz/the-hydra/34",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "35",
    name: "The Hydra #35",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/35.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/35.svg",
    external_url: "https://altered-earth.xyz/the-hydra/35",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "36",
    name: "The Hydra #36",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/36.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/36.svg",
    external_url: "https://altered-earth.xyz/the-hydra/36",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "37",
    name: "The Hydra #37",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/37.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/37.svg",
    external_url: "https://altered-earth.xyz/the-hydra/37",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "38",
    name: "The Hydra #38",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/38.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/38.svg",
    external_url: "https://altered-earth.xyz/the-hydra/38",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "39",
    name: "The Hydra #39",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/39.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/39.svg",
    external_url: "https://altered-earth.xyz/the-hydra/39",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "40",
    name: "The Hydra #40",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/40.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/40.svg",
    external_url: "https://altered-earth.xyz/the-hydra/40",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "41",
    name: "The Hydra #41",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/41.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/41.svg",
    external_url: "https://altered-earth.xyz/the-hydra/41",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "42",
    name: "The Hydra #42",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/42.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/42.svg",
    external_url: "https://altered-earth.xyz/the-hydra/42",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "43",
    name: "The Hydra #43",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/43.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/43.svg",
    external_url: "https://altered-earth.xyz/the-hydra/43",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "44",
    name: "The Hydra #44",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/44.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/44.svg",
    external_url: "https://altered-earth.xyz/the-hydra/44",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "45",
    name: "The Hydra #45",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/45.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/45.svg",
    external_url: "https://altered-earth.xyz/the-hydra/45",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "46",
    name: "The Hydra #46",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/46.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/46.svg",
    external_url: "https://altered-earth.xyz/the-hydra/46",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "47",
    name: "The Hydra #47",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/47.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/47.svg",
    external_url: "https://altered-earth.xyz/the-hydra/47",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Spring" },
    ],
  },
  {
    token_id: "48",
    name: "The Hydra #48",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/48.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/48.svg",
    external_url: "https://altered-earth.xyz/the-hydra/48",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
  {
    token_id: "49",
    name: "The Hydra #49",
    description:
      "Look closer. The Hydra's whole self is perfect intricate imperfections.",
    image:
      "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/49.jpg",
    svg: "ipfs://bafybeibnc7zistr7p5gyjjp764ci2iexbft5gfjpoy7a56nhhy45dmbziy/49.svg",
    external_url: "https://altered-earth.xyz/the-hydra/49",
    attributes: [
      { trait_type: "Type", value: "Original" },
      { trait_type: "Chakra", value: "Solar Plexus" },
      { trait_type: "Season", value: "Summer" },
    ],
  },
];

metadata.forEach((photo) => {
  collection.addPhoto(
    new Photo(
      "The Hydra",
      parseInt(photo.token_id),
      photo.name,
      photo.description,
      0.25,
      photo.attributes
    )
  );
});

export const theHydraCollection = collection;
