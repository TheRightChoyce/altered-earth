import { theHydraContract } from "./contracts";

export const LooksRareButton = ({ tokenId }: { tokenId: number }) => {
  return (
    <a
      key={tokenId}
      href={`https://goerli.looksrare.org/collections/${theHydraContract.address}/${tokenId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-200 border-2 border-slate-800 hover:border-sky-400 py-2 px-8 leading-none rounded-md bg-slate-600"
    >
      View on LooksRare
    </a>
  );
};
