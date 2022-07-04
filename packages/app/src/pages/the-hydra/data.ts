import { Photo } from "../../Photo";
import { PhotoCollection } from "../../PhotoCollection";

const collection = new PhotoCollection(
  0,
  "The Hydra",
  "The hydra exists where the river meets the woods."
);

collection.addPhoto(new Photo("The Hydra", 0, "The Hydra", ""));
collection.addPhoto(new Photo("The Hydra", 1, "The Hydra 1", ""));
collection.addPhoto(new Photo("The Hydra", 2, "The Hydra 2", ""));
collection.addPhoto(new Photo("The Hydra", 3, "The Hydra 3", ""));
collection.addPhoto(new Photo("The Hydra", 4, "The Hydra 4", ""));
collection.addPhoto(new Photo("The Hydra", 5, "The Hydra 5", ""));

export const theHydraCollection = collection;
