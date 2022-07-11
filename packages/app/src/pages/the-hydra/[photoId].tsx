import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

import { GalleryDetail } from "../../components/GalleryDetail";
import { theHydraCollection } from "../../data/the-hydra";
import Layout from "../../layout/layout";
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
      <Link href="/the-hydra">
        <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase text-center mb-8">
          <a>The Hydra Collection</a>
        </h1>
      </Link>
      <GalleryDetail collection={theHydraCollection} photoId={photoId} />
    </>
  );
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
