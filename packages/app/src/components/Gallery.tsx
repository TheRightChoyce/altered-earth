import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../useIsMounted";
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";
import {
  SideBar,
  TheHydraButton,
  TheRightChoyceFloatingButton,
  TypeNavigationButton,
} from "./SideBar";
import { TypeToggle } from "./TypeToggle";

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
      <SideBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="original" currentType={type.toString()} />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton type="edition" currentType={type.toString()} />
        </div>
      </SideBar>

      {/* content */}
      <div className="w-[100vw] lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        <div className="flex flex-rows lg:mb-8 ml-4 lg:ml-0" id="nav">
          {/* breadcrumbs + arrow navigation */}
          <div className="h-16 flex items-center justify-between w-full">
            <div className="">
              <h4 className="lg:text-xl font-extralight leading-relaxed">
                <Link href="/the-hydra">
                  <a className="font-extrabold">THE HYDRA</a>
                </Link>{" "}
                / ORIGINALS
              </h4>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="basis-1/2">
            <h1 className="text-6xl leading-relaxed lg:text-7xl lg:mb-8 custom-major-mono text-center lg:text-left">
              {collection.name}
            </h1>
            {collection.headline && (
              <div className="container mb-4 px-8 tracking-wide text-md lg:text-xl lg:mb-8">
                <p>{collection.headline}</p>
              </div>
            )}
            {collection.description && (
              <div className="container mb-4 px-8 tracking-wide text-md lg:text-xl lg:mb-8">
                <p>{collection.description}</p>
              </div>
            )}
            <div className="container mb-4 px-8 tracking-wide text-md lg:text-xl lg:mb-8">
              The collection consists of 50 1-of-1 original photos. Each photo
              then has 50 editions of an on-chain version available.
            </div>
          </div>
          <div className="basis-1/2">
            <Image
              src="/the-hydra/hydra-hero.png"
              alt="The Hydra Collection"
              layout="intrinsic"
              width={1443}
              height={658}
            />
          </div>
        </div>

        {!address && (
          <div className="my-8 p-8 lg:mb-16 flex flex-col justify-center items-center w-3/4 bg-pink-900 m-auto">
            <div className="basis-1">
              <h4 className="text-2xl lg:max-w-xl mb-8 text-center text-gray-200 uppercase">
                altered earth is best experienced in a dream state. please
                connect your wallet to dream
              </h4>
            </div>
            <div className="">
              <ConnectButton label="Connect wallet to dream" />
            </div>
          </div>
        )}

        <div className="container mb-4 px-8 tracking-wide text-md lg:text-xl lg:mb-8">
          To switch between originals and editions, use the “O” and “E” buttons
          on the nav , or press the “O” or “E” key on your keyboard.
        </div>

        <div className="mt-16">
          {/* Original / Edition toggle */}
          <TypeToggle currentType={type.toString()} />

          <div
            className={`${imageClass} px-[4vw] grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 justify-items-center`}
          >
            {collection.photos.map((photo: Photo) => (
              <div
                key={photo.id}
                className="h-64 w-48 md:h-96 md:w-64 lg:hover:scale-110 lg:transition-transform lg:duration-500"
              >
                <Link href={`/the-hydra/${photo.id}?type=${type}`}>
                  <a>
                    <div className="relative">
                      <Image
                        layout={"responsive"}
                        width={768}
                        height={1024}
                        src={photo.previewImageUri}
                        alt={photo.name}
                        priority={true}
                        className={`${
                          type == "original" ? "opacity-100" : "opacity-20"
                        } ease-linear transition-all duration-500`}
                      />
                      <div
                        className={`${
                          type == "original" ? "hidden" : "visible"
                        } absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%]`}
                      >
                        <Image
                          layout={"responsive"}
                          width={768}
                          height={768}
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
