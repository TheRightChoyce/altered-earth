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
        <h5 className="text-xl">Edition Price</h5>
        <h4 className="text-3xl">0.05 ETH</h4>
      </div>
      <div className="w-full">
        <GalleryMintButton
          photo={photo}
          address={connectedWalletAddress}
          isOriginal={false}
          onSuccess={onMintSuccess}
          isCorrectNetwork={true}
        />
      </div>
    </div>
  );
};

const renderSoldOut = (photo: Photo) => {
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

const renderSpinner = () => {
  return (
    <div className="pt-8">
      <Spinner />
    </div>
  );
};

const mintStateReducer = (
  tokenLoaded: boolean,
  connectedWalletAddress: string | undefined,
  editionSoldOut: boolean | undefined
) => {
  if (!tokenLoaded) {
    return MintState.Unknown;
  } else if (!connectedWalletAddress) {
    return MintState.NotConnected;
  } else if (editionSoldOut === true) {
    return MintState.GenericEditionSoldOut;
  } else if (editionSoldOut === false) {
    return MintState.GenericEditionAvailable;
  }

  return MintState.Unknown;
};

const mintComponentReducer = (
  mintState: MintState,
  photo: Photo,
  connectedWalletAddress: string | undefined,
  onMintSuccess: (owner: string, tx: string) => void
) => {
  switch (mintState) {
    case MintState.Unknown:
      return renderSpinner();
    case MintState.GenericEditionSoldOut:
      return renderSoldOut(photo);
    case MintState.GenericEditionAvailable:
    case MintState.NotConnected:
      return renderMintButton(photo, connectedWalletAddress, onMintSuccess);
    default:
      return renderSpinner();
  }
};

export const GalleryDetailEditionInfo = ({
  photo,
  originalId,
  connectedWalletAddress,
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
    setMintState(
      mintStateReducer(
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
    <div className="">
      <div className="rounded-md border-2 p-4 border-slate-900 bg-slate-700 mb-8">
        {mintComponentReducer(
          mintState,
          photo,
          connectedWalletAddress,
          onMintSuccess
        )}
      </div>

      {editionInfo && editionInfo?.nextId > 0 && (
        <>
          <h4 className="text-2xl mb-4 font-bold">Edition Status</h4>
          <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
            <h6 className="uppercase">Minted</h6>
            <div className="text-lg">
              <b>{editionInfo?.minted}</b> of <b>45</b>
            </div>

            <h6 className="uppercase">Gifted</h6>
            <div className="text-lg">
              <b>{editionInfo?.gifted}</b> of <b>5</b>
            </div>

            <h6 className="uppercase">Status</h6>
            <div className="text-lg font-bold">
              {editionInfo?.soldOut ? "Sold out" : "Available"}
            </div>

            {!editionInfo?.soldOut && (
              <>
                <h6 className="uppercase">Next edition id</h6>
                <div className="text-lg font-bold">{editionInfo?.nextId}</div>
              </>
            )}
          </div>
        </>
      )}

      <h4 className="text-2xl mb-4 font-bold">Description</h4>
      <p className="mb-8">
        An altered reality forever wandering on the Ethereum blockchain. This
        edition is an on-chain SVG version of {photo.name}. Its has 256 colors
        and is a 64x64 pixel representation of the original 1-of-1 artwork. The
        metadata and SVG are immutable, conform to the ERC-721 standard, and
        exist entirely on the Ethereum blockchain.
      </p>

      <h4 className="text-2xl mb-4 font-bold">Attributes</h4>
      <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
        <h6 className="uppercase">Type</h6>
        <div className="text-lg font-bold">Edition</div>
      </div>

      <h4 className="text-2xl mb-4 font-bold">Details</h4>
      <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
        <h6 className="uppercase">Token Ids</h6>
        <div className="text-lg font-bold">
          {`${photo.getEditionIdStart()} - ${photo.getEditionIdEnd()}`}
        </div>

        <h6 className="uppercase">Edition</h6>
        <div className="text-lg font-bold">
          {photo.getEditionIndex(editionInfo?.nextId || 1)} of 50
        </div>

        <h6 className="uppercase">Original Id</h6>
        <div className="text-lg font-bold">{originalId}</div>

        <h6 className="uppercase">Contract</h6>
        <div className="text-lg font-bold">
          <a
            href={`https://${process.env.NEXT_PUBLIC_CHAIN_NAME?.toLowerCase()}.etherscan.io/address/${
              theHydraContract.address
            }`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {Address(theHydraContract.address)}
          </a>
        </div>

        <h6 className="uppercase">Medium</h6>
        <div className="text-lg font-bold">on-chain (XQSTGFX)</div>

        <h6 className="uppercase">Dimensions</h6>
        <div className="text-lg font-bold">256 x 256</div>

        <h6 className="uppercase">Token Standard</h6>
        <div className="text-lg font-bold">ERC-721</div>

        <h6 className="uppercase">Blockchain</h6>
        <div className="text-lg font-bold">Ethereum</div>

        <h6 className="uppercase">Metadata</h6>
        <div className="text-lg font-bold">On-Chain</div>

        <h6 className="uppercase">Royalties</h6>
        <div className="text-lg font-bold">7.5%</div>
      </div>
    </div>
  );
};
