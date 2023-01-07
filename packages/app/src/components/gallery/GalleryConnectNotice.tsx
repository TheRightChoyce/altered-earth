import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectNotice = () => {
  return (
    <div className="my-8 p-8 lg:mb-16 flex flex-col justify-center items-center w-100 bg-gray-700 m-auto">
      <div className="basis-1">
        <h4 className="text-xl lg:max-w-xl mb-8 text-center text-gray-200 uppercase">
          altered earth is best experienced in a dream state. please connect
          your wallet to dream
        </h4>
      </div>
      <div className="">
        <ConnectButton label="Connect wallet to dream" />
      </div>
    </div>
  );
};
