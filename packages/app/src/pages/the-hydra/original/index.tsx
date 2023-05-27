import type { ReactElement } from "react";

import { Gallery } from "../../../components/gallery/Gallery";
import { TokenType } from "../../../components/gallery/tokenType";
import { theHydraCollection } from "../../../data/the-hydra";
import Layout from "../../../layout/GalleryLayout";
import type { NextPageWithLayout } from "../../_app";

const TheHydraPage: NextPageWithLayout = () => {
  return (
    <Gallery collection={theHydraCollection} tokenType={TokenType.Original} />
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
