import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

export const ConnectBar = () => {
  const { address } = useAccount();
  return (
    <div
      className={`${
        address ? "bg-slate-800" : "bg-pink-900"
      } transition-color ease-in-out duration-1000 py-[2vh] flex flex-cols justify-between align-middle`}
    >
      <div className="pl-6 mt-1">
        <Link href="/">
          <a>
            <Image src="/ae.svg" width={41} height={29} alt="Altered Earth" />
          </a>
        </Link>
      </div>
      <div className="pr-6">
        <ConnectButton
          label="Enter Dream State"
          accountStatus="full"
          chainStatus="icon"
          showBalance={true}
        />
      </div>
    </div>
  );
};
