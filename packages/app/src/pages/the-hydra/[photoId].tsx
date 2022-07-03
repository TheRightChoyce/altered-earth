import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { GalleryDetail } from "../../GalleryDetail";
import { useIsMounted } from "../../useIsMounted";

const TheHydraDetailPage: NextPage = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const photoId = parseInt(router.query.photoId as string, 10);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
        <GalleryDetail photoId={photoId} />
      </div>
    </div>
  );
};

export default TheHydraDetailPage;
