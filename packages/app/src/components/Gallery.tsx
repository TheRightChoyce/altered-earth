import Image from "next/image";
import Link from "next/link";

import { useIsMounted } from "../useIsMounted";
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";

export const Gallery = ({ collection }: { collection: PhotoCollection }) => {
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
      {collection.photos.map((photo: Photo) => (
        <div key={photo.id} className="h-64">
          <h5>
            <Link href={`/the-hydra/${photo.id}`}>
              <a>
                <Image
                  src={photo.previewImageUri}
                  width={250}
                  height={250}
                  alt={photo.name}
                />
              </a>
            </Link>
          </h5>
        </div>
      ))}
    </div>
  );
};
