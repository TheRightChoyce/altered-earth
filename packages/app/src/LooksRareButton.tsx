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
    <a
      key={tokenId}
      href={`${getLRUri()}/collections/${theHydraContract.address}/${tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-200 border-2 border-slate-800 hover:border-sky-400 py-2 px-2 leading-none bg-slate-600 block w-full text-center"
    >
      View on
      <br />
      LooksRare
    </a>
  );
};
