import { Photo, PhotoCollection } from "./Photo";
import { useIsMounted } from "./useIsMounted";

const notFound = (
  <div className="flex flex-col w-full text-center">
    <h4>Photo not found!</h4>
  </div>
);

export const GalleryDetail = ({
  collection,
  photoId,
}: {
  collection: Array<Photo>;
  photoId: number;
}) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (isNaN(photoId) || photoId < 0 || photoId > collection.length) {
    return notFound;
  }

  const photo = collection[photoId];

  if (!photo) {
    return notFound;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 w-1">
        <h2>{photo.name}</h2>
      </div>
    </div>
  );
};
