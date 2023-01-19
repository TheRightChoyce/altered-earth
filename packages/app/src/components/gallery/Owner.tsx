import { OwnerName } from "../OwnerName";

interface IOwner {
  owner: string | undefined;
}

export const Owner = ({ owner }: IOwner) => {
  return (
    <div className="mt-8 mb-12 flex flex-row items-center content-center justify-center">
      <div className="text-xl font-bold">Owner:</div>
      <div className="ml-4 rounded-lg bg-slate-900 px-4 py-1">
        <div className="flex flex-row items-center">
          <span className="rounded-full bg-pink-600 h-4 w-4 inline-block mr-2"></span>
          <OwnerName address={owner || "Unknown"} />
        </div>
      </div>
    </div>
  );
};
