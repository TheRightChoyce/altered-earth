import Image from "next/image";
import { useEffect, useState } from "react";

import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { ToggleTypeButton } from "./GalleryBrowseNav";
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
  setType?: (type: TokenType) => void;
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
  setType,
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
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="lg:basis-1/2">
          {/* Full Hero */}
          <GalleryDetailArtworkOriginal photo={photo} />

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

          {/* Type toggle button */}
          <div className="text-center mt-16 rounded-lg border-slate-800 border-2 py-6 m-auto">
            You are viewing the original.
            <br />
            <ToggleTypeButton
              currentType={TokenType.Original}
              type={TokenType.Edition}
              photoId={photo.id}
              setType={setType}
            />{" "}
            instead.
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:mt-8 lg:px-8">
        <div className="lg:flex lg:flex-row px-4 py-8 border-t-2 lg:py-16">
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
