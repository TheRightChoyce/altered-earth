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
    <div className="rounded-md transition w-full bg-pink-600 hover:bg-pink-500 active:bg-pink-400 disabled:bg-slate-400 px-6 py-3 text-md text-center">
      <a
        key={tokenId}
        href={`${openSeaUrl()}/assets/${networkName()}/${openSeaCollectionUri()}/${tokenId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        OpenSea
      </a>
    </div>
  );
};
