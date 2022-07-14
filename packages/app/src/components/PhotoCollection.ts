import slugify from "slugify";

import { Photo } from "./Photo";

export class PhotoCollection {
  id = 0;
  name = "";
  slug = "";
  description = "";

  photos = new Array<Photo>();

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.slug = slugify(this.name.toLowerCase());
  }

  addPhoto(photo: Photo) {
    photo.previewImageUri = `/${this.slug}/previews/${photo.previewImage}`;
    photo.svgPreviewUri = `/${this.slug}/svgs/${photo.svgPreview}`;
    this.photos.push(photo);
  }
}
