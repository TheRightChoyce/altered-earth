import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { NavBar } from "../components/NavBar";
import Layout from "../layout/GalleryLayout";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  const { address, isReconnecting, isDisconnected } = useAccount();
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:basis-36">
        <NavBar />
      </div>

      {/* content */}
      <div className="flex flex-col">
        <div className="text-center lg:text-left px-4 lg:pl-8 lg:pr-24">
          <h1 className="text-5xl leading-relaxed lg:text-7xl lg:mb-2 custom-major-mono">
            Altered eArth
          </h1>
          <h2 className="text-lg md:text-xl lg:text-3xl">
            Exploring the earth in unseen ways
          </h2>
        </div>

        <div className="px-4 lg:pl-8 lg:pr-24">
          <div className="mb-16">
            <Link href="/the-hydra">
              <a>
                <h2 className="text-2xl lg:text-4xl custom-major-mono mb-4">
                  the HydrA
                </h2>
              </a>
            </Link>
            <Link href="/the-hydra">
              <a>
                <Image
                  src="/the-hydra/hydra-hero.png"
                  alt="The Hydra Collection"
                  layout="intrinsic"
                  width={1443}
                  height={658}
                  sizes={"100vw"}
                />
              </a>
            </Link>
          </div>

          {/* <div className="mb-16">
            <h2 className="text-2xl lg:text-4xl custom-major-mono mb-4">
              crystAliZed <small>(coming soon)</small>
            </h2>
            <Image
              src="/crystalixed/crystalixed-hero.png"
              alt="CRYSTALIXED"
              width={1443}
              height={658}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
