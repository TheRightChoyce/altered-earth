import slugify from "slugify";

import { PhotoCollection } from "./PhotoCollection";

export class Photo {
  collection = "";
  id = 0;
  name = "";
  description = "";
  price = 0.25;
  previewImage = "";
  previewImageUri = "";
  slug = "";

  constructor(
    collection: string,
    id: number,
    name: string,
    description: string,
    price?: number
  ) {
    this.collection = collection;
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price || this.price;

    this.slug = slugify(this.name.toLowerCase());

    this.previewImage = `${id}.jpg`;
  }
}
