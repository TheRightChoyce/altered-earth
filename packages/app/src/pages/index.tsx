import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { SideBar } from "../components/SideBar";
import Layout from "../layout/GalleryLayout";
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
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar -- none */}
      <SideBar />

      {/* content */}
      <div className="w-[100vw] lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        <div className="px-2 mt-[5vh] mb-[10vh] text-center lg:text-left">
          <div className="w-[100vw] md:w-[70vw] mx-auto lg:mx-0">
            <h1 className="text-5xl leading-relaxed lg:text-7xl lg:mb-2 custom-major-mono">
              Altered eArth
            </h1>
            <h2 className="text-lg md:text-xl lg:text-3xl">
              Exploring the earth in unseen ways
            </h2>
          </div>
        </div>
        <div
          className={`${imageClass} mx-auto lg:mx-0 text-center lg:text-left`}
        >
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
