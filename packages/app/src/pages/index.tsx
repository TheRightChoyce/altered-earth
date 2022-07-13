import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import Landing from "../layout/landing";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { address, isReconnecting, isDisconnected } = useAccount();
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );

  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
  }, [address, isReconnecting, isDisconnected]);

  return (
    <>
      <div className="px-2 mt-[5vh] mb-[5vh] text-center">
        <div className="w-[80vw] md:w-[70vw] mx-auto">
          <Link href="/">
            <a>
              <Image
                src="/altered-earth.svg"
                width={1500}
                height={155}
                alt="Altered Earth"
              />
            </a>
          </Link>
          <h2 className="text-lg md:text-xl lg:text-3xl mt-[2vh]">
            Exploring the earth in unseen ways
          </h2>
        </div>
      </div>

      <div className={`${imageClass} mx-auto`}>
        <div className="relative mb-16">
          <Link href="/the-hydra">
            <a>
              <Image
                src="/the-hydra/hydra-hero.png"
                alt="The Hydra Collection"
                layout="intrinsic"
                width={1443}
                height={658}
              />
            </a>
          </Link>

          <h2 className="invisible md:visible text-4xl uppercase absolute right-16 bottom-16 backdrop-blur-sm hover:underline">
            <Link href="/the-hydra">
              <a>The Hydra</a>
            </Link>
          </h2>
          <h2 className="visible md:invisible text-xl uppercase hover:underline text-center">
            <Link href="/the-hydra">
              <a>The Hydra</a>
            </Link>
          </h2>
        </div>

        <div className="relative">
          <Image
            src="/crystalixed/crystalixed-hero.png"
            alt="CRYSTALIXED"
            width={1443}
            height={658}
          />
          <h2 className="invisible md:visible text-4xl uppercase absolute right-16 bottom-16 backdrop-blur-sm">
            CRYSTALIXED - Coming soon
          </h2>
          <h2 className="visible md:invisible text-xl uppercase text-center">
            CRYSTALIXED - Comming soon
          </h2>
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Landing>{page}</Landing>;
};

export default HomePage;
