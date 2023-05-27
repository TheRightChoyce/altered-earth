import { useEffect, useState } from "react";

import { EditionInfoFromContract, Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { TokenTypeToggleLink } from "./GalleryBrowseNav";
import { GalleryDetailArtworkEdition } from "./GalleryDetailArtwork";
import { GalleryDetailCollectionDescription } from "./GalleryDetailCollectionDescription";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { GalleryNav } from "./GalleryNav";
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
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="lg:basis-1/2">
          {/* Hero */}
          <GalleryDetailArtworkEdition photo={photo} />

          <GalleryNav
            collection={collection}
            photoId={photo.id}
            photoType={TokenType.Original}
          />
        </div>

        {/* content */}
        <div className="h-full mt-8 lg:basis-1/2 px-8">
          <GalleryDetailTokenInfo
            photo={photo}
            collection={collection}
            type={TokenType.Edition}
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
          {/* Type toggle button */}
          <div className="text-center mt-16 rounded-lg border-slate-800 border-2 py-6 px-6 m-auto">
            <div className="text-lg mb-4">
              You are viewing the on-chain edition.
            </div>
            <TokenTypeToggleLink
              currentType={TokenType.Edition}
              type={TokenType.Original}
              photoId={photo.id}
            />{" "}
            instead.
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:mt-8 lg:px-8">
        <div className="lg:flex lg:flex-row px-4 py-8 border-t-2 lg:py-16">
          <GalleryDetailCollectionDescription />
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
