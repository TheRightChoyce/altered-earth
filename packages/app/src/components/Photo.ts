import slugify from "slugify";

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

    let imageId = id + 1 + "";
    if (id < 9) {
      imageId = `0${imageId}`;
    }

    this.previewImage = `ALTERED-EARTH-${imageId}.jpg`;
  }
}
