import type { ReactElement } from "react";

import { Gallery } from "../../components/Gallery";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/GalleryLayout";
import type { NextPageWithLayout } from "../_app";

const TheHydraPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-6xl leading-relaxed lg:text-8xl uppercase text-center mt-8 lg:mt-16 lg:mb-8">
        The Hydra
      </h1>

      <div className="container mb-4 px-8 text-center tracking-wide text-md lg:text-xl">
        <p>
          The Hydra exists where the river meets the woods.... The journey is
          forever changing and The Hydra is always the destination.
        </p>
      </div>

      <Gallery collection={theHydraCollection} />
    </>
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
