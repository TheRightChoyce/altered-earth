import { useEffect, useState } from "react";

import { theHydraContract } from "../../contracts";
import { LooksRareButton } from "../../LooksRareButton";
import { OpenSeaButton } from "../../OpenSeaButton";
import { Address } from "../Address";
import { OwnerName } from "../OwnerName";
import { Photo } from "../Photo";
import { Spinner } from "../Spinner";
import { GalleryMintButton } from "./GalleryMintButton";
import { MintState } from "./mintState";

interface OriginalInfo {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

const renderMintButton = (
  photo: Photo,
  connectedWalletAddress: string | undefined,
  onMintSuccess: (owner: string, tx: string) => void
) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <h5 className="text-xl">Price</h5>
        <h4 className="text-3xl">0.25 ETH</h4>
      </div>
      <div className="w-full">
        <GalleryMintButton
          photo={photo}
          address={connectedWalletAddress}
          isOriginal={true}
          onSuccess={onMintSuccess}
          isCorrectNetwork={true}
        />
      </div>
    </div>
  );
};

const renderOwned = (photo: Photo) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="mb-2">
          <h5 className="text-xl">Minted</h5>
          <h4 className="text-3xl line-through">0.25 ETH</h4>
        </div>
      </div>

      <div className="mb-[2vh] flex flex-row">
        <div className="basis-1/2 mr-4">
          <OpenSeaButton tokenId={photo.id} />
        </div>
        <div className="basis-1/2">
          <LooksRareButton tokenId={photo.id} />
        </div>
      </div>
    </div>
  );
};

export const GalleryDetailOriginalInfo = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
}: OriginalInfo) => {
  // Token specific info
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [owner, setOwner] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!tokenLoaded) setMintState(MintState.Unknown);
    else if (owner !== undefined) setMintState(MintState.OriginalOwned);
    else if (owner === undefined) setMintState(MintState.OriginalAvailable);
  }, [owner, tokenLoaded]);

  // Use and watch the owner of this token
  photo?.getOwnerFromContract(setOwner, setTokenLoaded);

  return (
    <div className="p-4">
      <div className="rounded-md border-2 p-4 border-slate-900 bg-slate-700 mb-4">
        {mintState == MintState.Unknown && (
          <div className="pt-8">
            <Spinner />
          </div>
        )}

        {/* Wallet not connected to a network */}
        {mintState == MintState.NotConnected && (
          <div className="flex flex-col items-center">
            <div className="w-full">
              <GalleryMintButton
                photo={photo}
                address={connectedWalletAddress}
                isOriginal={true}
                onSuccess={onMintSuccess}
                isCorrectNetwork={false}
              />
            </div>
            <div className="pt-3 text-sm italic">
              Click above to connect your web3 wallet
            </div>
          </div>
        )}

        {/* Wallet connected to the wrong network */}
        {mintState == MintState.WrongNetwork && (
          <div className="flex flex-col items-center">
            <div className="w-full">
              <GalleryMintButton
                photo={photo}
                address={connectedWalletAddress}
                isOriginal={true}
                onSuccess={onMintSuccess}
                isCorrectNetwork={false}
              />
            </div>
            <div className="pt-3 text-sm italic">
              Please connect your wallet to the{` `}
              {process.env.NEXT_PUBLIC_CHAIN_NAME} network
            </div>
          </div>
        )}

        {/* Original is owned */}
        {mintState === MintState.OriginalOwned && renderOwned(photo)}

        {/* Original is available */}
        {mintState == MintState.OriginalAvailable &&
          renderMintButton(photo, connectedWalletAddress, onMintSuccess)}
      </div>

      {/* Show owner when owned */}
      {mintState === MintState.OriginalOwned && (
        <div className="mt-8 mb-12 flex flex-row items-center content-center justify-center">
          <div className="text-xl font-bold">Owner:</div>
          <div className="ml-4 rounded-lg bg-slate-900 px-4 py-1">
            <div className="flex flex-row items-center">
              <span className="rounded-full bg-pink-600 h-4 w-4 inline-block mr-2"></span>
              <OwnerName address={owner} className="lg:text-2xl ml-8" />
            </div>
          </div>
        </div>
      )}

      <h4 className="text-2xl mb-4 font-bold">Description</h4>
      <p className="mb-4">
        An altered reality forever wandering the Ethereum blockchain. This is an
        original 1-of-1 artwork that comes with a high-res immutable image
        stored on IPFS. Each token conforms to the ERC-721 standard.
      </p>

      <h4 className="text-2xl mb-4 font-bold">Details</h4>
      <div className="my-[2vh] grid grid-cols-2">
        <div className="mb-4">
          <h6 className="uppercase">Token Id</h6>
          <div className="text-lg font-bold">{photo.id}</div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Royalties</h6>
          <div className="text-lg font-bold">7.5%</div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Contract</h6>
          <div className="text-lg font-bold">
            <a
              href={`https://${process.env.NEXT_PUBLIC_CHAIN_NAME?.toLowerCase()}.etherscan.io/address/${
                theHydraContract.address
              }`}
              target="_blank"
              rel="noreferrer"
            >
              {Address(theHydraContract.address)}
            </a>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Type</h6>
          <div className="text-lg font-bold">Original 1-of-1</div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Chakra</h6>
          <div className="text-lg font-bold">{photo.attributes["Chakra"]}</div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Season</h6>
          <div className="text-lg font-bold">{photo.attributes["Season"]}</div>
        </div>
      </div>
    </div>
  );
};
