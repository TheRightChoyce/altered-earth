/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { Spinner } from "../Spinner";
import { GalleryActionNavigation } from "./GalleryBrowseNav";
import { GalleryGridPhoto } from "./GalleryGridPhoto";
import { TokenType } from "./tokenType";

export const Gallery = ({
  collection,
  tokenType,
}: {
  collection: PhotoCollection;
  tokenType: TokenType;
}) => {
  const isMounted = useIsMounted();
  const { address } = useAccount();

  const [loading] = useState(false);

  if (!isMounted) {
    return (
      <div className="text-center pt-32 h-96">
        <Spinner />
      </div>
    );
  }

  if (!collection) {
    return (
      <div>
        <h3>No collection specified!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 align-bottom">
      {/* Full Hero */}
      <div className="flex flex-col items-center relative">
        <NavBar />

        {/* Title */}
        <div className="absolute z-10 top-[20vh] lg:top-[25vh] text-center flex flex-col gap-8">
          <img
            src="/the-hydra/title.svg"
            alt="THE HYDRA"
            className="lg:hidden"
          />
          <img
            src="/the-hydra/title-lg.svg"
            alt="THE HYDRA"
            className="hidden lg:flex"
          />
          <div className="font-medium">
            Created by:{" "}
            <span>
              <a
                href="https://therightchoyce.com"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                therightchoyce.eth
              </a>
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative w-[100vw] overflow-hidden h-[75vh] lg:h-[75vh] min-h-[512px]">
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
        {tokenType === TokenType.Original && (
          <div className="absolute z-10 bottom-[5vh] text-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-800 lg:rounded-l-xl lg:rounded-r-xl p-4 bg-opacity-80 gap-4">
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Originals</h4>
                <h2 className="text-2xl font-bold">50</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Type</h4>
                <h2 className="text-2xl font-bold">1 of 1</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Price</h4>
                <h2 className="text-2xl font-bold">0.25ETH</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Collection of</h4>
                <h2 className="text-2xl font-bold">2,550</h2>
              </div>
            </div>
          </div>
        )}
        {tokenType === TokenType.Edition && (
          <div className="absolute z-10 bottom-[5vh] lg:bottom-[10vh] text-center flex flex-col gap-4 lg:gap-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-slate-800 rounded-l-xl rounded-r-xl p-4 bg-opacity-80 gap-4">
              <div className="flex flex-col align-middle ">
                <h4 className="text-md font-medium">Editions</h4>
                <h2 className="text-2xl font-bold">50</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Type</h4>
                <h2 className="text-2xl font-bold">of 50</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Price</h4>
                <h2 className="text-2xl font-bold">0.05ETH</h2>
              </div>
              <div className="flex flex-col align-middle">
                <h4 className="text-md font-medium">Collection of</h4>
                <h2 className="text-2xl font-bold">2,550</h2>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* About */}
      <div className="font-normal text-center m-auto max-w-[800px]">
        {collection.headline && (
          <div className="container mb-4 tracking-wide text-md lg:text-lg lg:mb-8 text-slate-200">
            <p>{collection.headline}</p>
          </div>
        )}
        {collection.description && (
          <div className="container mb-4 tracking-wide text-md lg:text-lg text-slate-300">
            <p>{collection.description}</p>
          </div>
        )}
      </div>

      {/* Gallery navigation */}
      <div className="mb-8">
        <GalleryActionNavigation currentType={tokenType} />
      </div>

      {/* photo gallery */}
      {loading && (
        <div className="text-center pt-32 h-64">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="px-4" id="browse">
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max gap-8 justify-center px-8">
              {collection.photos.map((photo: Photo) => (
                <>
                  {tokenType == TokenType.Original && (
                    <GalleryGridPhoto
                      key={photo.id}
                      photo={photo}
                      type={TokenType.Original}
                      connectedWalletAddress={address}
                    />
                  )}

                  {tokenType == TokenType.Edition && (
                    <GalleryGridPhoto
                      key={photo.id}
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
      )}
    </div>
  );
};
