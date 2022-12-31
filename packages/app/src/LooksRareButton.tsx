import { theHydraContract } from "./contracts";

export const LooksRareButton = ({ tokenId }: { tokenId: number }) => {
  const getLRUri = () => {
    if (process.env.NEXT_PUBLIC_CHAIN_ID === "1") {
      return "https://looksrare.org";
    } else {
      return `https://${process.env.NEXT_PUBLIC_CHAIN_NAME?.toLowerCase()}.looksrare.org`;
    }
  };

  return (
    <div className="rounded-md transition w-full bg-pink-600 hover:bg-pink-500 active:bg-pink-400 disabled:bg-slate-400 px-6 py-3 text-md text-center">
      <a
        key={tokenId}
        href={`${getLRUri()}/collections/${
          theHydraContract.address
        }/${tokenId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LooksRare
      </a>
    </div>
  );
};
