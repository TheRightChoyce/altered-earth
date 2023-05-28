import { Alchemy, Network } from "alchemy-sdk";
import slugify from "slugify";

import { Photo } from "./Photo";

export class PhotoCollection {
  id = 0;
  name = "";
  slug = "";
  headline = "";
  description = "";
  totalOriginals = 50;
  totalEditions = 2500;
  totalSupply = 2550;
  editionsPerOriginal = 50;
  alchemy;

  photos = new Array<Photo>();

  constructor(id: number, name: string, headline: string, description: string) {
    this.id = id;
    this.name = name;
    this.headline = headline;
    this.description = description;

    this.slug = slugify(this.name.toLowerCase());

    this.alchemy = new Alchemy({
      apiKey: "5xt6SDe-fhkYmhUj9oXbyzSs7NxrUyU7",
      network: Network.ETH_GOERLI,
    });
  }

  addPhoto(photo: Photo) {
    photo.previewImageUri = `/${this.slug}/previews/256/${photo.previewImage}`;
    photo.previewImage1024Uri = `/${this.slug}/previews/1024/${photo.previewImage}`;
    photo.svgPreviewUri = `/${this.slug}/svgs/${photo.svgPreview}`;
    // photo.getOwner(this.alchemy);
    this.photos.push(photo);
  }

  getNumberOfAvailableOriginals() {
    let counter = 0;

    this.photos.forEach((photo) => {
      counter += photo.hasOwner ? 0 : 1;
    });

    return counter;
  }

  /**
   * Returns all the data associated with an original photo
   * @param photoId Either the id of the original photo, or a specific Id of the edition
   */
  getPhoto(photoId: number) {
    if (isNaN(photoId) || photoId < 0) {
      return null;
    }
    // else, look up the original id by edition id
    return this.photos[this.getOriginalId(photoId)];
  }

  /**
   * If this an ID for an original, returns that. Otherwise gets the original Id assocaited with the edition
   * @param photoId Either the id of the original photo, or a specific Id of the edition
   * @returns number The original token Id
   */
  getOriginalId(photoId: number) {
    if (photoId <= this.photos.length) {
      return photoId;
    }
    return Math.floor(
      (photoId - this.totalOriginals) / this.editionsPerOriginal
    );
  }
}
