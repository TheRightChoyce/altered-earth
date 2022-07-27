import Link from "next/link";

export const ExplorerButton = ({ tokenId }: { tokenId: number }) => {
  return (
    <Link href={`/the-hydra/explorer/${tokenId}`}>
      <a
        key={tokenId}
        className="text-gray-200 border-2 border-slate-800 hover:border-sky-400 py-2 px-2 leading-none bg-slate-600 block w-full text-center"
      >
        On-chain
        <br />
        Explorer
      </a>
    </Link>
  );
};
