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
      {collection.description && (
        <div className="container mb-4 px-8 text-center tracking-wide text-md lg:text-xl lg:mb-16">
          <p>{collection.description}</p>
        </div>
      )}

      {!address && (
        <div className="mb-8 bg-pink-900 p-8 lg:mb-16">
          <h4 className="text-2xl lg:text-4xl lg:max-w-xl mb-8 text-center text-pink-200 ">
            Only in a dream state can you fully experience an Altered Reality.
          </h4>
          <div className="flex justify-center">
            <ConnectButton label="Connect wallet to dream" />
          </div>
        </div>
      )}

      <div
        className={`${
          address ? "grayscale-0" : "grayscale"
        } px-[4vw] transition-all ease-in-out duration-5000 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 justify-items-center `}
      >
        {collection.photos.map((photo: Photo) => (
          <div
            key={photo.id}
            className="md:h-64 md:w-64 lg:hover:scale-110 lg:transition-transform lg:duration-500"
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
