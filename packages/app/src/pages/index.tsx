import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
        <h1 className="text-4xl">ALTERED EARTH</h1>
        <h6>Exploring the earth in unseen ways</h6>

        <h2 className="text-3xl">
          <Link href="./the-hydra">The Hydra Collection</Link>
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
