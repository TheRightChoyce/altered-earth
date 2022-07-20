import type { ReactElement } from "react";

import { Gallery } from "../../components/Gallery";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/GalleryLayout";
import type { NextPageWithLayout } from "../_app";

const TheHydraPage: NextPageWithLayout = () => {
  return (
    <>
      <Gallery
        collection={theHydraCollection}
        title={"the HydrA"}
        description="The Hydra exists where the river meets the woods.... The journey is
          forever changing and The Hydra is always the destination."
      />
    </>
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
