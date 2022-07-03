import Image from "next/future/image";
import Link from "next/link";

import { Photo } from "./Photo";
import { useIsMounted } from "./useIsMounted";

export const Gallery = ({ collection }: { collection: Array<Photo> }) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (!collection) {
    return (
      <div>
        <h3>No collection specified!</h3>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center w-full">
      {collection.map((photo: Photo) => (
        <div key={photo.id} className="h-64">
          <h5>
            <Link href={`./the-hydra/${photo.id}`}>{photo.name}</Link>
          </h5>
        </div>
      ))}
    </div>
  );
};
