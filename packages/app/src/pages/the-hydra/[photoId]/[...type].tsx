import { NextRouter, useRouter } from "next/router";
import type { ReactElement } from "react";

import { GalleryDetail } from "../../../components/gallery/GalleryDetail";
import { TokenType } from "../../../components/gallery/tokenType";
import { theHydraCollection } from "../../../data/the-hydra";
import Layout from "../../../layout/GalleryLayout";
import { useIsMounted } from "../../../useIsMounted";
import type { NextPageWithLayout } from "../../_app";

const getTokenTypeFromRouter = (router: NextRouter) => {
  if (!router.query.type || router.query.type.length === 0) {
    return TokenType.Original;
  }

  if ((router.query.type[0] as string).toLowerCase() === "edition") {
    return TokenType.Edition;
  }
  return TokenType.Original;
};

const getPhotoIdFromRouter = (router: NextRouter) => {
  if (!router.query.photoId) {
    throw new Error("No photoId");
  }
  if (isNaN(parseInt(router.query.photoId as string, 10))) {
    throw new Error("Invalid photoId");
  }

  return parseInt(router.query.photoId as string, 10);
};

const TheHydraDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const isMounted = useIsMounted();

  // Ensure the router is giving us a photoId.. sometimes it gets delayed!
  if (!isMounted) {
    return null;
  }

  try {
    return (
      <>
        <GalleryDetail
          collection={theHydraCollection}
          photoId={getPhotoIdFromRouter(router)}
          tokenType={getTokenTypeFromRouter(router)}
        />
      </>
    );
  } catch (e) {
    return null;
  }
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
