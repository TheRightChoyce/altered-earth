import Image from "next/image";
import Link from "next/link";

import { useIsMounted } from "../useIsMounted";
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";

const notFound = (
  <div className="flex flex-col w-full text-center">
    <h4>Photo not found!</h4>
  </div>
);

export const GalleryDetail = ({
  collection,
  photoId,
}: {
  collection: PhotoCollection;
  photoId: number;
}) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (isNaN(photoId) || photoId < 0 || photoId > collection.photos.length) {
    return notFound;
  }

  const photo = collection.photos[photoId];

  if (!photo) {
    return notFound;
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl">{photo.name}</h2>
      <Image
        src={photo.previewImageUri}
        width={512}
        height={512}
        alt={photo.name}
      />
    </div>
  );
};
