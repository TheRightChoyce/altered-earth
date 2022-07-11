import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { useAccount } from "wagmi";

import Layout from "../layout/layout";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="px-16 my-16">
        <Image
          src="/altered-earth.svg"
          width={1500}
          height={155}
          alt="Altered Earth"
        />
        <h5 className="text-lg text-center">
          Exploring the earth in unseen ways
        </h5>
      </div>

      <div
        className={`${
          address ? "grayscale-0" : "grayscale"
        } transition-colors ease-in-out duration-5000 max-w-screen-lg`}
      >
        <div className="relative mb-16">
          <Link href="/the-hydra">
            <a>
              <div className="cursor-pointer">
                <Image
                  src="/the-hydra/hydra-hero.png"
                  alt="The Hydra Collection"
                  layout="intrinsic"
                  width={1443}
                  height={658}
                />
              </div>
            </a>
          </Link>

          <h2 className="invisible md:visible text-4xl uppercase absolute right-16 bottom-16 backdrop-blur-sm hover:underline">
            <Link href="/the-hydra">
              <a>The Hydra Collection</a>
            </Link>
          </h2>
          <h2 className="visible md:invisible text-xl uppercase hover:underline text-center">
            <Link href="/the-hydra">
              <a>The Hydra Collection</a>
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
  return <Layout>{page}</Layout>;
};

export default HomePage;
