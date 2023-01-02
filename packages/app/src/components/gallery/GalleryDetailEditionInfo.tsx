import { useEffect, useState } from "react";

import { theHydraContract } from "../../contracts";
import { LooksRareButton } from "../../LooksRareButton";
import { OpenSeaButton } from "../../OpenSeaButton";
import { Address } from "../Address";
import { EditionInfoFromContract, Photo } from "../Photo";
import { Spinner } from "../Spinner";
import { GalleryMintButton } from "./GalleryMintButton";
import { MintState } from "./mintState";

interface EditionInfo {
  photo: Photo;
  originalId: number;
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
    </div>
  );
};

const renderOwned = (photo: Photo) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="mb-2">
          <h5 className="text-xl">Edition Sold Out</h5>
          <h4 className="text-3xl line-through">0.05 ETH</h4>
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
    </>
  );
};

const mintStateReducer = (
  tokenLoaded: boolean,
  editionSoldOut: boolean | undefined
) => {
  if (!tokenLoaded) {
    return MintState.Unknown;
  } else if (editionSoldOut === true) {
    return MintState.GenericEditionSoldOut;
  } else if (editionSoldOut === false) {
    return MintState.GenericEditionAvailable;
  }

  return MintState.Unknown;
};

export const GalleryDetailEditionInfo = ({
  photo,
  originalId,
  userWalletAddress,
  onMintSuccess,
}: EditionInfo) => {
  // Token specific info
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [editionInfo, setEditionInfo] = useState<
    EditionInfoFromContract | undefined
  >(undefined);

  // State machine for our mint state of this edition
  useEffect(() => {
    setMintState(mintStateReducer(tokenLoaded, editionInfo?.soldOut));
  }, [tokenLoaded, editionInfo]);

  // Get the info about this ediion
  photo?.getEditionInfo(originalId, setTokenLoaded, setEditionInfo);

  return (
    <div className="">
      <div className="rounded-md border-2 p-4 border-slate-900 bg-slate-700 mb-4">
        {mintState == MintState.Unknown && (
          <div className="py-8">
            <Spinner />
          </div>
        )}

        {/* Editions are sold out */}
        {mintState === MintState.GenericEditionSoldOut && renderOwned(photo)}

        {/* Editions are NOT sold out */}
        {mintState === MintState.GenericEditionAvailable &&
          renderMintButton(photo, userWalletAddress, onMintSuccess)}
      </div>

      {editionInfo && editionInfo?.nextId > 0 && (
        <div className="mb-8">
          <h4 className="text-2xl mb-4 font-bold">Edition Status</h4>
          <div>
            <b>{editionInfo?.minted}</b> of <b>45</b> minted
          </div>
          <div>
            <b>{editionInfo?.gifted}</b> of <b>5</b> gifted
          </div>
          {!editionInfo?.soldOut && (
            <div>
              Next edition id: <b>{editionInfo?.nextId}</b>
            </div>
          )}
        </div>
      )}

      <h4 className="text-2xl mb-4 font-bold">Description</h4>
      <p className="mb-4">
        An altered reality forever wandering on the Ethereum blockchain. This
        edition is an on-chain SVG version of {photo.name}. Its has 256 colors
        and is a 64x64 pixel representation of the original 1-of-1 artwork. The
        metadata and SVG are immutable, conform to the ERC-721 standard, and
        exist entirely on the Ethereum blockchain.
      </p>

      <h4 className="text-2xl mb-4 font-bold">Details</h4>
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
          <h6 className="uppercase">Original Id</h6>
          <div className="text-lg font-bold">{originalId}</div>
        </div>
      </div>
    </div>
  );
};
