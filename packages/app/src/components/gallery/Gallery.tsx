import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar, TheHydraButton, TypeNavigationButton } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { TypeToggle } from "../TypeToggle";
import { GalleryBreadcrumbs } from "./GalleryBreadcrumbs";
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
      {/* <NavBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="original" currentType={type.toString()} />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="edition" currentType={type.toString()} />
        </div>
      </NavBar> */}

      {/* content */}
      <div className="flex flex-col items-center relative">
        <div className="relative m-auto w-full overflow-hidden h-[30vh]">
          <div className={`object-cover w-full h-[30vh]`}>
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
              The collection consists of 50 1-of-1 original photos (tokens 0-49)
              and 50 on-chain editions of 50. Each edition represents an
              on-chain version of the original 1-of-1 photo.
            </div>

            <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8 border-2 border-slate-600 rounded-md bg-slate-700 p-4">
              Each purchase of an Original Hydra photo allows the owner to gift
              up to 5 editions.
            </div>
          </div>
        </div>

        {!address && (
          <div className="my-8 p-8 lg:mb-16 flex flex-col justify-center items-center w-100 bg-gray-700 m-auto">
            <div className="basis-1">
              <h4 className="text-xl lg:max-w-xl mb-8 text-center text-gray-200 uppercase">
                altered earth is best experienced in a dream state. please
                connect your wallet to dream
              </h4>
            </div>
            <div className="">
              <ConnectButton label="Connect wallet to dream" />
            </div>
          </div>
        )}

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
