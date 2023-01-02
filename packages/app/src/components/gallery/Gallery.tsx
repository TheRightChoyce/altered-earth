import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { GalleryBreadcrumbs } from "./GalleryBreadcrumbs";
import { NavBar, TheHydraButton, TypeNavigationButton } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { TypeToggle } from "../TypeToggle";

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
      <div className="w-[100vw] px-4 lg:px-8 lg:w-[90vw] lg:ml-[10vw]">
        <div className="flex flex-rows mb-4 lg:mb-8" id="nav">
          {/* breadcrumbs + arrow navigation */}
          <GalleryBreadcrumbs photoId={undefined} breadcrumb={`${type}s`} />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="basis-1/2 lg:px-8">
            <h1 className="text-6xl -ml-2 mb-4 leading-relaxed xl:text-7xl lg:mb-8 custom-major-mono lg:text-left">
              {collection.name}
            </h1>
            <div className={`${imageClass} basis-1/2 mb-4`}>
              <Image
                src="/the-hydra/hydra-gallery-hero.png"
                alt="The Hydra Collection"
                layout="intrinsic"
                width={800}
                height={500}
                sizes={"100vw"}
              />
            </div>
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

        {/* <div className="container mb-4 px-8 tracking-wide text-md lg:text-xl lg:mb-8 text-center">
          To switch between originals and editions, use the “O” and “E” buttons
          on the nav.
        </div> */}

        <div className="mt-16">
          {/* Original / Edition toggle */}
          <TypeToggle currentType={type.toString()} />

          <div
            className={`${imageClass} px-[4vw] grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 justify-items-center`}
          >
            {collection.photos.map((photo: Photo) => (
              <div
                key={photo.id}
                className="h-64 w-48 md:h-96 md:w-64 lg:hover:scale-110 lg:transition-transform lg:duration-500 block"
              >
                <Link href={`/the-hydra/${photo.id}?type=${type}`}>
                  <a>
                    <div className="relative">
                      <Image
                        layout={"responsive"}
                        width={256}
                        height={341}
                        src={photo.previewImageUri}
                        alt={photo.name}
                        priority={true}
                        sizes={"100vw"}
                        className={`${
                          type == "original" ? "opacity-100" : "opacity-20"
                        } ease-linear transition-all duration-500`}
                      />
                      <div
                        className={`${
                          type == "original" ? "hidden" : "visible"
                        } absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%] ease-linear transition-all duration-300`}
                      >
                        <Image
                          layout={"responsive"}
                          width={256}
                          height={256}
                          src={photo.svgPreviewUri}
                          alt={photo.name}
                          priority={true}
                        />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};