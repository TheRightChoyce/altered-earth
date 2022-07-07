import Image from "next/image";
import type { ReactElement } from "react";
import { useAccount } from "wagmi";

import { Gallery } from "../../components/Gallery";
import Layout from "../../layout/layout";
import type { NextPageWithLayout } from "../_app";
import { theHydraCollection } from "./data";

const TheHydraPage: NextPageWithLayout = () => {
  // const isMounted = useIsMounted();
  const { address } = useAccount();

  return (
    <>
      <div
        className={`${
          address ? "grayscale-0" : "grayscale"
        } transition-all ease-in-out duration-5000`}
      >
        <Image
          src="/the-hydra/hydra-hero.png"
          alt="The Hydra Collection"
          width={1443}
          height={658}
        />
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase text-center mb-8">
        The Hydra Collection
      </h1>

      <h6 className="mb-16 tracking-wide">
        <p className="mb-8">
          The Hydra exists where the river meets the woods. The journey is
          forever changing, but The Hydra is always the destination. A tree that
          holds anchor as everything around it is in motion.
        </p>
        <p>
          The Hydra Collection explores this Earth tree through the lens of deep
          textures and wonderful colors. Each photo represents a small portion
          of The Hydra, starting with its majestic heads and working across each
          intricate skin texture and tone.
        </p>
      </h6>

      <Gallery collection={theHydraCollection} address={address} />
    </>
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
