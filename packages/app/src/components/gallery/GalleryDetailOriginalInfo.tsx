import { theHydraContract } from "../../contracts";
import { Address } from "../Address";
import { Photo } from "../Photo";

interface OriginalInfo {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

export const GalleryDetailOriginalInfo = ({ photo }: OriginalInfo) => {
  return (
    <div className="lg:pl-4 lg:basis-1/2">
      <h4 className="text-2xl font-bold leading-relaxed">Attributes</h4>
      <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
        <h6 className="uppercase">Type</h6>
        <div className="text-lg font-bold">Original</div>

        <h6 className="uppercase">Chakra</h6>
        <div className="text-lg font-bold">{photo.attributes["Chakra"]}</div>

        <h6 className="uppercase">Season</h6>
        <div className="text-lg font-bold">{photo.attributes["Season"]}</div>
      </div>

      <h4 className="text-2xl font-bold leading-relaxed">Details</h4>
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
  );
};
