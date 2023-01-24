import { OwnerName } from "../OwnerName";

interface IOwner {
  owner: string | undefined;
}

export const Owner = ({ owner }: IOwner) => {
  return (
    <div className="flex flex-row items-center content-center justify-center h-12">
      <div className="text-md lg:text-2xl font-extralight">Owner:</div>
      <div className="ml-4">
        <div className="flex flex-row items-center text-md lg:text-2xl font-extralight">
          <span className="rounded-full bg-rose-600 h-6 w-6 lg:h-8 lg:w-8 inline-block mr-2"></span>
          <span className="border-b-2 border-slate-700 text-md lg:text-3xl font-extralight">
            <OwnerName address={owner || "Unknown"} />
          </span>
        </div>
      </div>
    </div>
  );
};
