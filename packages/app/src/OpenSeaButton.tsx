import { theHydraContract } from "./contracts";

export const OpenSeaButton = ({ tokenId }: { tokenId: number }) => {
  return (
    <a
      key={tokenId}
      href={`https://testnets.opensea.io/goerli/${theHydraContract.address}/${tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-700 border-2 border-slate-200 hover:border-sky-400 p-2 leading-none rounded-md"
    >
      View on OpenSea
    </a>
  );
};
