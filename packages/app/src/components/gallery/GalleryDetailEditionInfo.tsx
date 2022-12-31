import { useState } from "react";

import { theHydraContract } from "../../contracts";
import { LooksRareButton } from "../../LooksRareButton";
import { OpenSeaButton } from "../../OpenSeaButton";
import { Address } from "../Address";
import { ExplorerButton } from "../ExplorerButton";
import { Photo } from "../Photo";
import { Spinner } from "../Spinner";
import { GalleryMintButton } from "./GalleryMintButton";
// import { useEditionInfo } from "../useEditionInfo";
import { MintState } from "./mintState";

interface EditionInfo {
  isConnected: boolean;
  photo: Photo;
  originalId: number;
  mintState: MintState;
  userWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

const renderMintButton = (
  photo: Photo,
  userWalletAddress: string | undefined,
  // nextAvailableEditionId: number,
  onMintSuccess: (owner: string, tx: string) => void
) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <h5 className="text-xl">Edition Price</h5>
        <h4 className="text-3xl">0.05 ETH</h4>
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
      {/* {nextAvailableEditionId > 0 && (
        <div>
          If you minted now, you would receive token #{nextAvailableEditionId}
        </div>
      )} */}
    </div>
  );
};

const renderOwned = (photo: Photo) => {
  return (
    <>
      <p>Not available</p>
      <div className="mb-[2vh] flex flex-row">
        <div className="basis-1/3 mr-4">
          <OpenSeaButton tokenId={photo.id} />
        </div>
        <div className="basis-1/3 mr-4">
          <LooksRareButton tokenId={photo.id} />
        </div>
        <div className="basis-1/3">
          <ExplorerButton tokenId={photo.id} />
        </div>
      </div>
    </>
  );
};

export const GalleryDetailEditionInfo = ({
  photo,
  originalId,
  mintState,
  userWalletAddress,
  onMintSuccess,
}: EditionInfo) => {
  // const [nextAvailableEditionId, setNextAvailableEditionId] = useState(0);
  // const [editionSoldOut, setEditionSoldOut] = useState(false);

  return (
    <div className="p-4">
      <div className="rounded-md border-2 p-4 border-slate-900 bg-slate-700 mb-4">
        {mintState == MintState.Unknown && (
          <div className="pt-8">
            <Spinner />
          </div>
        )}

        {/* Editions are sold out */}
        {mintState === MintState.GenericEditionSoldOut && renderOwned(photo)}

        {/* Editions are NOT sold out */}
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
        An altered reality forever wandering on the Ethereum blockchain. This
        edition is an on-chain SVG version of {photo.name}. Its has 256 colors
        and is a 64x64 pixel representation of the original 1-of-1 artwork. The
        metadata and SVG are immutable, conform to the ERC-721 standard, and
        exist entirely on the Ethereum blockchain.
      </p>

      <h4 className="text-xl mb-4 font-bold">Details</h4>
      <div className="my-[2vh] grid grid-cols-2">
        <div className="mb-4">
          <h6 className="uppercase">Token Ids</h6>
          <div className="text-lg font-bold">
            {`${photo.getEditionIdStart()} - ${photo.getEditionIdEnd()}`}
          </div>
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
          <h6 className="uppercase">Edition</h6>
          <div className="text-lg font-bold">
            {/* {photo.getEditionIndex(nextAvailableEditionId || 0)}{" "} */}
            of 50
          </div>
        </div>

        <div className="mb-4">
          <h6 className="uppercase">Original</h6>
          <div className="text-lg font-bold">{originalId}</div>
        </div>
      </div>
    </div>
  );
};
