import { useRouter } from "next/router";
import type { ReactElement } from "react";

import { GalleryDetail } from "../../GalleryDetail";
import Layout from "../../layout/layout";
import { useIsMounted } from "../../useIsMounted";
import type { NextPageWithLayout } from "../_app";
import { theHydraCollection } from "./data";

const TheHydraDetailPage: NextPageWithLayout = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const photoId = parseInt(router.query.photoId as string, 10);

  return <GalleryDetail collection={theHydraCollection} photoId={photoId} />;
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
