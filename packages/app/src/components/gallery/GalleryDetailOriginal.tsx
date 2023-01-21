import { useEffect, useState } from "react";

import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailArtworkOriginal } from "./GalleryDetailArtwork";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
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
      <div className="flex flex-col lg:flex-row-reverse pt-16 lg:pt-0 lg:basis-1/2">
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

          {/* <GalleryDetailOriginalInfo
            photo={photo}
            connectedWalletAddress={connectedWalletAddress}
            onMintSuccess={onMintSuccess}
          /> */}
        </div>
      </div>
    </>
  );
};
