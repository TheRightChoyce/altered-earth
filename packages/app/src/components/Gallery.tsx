import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { useIsMounted } from "../useIsMounted";
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";

export const Gallery = ({ collection }: { collection: PhotoCollection }) => {
  const isMounted = useIsMounted();
  const { address } = useAccount();

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
    <div
      className={`${
        address ? "grayscale-0" : "grayscale"
      } transition-all ease-in-out duration-5000 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-8 justify-items-center`}
    >
      {collection.photos.map((photo: Photo) => (
        <div
          key={photo.id}
          className="md:h-64 md:w-64 hover:scale-110 transition-all duration-500"
        >
          <h5>
            <Link href={`/the-hydra/${photo.id}`}>
              <a>
                <Image
                  src={photo.previewImageUri}
                  width={512}
                  height={512}
                  alt={photo.name}
                  className="opacity-90 hover:opacity-100 ease-linear"
                />
              </a>
            </Link>
          </h5>
        </div>
      ))}
    </div>
  );
};
