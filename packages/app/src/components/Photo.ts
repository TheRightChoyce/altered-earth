import slugify from "slugify";

export class Photo {
  collection = "";
  id = 0;
  name = "";
  description = "";
  price = 0.25;
  previewImage = "";
  previewImageUri = "";
  svgPreview = "";
  svgPreviewUri = "";
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

    let imageId = id + "";
    if (id < 10) {
      imageId = `0${imageId}`;
    }

    this.previewImage = `${imageId}.jpg`;
    this.svgPreview = `${imageId}.svg`;
  }

  getEditionIdStart = () => {
    return this.id * 50 + 50;
  };
  getEditionIdEnd = () => {
    return this.id * 50 + 99;
  };
}
