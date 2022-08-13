import { theHydraContract } from "./contracts";

export const OpenSeaButton = ({ tokenId }: { tokenId: number }) => {
  const openSeaUrl = () => {
    if (process.env.NEXT_PUBLIC_CHAIN_ID === "1") {
      return "https://opensea.io";
    } else {
      return "https://testnets.opensea.io";
    }
  };
  const openSeaCollectionUri = () => {
    return theHydraContract.address;
  };
  const networkName = () => {
    return process.env.NEXT_PUBLIC_CHAIN_NAME?.toLowerCase();
  };
  return (
    <a
      key={tokenId}
      href={`${openSeaUrl()}/assets/${networkName()}/${openSeaCollectionUri()}/${tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-200 border-2 border-slate-800 hover:border-sky-400 py-2 px-2 leading-none bg-slate-600 block w-full text-center"
    >
      View on
      <br />
      OpenSea
    </a>
  );
};
