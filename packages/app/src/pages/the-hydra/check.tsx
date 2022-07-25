import type { ReactElement } from "react";

import { Gallery } from "../../components/Gallery";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/GalleryLayout";
import type { NextPageWithLayout } from "../_app";

const CheckPage: NextPageWithLayout = () => {
  return (
    <>
      <div></div>
    </>
  );
};

CheckPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CheckPage;
