import React from "react";

import { Photo } from "../Photo";
import { GalleryMintButton } from "./GalleryMintButton";
import { Owner } from "./Owner";
import { TokenType } from "./tokenType";

interface IMintComponent {
  photo: Photo;
  connectedWalletAddress?: string | undefined;
  onMintSuccess?: (owner: string, tx: string) => void;
  tokenType?: TokenType | undefined;
  loading?: boolean;
  owner?: string;
  tokensRemaning?: number;
}

export const MintComponentOriginal = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
  loading,
  owner,
}: IMintComponent) => {
  return (
    <MintComponent
      photo={photo}
      connectedWalletAddress={connectedWalletAddress}
      onMintSuccess={onMintSuccess}
      tokenType={TokenType.Original}
      loading={loading}
      owner={owner}
    />
  );
};

export const MintComponentEdition = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
  loading,
  owner,
  tokensRemaning,
}: IMintComponent) => {
  return (
    <MintComponent
      photo={photo}
      connectedWalletAddress={connectedWalletAddress}
      onMintSuccess={onMintSuccess}
      tokenType={TokenType.Edition}
      loading={loading}
      owner={owner}
      tokensRemaning={tokensRemaning}
    />
  );
};

export const MintComponent = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
  tokenType,
  loading,
  owner,
  tokensRemaning,
}: IMintComponent) => {
  if (owner) {
    return (
      <MintComponentOwned photo={photo} tokenType={tokenType} owner={owner} />
    );
  }
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 rounded-lg h-48">
      <div className="mb-2 flex flex-row w-full justify-between">
        <div>
          <h5 className="">
            {tokenType === TokenType.Original ? "Original" : "Edition"} Price
          </h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original
              ? photo.price
              : photo.editionPrice}{" "}
            ETH
          </h4>
        </div>
        <div className="text-right">
          <h5 className="">Available</h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original && "1 of 1"}
            {tokenType === TokenType.Edition && (
              <span>{tokensRemaning || 45} of 50</span>
            )}
          </h4>
        </div>
      </div>
      <div className="w-full mt-4">
        <GalleryMintButton
          photo={photo}
          address={connectedWalletAddress}
          isOriginal={true}
          onSuccess={onMintSuccess}
          isCorrectNetwork={true}
          label={
            loading
              ? "Loading.."
              : `Mint ${
                  tokenType === TokenType.Original ? "Original" : "Edition"
                }`
          }
          pending={loading}
        />
      </div>
    </div>
  );
};

export const MintComponentOwned = ({
  photo,
  tokenType,
  owner,
  tokensRemaning,
}: IMintComponent) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 lg:rounded-lg h-48">
      <div className="mb-2 flex flex-row w-full justify-between">
        <div>
          <h5 className="">
            {tokenType === TokenType.Original ? "Original" : "Edition"} Price
          </h5>
          <h4 className="text-3xl font-bold line-through">
            {tokenType === TokenType.Original
              ? photo.price
              : photo.editionPrice}{" "}
            ETH
          </h4>
        </div>
        <div className="text-right">
          <h5 className="">Available</h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original
              ? "0 of 1"
              : `${tokensRemaning} of 50`}
          </h4>
        </div>
      </div>
      <div className="w-full mt-4">
        <Owner owner={owner} />
      </div>
    </div>
  );
};
