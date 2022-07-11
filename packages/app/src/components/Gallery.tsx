import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

import { useIsMounted } from "../useIsMounted";
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";

export const Gallery = ({
  address,
  collection,
}: {
  address: string | undefined;
  collection: PhotoCollection;
}) => {
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
    <>
      {!address && (
        <div className="mb-16">
          <h4 className="text-xl md:text-2xl mb-8 text-center text-pink-300 font-semibold">
            Only in a dream state can you fully experience an Altered Reality.
          </h4>
          <div className="flex justify-center">
            <ConnectButton label="Enter Dream State" />
          </div>
        </div>
      )}
      <div
        className={`${
          address ? "grayscale-0" : "grayscale"
        } transition-color ease-in-out duration-5000 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:gap-8 justify-items-center md:max-w-xl lg:max-w-full`}
      >
        {collection.photos.map((photo: Photo) => (
          <div
            key={photo.id}
            className="md:h-64 md:w-64 hover:scale-110 transition-transform duration-500"
          >
            <h5 className="cursor-pointer">
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
    </>
  );
};
