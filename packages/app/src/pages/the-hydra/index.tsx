import Image from "next/image";
import type { ReactElement } from "react";
import { useAccount } from "wagmi";

import { Gallery } from "../../components/Gallery";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/layout";
import type { NextPageWithLayout } from "../_app";

const TheHydraPage: NextPageWithLayout = () => {
  // const isMounted = useIsMounted();
  const { address } = useAccount();

  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase text-center mb-8">
        The Hydra Collection
      </h1>
      <div
        className={`${
          address ? "grayscale-0" : "grayscale"
        } transition-all ease-in-out duration-5000`}
      >
        <div className="">
          {/* <Image
            src="/the-hydra/hydra-hero.png"
            alt="The Hydra Collection"
            width={1443}
            height={658}
          /> */}
        </div>
      </div>

      <div className="tracking-wide max-w-md md:max-w-xl lg:max-w-3xl text-xs md:text-sm mb-4 lg:mb-16">
        <p className="mb-8 m-auto">
          The Hydra exists where the river meets the woods. The journey is
          forever changing, but The Hydra is always the destination. A tree that
          holds anchor as everything around it is in motion.
        </p>
        <p className="mb-8 max-w-3xl m-auto">
          The Hydra Collection explores this Earth tree through the lens of deep
          textures and wonderful colors. Each photo represents a small portion
          of The Hydra, starting with its majestic heads and working across each
          intricate skin texture and tone.
        </p>
      </div>

      <Gallery collection={theHydraCollection} address={address} />
    </>
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
