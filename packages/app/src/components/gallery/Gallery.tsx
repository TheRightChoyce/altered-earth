import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar, TheHydraButton, TypeNavigationButton } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryBreadcrumbs } from "./GalleryBreadcrumbs";
import { ConnectNotice } from "./GalleryConnectNotice";
import { GalleryGridPhoto } from "./GalleryGridPhoto";
import { GalleryMintButton } from "./GalleryMintButton";
import { TokenType } from "./tokenType";

export const Gallery = ({ collection }: { collection: PhotoCollection }) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  const { address, isReconnecting, isDisconnected } = useAccount();
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );
  const [type, setType] = useState(router.query.type || "original");

  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
    setType(router.query.type || "original");
  }, [address, isReconnecting, isDisconnected, router]);

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
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar */}
      <NavBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="original" currentType={type.toString()} />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="edition" currentType={type.toString()} />
        </div>
      </NavBar>

      {/* content */}
      <div className="flex flex-col items-center relative">
        <div className="relative m-auto w-full overflow-hidden h-[40vh]">
          <div className={`object-cover w-full h-[40vh]`}>
            <Image
              src="/the-hydra/hydra-gallery-hero.png"
              alt="The Hydra Collection"
              objectFit="cover"
              layout="fill"
              sizes={"100vw"}
            />
          </div>
        </div>

        {/* <div className="flex flex-rows mb-4 lg:mb-8" id="nav">
          <GalleryBreadcrumbs photoId={undefined} breadcrumb={`${type}s`} />
        </div> */}

        <div className="flex flex-col lg:flex-row mt-16 px-4 sm:px-8 lg:px-32">
          <div className="basis-1/2 lg:basis-full">
            <h1 className="text-5xl lg:text-7xl -ml-2 mb-4 leading-relaxed xl:text-7xl lg:mb-8 custom-major-mono lg:text-left">
              {collection.name}
            </h1>
            {collection.headline && (
              <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8">
                <p>{collection.headline}</p>
              </div>
            )}
            {collection.description && (
              <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8">
                <p>{collection.description}</p>
              </div>
            )}
            <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8">
              The collection consists of fifty 1-of-1 original photos (tokens
              0-49) and fifty editions of 50 (tokens 50-2,499). Each original
              photo has a corresponding on-chain edition.
            </div>

            <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8 border-2 border-slate-600 rounded-md bg-slate-700 p-4">
              Each purchase of an Original Hydra photo allows the owner to gift
              up to 5 editions.
            </div>
          </div>
        </div>

        {/* {!address && <ConnectNotice />} */}

        <div className="mt-16 px-4 sm:px-8 lg:px-32 w-full grid md:grid-cols-2 gap-4">
          {collection.photos.map((photo: Photo) => (
            <>
              <GalleryGridPhoto
                photo={photo}
                type={TokenType.Original}
                connectedWalletAddress={address}
              />

              <GalleryGridPhoto
                photo={photo}
                type={TokenType.Edition}
                connectedWalletAddress={address}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
