import { theHydraContract } from "../../contracts";
import { Address } from "../Address";
import { EditionInfoFromContract, Photo } from "../Photo";

interface IEditionInfo {
  photo: Photo;
  originalId: number;
  editionInfo: EditionInfoFromContract | undefined;
}

export const GalleryDetailEditionInfo = ({
  photo,
  originalId,
  editionInfo,
}: IEditionInfo) => {
  return (
    <div className="lg:pl-4 lg:basis-1/2">
      <h4 className="text-2xl font-bold leading-relaxed">Attributes</h4>
      <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
        <h6 className="uppercase">Type</h6>
        <div className="text-lg font-bold">Edition</div>
      </div>

      {editionInfo && editionInfo?.nextId > 0 && (
        <>
          <h4 className="text-2xl font-bold leading-relaxed">Edition Status</h4>
          <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
            <h6 className="uppercase">Edition Of</h6>
            <div className="text-lg">
              <b>{photo.name}</b>
            </div>
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

      <h4 className="text-2xl font-bold leading-relaxed">Details</h4>
      <div className="grid grid-cols-2 gap-y-0 mb-8 lg:grid-cols-4">
        <h6 className="uppercase">Token Ids</h6>
        <div className="text-lg font-bold">
          {`${photo.getEditionIdStart()} - ${photo.getEditionIdEnd()}`}
        </div>

        <h6 className="uppercase">Edition Id</h6>
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
