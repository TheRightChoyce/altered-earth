import React from "react";

import { Photo } from "../Photo";
import { Spinner } from "../Spinner";
import { GalleryMintButton } from "./GalleryMintButton";
import { Owner } from "./Owner";
import { TokenType } from "./tokenType";

interface IMintComponent {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess?: (owner: string, tx: string) => void;
  tokenType?: TokenType | undefined;
  loading?: boolean;
  owner?: string;
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

export const MintComponent = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
  tokenType,
  loading,
}: IMintComponent) => {
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
            {tokenType === TokenType.Original ? "1 of 1" : "45 of 50"}
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
          label={loading ? "Loading.." : "Mint Original"}
          pending={loading}
        />
      </div>
    </div>
  );
};

export const MintComponentLoading = () => {
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 rounded-lg h-48">
      <div className="mb-2 flex flex-row w-full items-center justify-center h-48">
        <div>
          <Spinner />
        </div>
      </div>
    </div>
  );
};

export const MintComponentOwned = ({
  photo,
  tokenType,
  owner,
}: IMintComponent) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 rounded-lg">
      <div className="mb-2 flex flex-row w-full justify-between">
        <div>
          <h5 className="">
            {tokenType === TokenType.Original ? "Original" : "Edition"} Price
          </h5>
          <h4 className="text-3xl font-bold line-through-">
            {tokenType === TokenType.Original
              ? photo.price
              : photo.editionPrice}{" "}
            ETH
          </h4>
        </div>
        <div className="text-right">
          <h5 className="">Available</h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original ? "0 of 1" : "45 of 50"}
          </h4>
        </div>
      </div>
      <div className="w-full mt-4">
        <Owner owner={owner} />
      </div>
    </div>
  );
};
