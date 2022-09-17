import slugify from "slugify";

interface IAttribute {
  trait_type: string;
  value: string;
}

export class Photo {
  collection = "";
  id = 0;
  name = "";
  description = "";
  price = 0.25;
  previewImage = "";
  svgPreview = "";
  // Uris are set from the collection since it knows the root path
  svgPreviewUri = "";
  previewImageUri = "";
  previewImage1024Uri = "";
  slug = "";
  attributes: Record<string, string> = {};

  constructor(
    collection: string,
    id: number,
    name: string,
    description: string,
    price?: number,
    attributes?: Array<IAttribute>
  ) {
    this.collection = collection;
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price || this.price;

    this.slug = slugify(this.name.toLowerCase());

    this.previewImage = `${id}.jpg`;
    this.svgPreview = `${id}.svg`;

    if (attributes) {
      attributes.forEach((attribute) => {
        this.attributes[attribute["trait_type"]] = attribute["value"];
      });
    }
  }

  getEditionIdStart = () => {
    return this.id * 50 + 50;
  };
  getEditionIdEnd = () => {
    return this.id * 50 + 99;
  };
  getEditionIndex = (tokenId: number) => {
    return (tokenId % 50) + 1;
  };
}
