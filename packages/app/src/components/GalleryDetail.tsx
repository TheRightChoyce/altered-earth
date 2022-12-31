import { Alchemy, Network } from "alchemy-sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../useIsMounted";
import { GalleryDetailEditionInfo } from "./gallery/GalleryDetailEditionInfo";
import { GalleryDetailOriginalInfo } from "./gallery/GalleryDetailOriginalInfo";
import { GalleryDetailTypeToggle } from "./gallery/GalleryDetailTypeToggle";
import { GalleryNav } from "./gallery/GalleryNav";
import { MintState } from "./gallery/mintState";
import { TokenType } from "./gallery/tokenType";
import { NavBar, TheHydraButton, TypeNavigationButton } from "./NavBar";
import { PhotoCollection } from "./PhotoCollection";
import { useNetworkCheck } from "./useNetworkCheck";

const notFound = (
  <div className="flex flex-col w-full text-center">
    <h4>Photo not found!</h4>
  </div>
);

export const GalleryDetail = ({
  collection,
  photoId,
}: {
  collection: PhotoCollection;
  photoId: number;
}) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { isConnected } = useNetworkCheck();

  // User wallet
  const { address, isReconnecting, isDisconnected } = useAccount();

  // Token specific info
  // const [tokenLoaded, setTokenLoaded] = useState(false);
  // const [mintState, setMintState] = useState(MintState.Unknown);

  // Photo ids
  const originalId = collection.getOriginalId(photoId);
  const photo = useMemo(() => {
    return collection.getPhoto(originalId);
  }, [collection, originalId]);

  // Default the token type since we might need to manually adjust
  const initTokenType = (photoId: number, originalId: number) => {
    let _type: string = TokenType.Original;
    if (photoId !== originalId) {
      _type = TokenType.Edition;
    }
    // if (router.query.type) {
    //   if (router.query.type instanceof Array) {
    //     _type = router.query.type[0];
    //   } else {
    //     _type = router.query.type;
    //   }
    // }
    return _type;
  };

  // The type we are viewing -- either edition or original
  const [type, setType] = useState(initTokenType(photoId, originalId));

  // Navigation helpers
  const [previousPhoto, setPreviousPhoto] = useState(-1);

  // UI helpers
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );
  const [originalImageClass, setOriginalImageClass] = useState(
    type === "original" ? "opacity-100" : "opacity-20"
  );
  const [editionImageClass, setEditionImageClass] = useState(
    type === "original" ? "opacity-20" : "opacity-100"
  );

  // Adjust the grayscale of the images if user is not connected
  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
  }, [address, isReconnecting, isDisconnected]);

  // Adjust the opacity of the original when viewing an edition
  useEffect(() => {
    setOriginalImageClass(
      `${
        type === "original" ? "opacity-100" : "opacity-20"
      } ease-linear transition-all duration-500`
    );
  }, [type]);

  // Adjust the opacity of the edition when viewing an edition
  useEffect(() => {
    setEditionImageClass(
      `${
        type === "original" ? "opacity-0" : "opacity-100"
      } ease-linear transition-all duration-500`
    );
  }, [type]);

  const onMintSuccess = (owner: string, tx: string) => {
    // setHasOwner(true);
    console.debug(owner, tx);
  };

  if (previousPhoto != originalId) {
    setPreviousPhoto(originalId);
    // setTokenLoaded(false);
  }

  if (!isMounted) {
    return <div>...</div>;
  }

  if (!photo) {
    return notFound;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar */}
      <NavBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton
            type="original"
            currentType={type.toString()}
            originalId={originalId}
          />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton
            type="edition"
            currentType={type.toString()}
            originalId={originalId}
          />
        </div>
      </NavBar>

      {/* Image + token info */}
      <div className="px-8">
        <div className="relative mb-4" id="artwork">
          {/* Image */}
          <div className={`${imageClass} m-auto`}>
            <div className="relative min-h-[290]">
              <Image
                layout={"responsive"}
                width={768}
                height={1024}
                src={photo.previewImage1024Uri}
                alt={photo.name}
                priority={true}
                sizes={"100vw"}
                className={originalImageClass}
              />
              <div
                className={`${editionImageClass} absolute w-[75%] h-[56%] top-[12.5%] left-[12.5%] border-8 border-slate-100`}
              >
                <Image
                  layout={"responsive"}
                  width={768}
                  height={768}
                  src={photo.svgPreviewUri}
                  alt={photo.name}
                  priority={true}
                  sizes={"100vw"}
                />
              </div>
            </div>
          </div>

          {/* Token Information */}
          <div className="absolute top-2 left-4">
            {/* {type == TokenType.Edition && <h3 className="mb-2">Edition of:</h3>} */}
            <h2 className="text-2xl lg:text-5xl mb-8 bg-black px-2 opacity-75">
              {photo.name}
            </h2>
          </div>

          <div className="absolute bottom-8 left-4 mr-4 bg-black px-2 opacity-75">
            <p className="text-lg italic leading-tight">{photo.description}</p>
          </div>
        </div>
      </div>

      {/* gallary photo nav */}
      <GalleryNav
        collection={collection}
        photoId={originalId}
        photoType={type.toString()}
        photoLimit={50}
      />

      <div className="bg-slate-800">
        {/* Original / Edition toggle */}
        <GalleryDetailTypeToggle setType={setType} currentType={type} />

        {/* Original / Edition info */}
        <div className="container">
          {type == "original" && (
            <GalleryDetailOriginalInfo
              photo={photo}
              connectedWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
          {type == "edition" && (
            <GalleryDetailEditionInfo
              isConnected={isConnected}
              photo={photo}
              originalId={originalId}
              mintState={mintState}
              userWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};
