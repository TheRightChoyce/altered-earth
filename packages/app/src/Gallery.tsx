import Image from "next/future/image";
import Link from "next/link";

import { Photo, PhotoCollection } from "./Photo";
import { useIsMounted } from "./useIsMounted";

export const Gallery = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center w-full">
      {PhotoCollection.map((photo: Photo) => (
        <div key={photo.id} className="h-64">
          <h5>
            <Link href={`./the-hydra/${photo.id}`}>{photo.name}</Link>
          </h5>
        </div>
      ))}
    </div>
  );
};
