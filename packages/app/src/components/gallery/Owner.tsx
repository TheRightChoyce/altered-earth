import { OwnerName } from "../OwnerName";

interface IOwner {
  owner: string | undefined;
}

export const Owner = ({ owner }: IOwner) => {
  return (
    <div className="flex flex-row items-center content-center justify-center">
      <div className="text-3xl font-extralight">Owner:</div>
      <div className="ml-4">
        <div className="flex flex-row items-center text-3xl font-extralight">
          <span className="rounded-full bg-rose-600 h-8 w-8 inline-block mr-2"></span>
          <span className="underline underline-offset-8">
            <OwnerName address={owner || "Unknown"} />
          </span>
        </div>
      </div>
    </div>
  );
};
