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

      <h6 className="mb-32">Exploring the earth in unseen ways</h6>

      <div>
        <Link href="/the-hydra">
          <Image
            src="/the-hydra/hydra-hero.png"
            alt="The Hydra Collection"
            width={1300}
            height={512}
            className="cursor-pointer"
          />
        </Link>
      </div>

      <h2 className="text-3xl uppercase">
        <Link href="/the-hydra">The Hydra Collection</Link>
      </h2>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
