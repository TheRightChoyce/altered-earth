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
      <h6>Exploring the earth in unseen ways</h6>

      <h2 className="text-3xl">
        <Link href="/the-hydra">The Hydra Collection</Link>
      </h2>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
