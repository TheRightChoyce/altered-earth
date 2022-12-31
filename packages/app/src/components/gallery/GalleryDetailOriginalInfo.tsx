import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";

import { theHydraContract } from "../../contracts";
import { Address } from "../Address";
import { GalleryMintButton } from "../GalleryMintButton";
import { OwnerName } from "../OwnerName";
import { Photo } from "../Photo";
import { useOwnerOf } from "../useOwnerOfAlchemy";
// import { useEditionInfo } from "../useEditionInfo";
import { MintState } from "./mintState";

interface OriginalInfo {
  alchemy: Alchemy;
  isConnected: boolean;
  photo: Photo;
  mintState: MintState;
  userWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

const renderMintButton = (
  photo: Photo,
  userWalletAddress: string | undefined,
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
          address={userWalletAddress}
          isOriginal={false}
          onSuccess={onMintSuccess}
          isCorrectNetwork={true}
        />
      </div>
    </div>
  );
};

const renderOwned = (owner) => {
  return (
    <div>
      <div className="flex flex-row pt-4 items-center">
        <div className="">
          <OwnerName address={owner} className="lg:text-2xl ml-8" />
        </div>
      </div>
    </div>
  );
};

export const GalleryDetailOriginalInfo = ({
  alchemy,
  isConnected,
  photo,
  mintState,
  userWalletAddress,
  onMintSuccess,
}: OriginalInfo) => {
  // Token specific info
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [owner, setOwner] = useState<string | undefined>(undefined);

  // Use and watch the owner of this token
  useOwnerOf(alchemy, photo.id, isConnected, setTokenLoaded, setOwner);

  return (
    <div className="p-4">
      <div className="rounded-md border-2 p-4 border-slate-900 bg-slate-700 mb-4">
        {/* Edition is available */}
        {mintState === MintState.OriginalOwned && renderOwned(owner)}

        {mintState !== MintState.GenericEditionSoldOut &&
          renderMintButton(
            photo,
            userWalletAddress,
            // nextAvailableEditionId,
            onMintSuccess
          )}
      </div>

      <h4 className="text-xl mb-4 font-bold">Description</h4>
      <p className="mb-4">
        An altered reality forever wandering the Ethereum blockchain. This is an
        original 1-of-1 artwork that comes with a high-res immutable image
        stored on IPFS. Each token conforms to the ERC-721 standard.
      </p>

      <h4 className="text-xl mb-4 font-bold">Details</h4>
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
