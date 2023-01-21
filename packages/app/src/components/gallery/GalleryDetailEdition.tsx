import Image from "next/image";
import { useEffect, useState } from "react";

import { EditionInfoFromContract, Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailArtworkEdition } from "./GalleryDetailArtwork";
import { GalleryDetailCollectionDescription } from "./GalleryDetailCollectionDescription";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { MintComponentEdition } from "./MintComponent";
import { MintState } from "./mintState";
import { mintStateReducerEdition } from "./MintStateReducers";
import { TokenType } from "./tokenType";

interface IGalleryDetailEdition {
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
  onMintSuccess: (owner: string, tx: string) => void,
  editionInfo: EditionInfoFromContract | undefined
) => {
  let loading = false;

  switch (mintState) {
    case MintState.Unknown:
      loading = true;
      break;
  }
  return (
    <MintComponentEdition
      photo={photo}
      connectedWalletAddress={connectedWalletAddress}
      onMintSuccess={onMintSuccess}
      loading={loading}
      owner={owner}
      tokensRemaning={
        editionInfo ? editionInfo?.maxPerOriginal - editionInfo?.minted - 5 : 45
      }
    />
  );
};

export const GalleryDetailEdition = ({
  photo,
  collection,
  originalId,
  connectedWalletAddress,
  onMintSuccess,
}: IGalleryDetailEdition) => {
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [editionInfo, setEditionInfo] = useState<
    EditionInfoFromContract | undefined
  >(undefined);

  useEffect(() => {
    setMintState(
      mintStateReducerEdition(
        tokenLoaded,
        connectedWalletAddress,
        editionInfo?.soldOut
      )
    );
  }, [tokenLoaded, connectedWalletAddress, editionInfo]);

  // Get the info about this ediion
  photo?.getEditionInfo(
    originalId,
    setTokenLoaded,
    setEditionInfo,
    mintState !== MintState.NotConnected
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse pt-16 lg:pt-0 lg:basis-1/2">
        {/* Image */}
        <GalleryDetailArtworkEdition photo={photo} />

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
            undefined,
            connectedWalletAddress,
            onMintSuccess,
            editionInfo
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
          <GalleryDetailCollectionDescription tokenType={TokenType.Edition} />
          <GalleryDetailEditionInfo
            photo={photo}
            originalId={originalId}
            editionInfo={editionInfo}
          />
        </div>
      </div>
    </>
  );
};
