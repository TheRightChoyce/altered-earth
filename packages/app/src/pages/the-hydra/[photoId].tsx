import { useRouter } from "next/router";
import type { ReactElement } from "react";

import { GalleryDetail } from "../../components/GalleryDetail";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/GalleryLayout";
import { useIsMounted } from "../../useIsMounted";
import type { NextPageWithLayout } from "../_app";

const TheHydraDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const photoId = parseInt(router.query.photoId as string, 10);
  const isMounted = useIsMounted();

  // Ensure the router is giving us a photoId.. sometimes it gets delayed!
  if (!isMounted) {
    return null;
  }

  if (isNaN(photoId)) {
    return null;
  }

  return (
    <>
      <GalleryDetail collection={theHydraCollection} photoId={photoId} />
    </>
  );
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
