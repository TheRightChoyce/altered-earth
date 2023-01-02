import Link from "next/link";

export const ExplorerButton = ({ tokenId }: { tokenId: number }) => {
  return (
    <div className="rounded-md transition w-full bg-pink-600 hover:bg-pink-500 active:bg-pink-400 disabled:bg-slate-400 px-6 py-3 text-md text-center">
      <Link href={`/the-hydra/explorer/${tokenId}`}>
        <a key={tokenId}>On-chain Explorer</a>
      </Link>
    </div>
  );
};
