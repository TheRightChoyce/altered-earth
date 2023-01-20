import Link from "next/link";
import { useEffect, useState } from "react";

import { theHydraContract } from "../../contracts";
import { LooksRareButton } from "../../LooksRareButton";
import { OpenSeaButton } from "../../OpenSeaButton";
import { Address } from "../Address";
import { OwnerName } from "../OwnerName";
import { Photo } from "../Photo";
import { Spinner } from "../Spinner";
import { GalleryMintButton } from "./GalleryMintButton";
import { MintComponent } from "./MintComponent";
import { MintState } from "./mintState";
import { mintStateReducer } from "./MintStateReducerOriginal";
import { Owner } from "./Owner";

interface OriginalInfo {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

const renderSpinner = () => {
  return (
    <div className="pt-8">
      <Spinner />
    </div>
  );
};

const mintComponentReducer = (
  mintState: MintState,
  photo: Photo,
  owner: string | undefined,
  connectedWalletAddress: string | undefined,
  onMintSuccess: (owner: string, tx: string) => void
) => {
  switch (mintState) {
    case MintState.Unknown:
      return renderSpinner();
    case MintState.OriginalOwned:
      return <Owner owner={owner} />;
    case MintState.OriginalAvailable:
    case MintState.NotConnected:
      return (
        <MintComponent
          photo={photo}
          connectedWalletAddress={connectedWalletAddress}
          onMintSuccess={onMintSuccess}
        />
      );
    default:
      return renderSpinner();
  }
};

export const GalleryDetailOriginalInfo = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
}: OriginalInfo) => {
  // Token specific info
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [tokenLoaded, setTokenLoaded] = useState(true);
  const [owner, setOwner] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMintState(mintStateReducer(tokenLoaded, owner, connectedWalletAddress));
  }, [owner, connectedWalletAddress, tokenLoaded]);

  // Use and watch the owner of this token
  photo?.getOwnerFromContract(
    setOwner,
    setTokenLoaded,
    mintState !== MintState.NotConnected
  );

  return (
    <>
      <div className="mb-8 lg:basis-1/2">
        {mintComponentReducer(
          mintState,
          photo,
          owner,
          connectedWalletAddress,
          onMintSuccess
        )}
      </div>

      <div className="bg-slate-800 px-4 py-8">
        <div className="lg:basis-1/2">
          <h4 className="text-2xl mb-4 font-bold">Description</h4>
          <p className="mb-8">
            An altered reality forever wandering the Ethereum blockchain. This
            is an original 1-of-1 artwork that comes with a high-res immutable
            image stored on IPFS. Each token conforms to the ERC-721 standard.
          </p>
        </div>

        <h4 className="text-2xl mb-4 font-bold">Attributes</h4>
        <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
          <h6 className="uppercase">Type</h6>
          <div className="text-lg font-bold">Original</div>

          <h6 className="uppercase">Chakra</h6>
          <div className="text-lg font-bold">{photo.attributes["Chakra"]}</div>

          <h6 className="uppercase">Season</h6>
          <div className="text-lg font-bold">{photo.attributes["Season"]}</div>
        </div>

        <h4 className="text-2xl mb-4 font-bold">Details</h4>
        <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
          <h6 className="uppercase">Token Id</h6>
          <div className="text-lg font-bold">{photo.id}</div>

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
          <div className="text-lg font-bold">image (JPG)</div>

          <h6 className="uppercase">Dimensions</h6>
          <div className="text-lg font-bold">3024 x 4032</div>

          <h6 className="uppercase">Token Standard</h6>
          <div className="text-lg font-bold">ERC-721</div>

          <h6 className="uppercase">Blockchain</h6>
          <div className="text-lg font-bold">Ethereum</div>

          <h6 className="uppercase">Metadata</h6>
          <div className="text-lg font-bold">IPFS</div>

          <h6 className="uppercase">Royalties</h6>
          <div className="text-lg font-bold">7.5%</div>
        </div>
      </div>
    </>
  );
};
