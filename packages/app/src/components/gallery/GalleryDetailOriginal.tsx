import Image from "next/image";
import { useEffect, useState } from "react";

import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { TypeToggleSmall } from "../TypeToggle";
import { GalleryDetailArtworkOriginal } from "./GalleryDetailArtwork";
import { GalleryDetailCollectionDescription } from "./GalleryDetailCollectionDescription";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { GalleryNav } from "./GalleryNav";
import { MintComponentOriginal } from "./MintComponent";
import { MintState } from "./mintState";
import { mintStateReducerOriginal } from "./MintStateReducers";
import { TokenType } from "./tokenType";

interface IGalleryDetailOriginal {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  connectedWalletAddress?: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

const mintComponentReducer = (
  mintState: MintState,
  photo: Photo,
  owner: string | undefined,
  connectedWalletAddress: string | undefined,
  onMintSuccess: (owner: string, tx: string) => void
) => {
  let loading = false;

  switch (mintState) {
    case MintState.Unknown:
      loading = true;
      break;
  }
  return (
    <MintComponentOriginal
      photo={photo}
      connectedWalletAddress={connectedWalletAddress}
      onMintSuccess={onMintSuccess}
      loading={loading}
      owner={owner}
    />
  );
};

export const GalleryDetailOriginal = ({
  photo,
  collection,
  originalId,
  connectedWalletAddress,
  onMintSuccess,
}: IGalleryDetailOriginal) => {
  // Token specific info
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [tokenLoaded, setTokenLoaded] = useState(true);
  const [owner, setOwner] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMintState(
      mintStateReducerOriginal(tokenLoaded, owner, connectedWalletAddress)
    );
  }, [owner, connectedWalletAddress, tokenLoaded]);

  // Use and watch the owner of this token
  photo?.getOwnerFromContract(
    setOwner,
    setTokenLoaded,
    mintState !== MintState.NotConnected
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse lg:pt-0 lg:basis-1/2">
        {/* Image */}
        <GalleryDetailArtworkOriginal photo={photo} />

        {/* content */}
        <div className="h-full lg:basis-1/2 lg:pl-28 lg:pr-8 lg:pt-8">
          <GalleryDetailTokenInfo
            photo={photo}
            collection={collection}
            type={TokenType.Original}
            originalId={originalId}
          />

          {/* Mint */}
          {mintComponentReducer(
            mintState,
            photo,
            owner,
            connectedWalletAddress,
            onMintSuccess
          )}
          <div className="text-center mt-8 hidden lg:block">
            <small className="block mb-2">scroll for more info</small>
            <Image
              src="/arrow-down.svg"
              width={64}
              height={64}
              alt="Scroll for more info"
              className="animate-pulse ease-linear"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row lg:pl-44 lg:pr-8 lg:mt-16">
        <div className="lg:flex lg:flex-row px-4 py-8">
          <GalleryDetailCollectionDescription />
          <GalleryDetailOriginalInfo
            photo={photo}
            connectedWalletAddress={connectedWalletAddress}
            onMintSuccess={onMintSuccess}
          />
        </div>
      </div>
    </>
  );
};
