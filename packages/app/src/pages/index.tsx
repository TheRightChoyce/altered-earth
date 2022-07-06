import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import Layout from "../layout/layout";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Image
        src="/altered-earth.svg"
        width={1500}
        height={155}
        alt="Altered Earth"
      />

      <h5 className="mb-32 text-lg">Exploring the earth in unseen ways</h5>

      <div className="relative mb-16">
        <Link href="/the-hydra">
          <a>
            <Image
              src="/the-hydra/hydra-hero.png"
              alt="The Hydra Collection"
              width={1443}
              height={658}
            />
          </a>
        </Link>

        <h2 className="invisible md:visible text-4xl uppercase absolute right-16 bottom-16 backdrop-blur-sm hover:underline">
          <Link href="/the-hydra">The Hydra Collection</Link>
        </h2>
        <h2 className="visible md:invisible text-xl uppercase hover:underline text-center">
          <Link href="/the-hydra">The Hydra Collection</Link>
        </h2>
      </div>

      <div className="relative">
        <Image
          src="/crystalixed/crystalixed-hero.png"
          alt="CRYSTALIXED"
          width={1443}
          height={658}
        />

        <h2 className="invisible md:visible text-4xl uppercase absolute right-16 bottom-16 backdrop-blur-sm hover:underline">
          CRYSTALIXED - Coming soon
        </h2>
        <h2 className="visible md:invisible text-xl uppercase hover:underline text-center">
          CRYSTALIXED - Comming soon
        </h2>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
