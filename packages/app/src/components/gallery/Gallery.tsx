/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryBrowseNav } from "./GalleryBrowseNav";
import { GalleryGridPhoto } from "./GalleryGridPhoto";
import { TokenType } from "./tokenType";

export const Gallery = ({ collection }: { collection: PhotoCollection }) => {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const router = useRouter();

  // The type we are viewing -- either edition or original
  const [type, setType] = useState<string>(
    (router.query.type instanceof Array
      ? router.query.type[0]
      : router.query.type) || TokenType.Original
  );

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

  console.log(type);

  return (
    <div className="flex flex-col gap-8 align-bottom">
      {/* Full Hero */}
      <div className="flex flex-col items-center relative">
        <NavBar />

        {/* Title */}
        <div className="absolute z-50 top-[20vh] text-center flex flex-col gap-8">
          <img src="/the-hydra/title.svg" alt="THE HYDRA" />
          <div className="font-medium">
            Created by:{" "}
            <span>
              <a
                href="https://therightchoyce.com"
                target="_blank"
                rel="noreferrer"
                className="text-underline"
              >
                therightchoyce.eth
              </a>
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative w-[100vw] overflow-hidden h-[75vh]">
          <div className={`object-cover w-full`}>
            <Image
              src="/the-hydra/previews/1024/0.jpg"
              alt="The Hydra Collection"
              objectFit="cover"
              layout="fill"
              className="opacity-40"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="absolute z-50 bottom-[5vh] text-center flex flex-col gap-8">
          <div className="flex flex-row gap-16">
            <div className="flex flex-col align-middle">
              <h4 className="text-md font-medium">Total</h4>
              <h2 className="text-4xl font-bold">50</h2>
            </div>
            <div className="flex flex-col">
              <h4 className="text-md font-medium">Available</h4>
              <h2 className="text-4xl font-bold">50</h2>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="px-4 text-lg font-normal">
        {collection.headline && (
          <div className="container mb-4 tracking-wide text-md lg:text-2xl lg:mb-8 text-slate-200">
            <p>{collection.headline}</p>
          </div>
        )}
        {collection.description && (
          <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8 text-slate-300">
            <p>{collection.description}</p>
          </div>
        )}
      </div>

      {/* Gallery navigation */}
      <GalleryBrowseNav currentType={type} setType={setType} />

      {/* photo gallery */}
      <div className="px-4">
        <div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 auto-cols-max gap-8 justify-center px-8">
            {collection.photos.map((photo: Photo) => (
              <>
                {type == TokenType.Original && (
                  <GalleryGridPhoto
                    photo={photo}
                    type={TokenType.Original}
                    connectedWalletAddress={address}
                  />
                )}

                {type == TokenType.Edition && (
                  <GalleryGridPhoto
                    photo={photo}
                    type={TokenType.Edition}
                    connectedWalletAddress={address}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
