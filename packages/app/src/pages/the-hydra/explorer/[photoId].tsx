import { useRouter } from "next/router";
import { ReactElement } from "react";

import { GalleryBreadcrumbs } from "../../../components/GalleryBreadcrumbs";
import { OnChainExplorer } from "../../../components/OnChainExplorer";
import { SideBar, TheHydraButton } from "../../../components/SideBar";
import Layout from "../../../layout/GalleryLayout";
import type { NextPageWithLayout } from "../../_app";

const TheHydraDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const photoId = parseInt(router.query.photoId as string, 10);

  // Ensure the router is giving us a photoId.. sometimes it gets delayed!
  if (isNaN(photoId)) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar */}
      <SideBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
      </SideBar>

      <div className="flex flex-col-reverse lg:flex-row w-[100vw] lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        {/* left / bottom -- info */}
        <div className="col-span-1 flex-auto basis-1/2 pr-8">
          {/* breadcrumbs + arrow navigation */}
          <GalleryBreadcrumbs
            breadcrumb={"on-chain explorer"}
            photoId={photoId}
          />

          {/* Token Information */}
          <div className="w-10/12 m-auto lg:m-0">
            <div className="my-[2vh]">
              <h2 className="text-2xl lg:text-5xl mb-8">On-chain Explorer</h2>
              <div className="text-md lg:text-lg">
                <p className="mb-4">
                  Here you can easily explore any of the on-chain editions to
                  see what exactly is stored on chain. This works by calling the
                  `tokenURI` function on the contract and interpreting the
                  results in a human readable format.
                </p>
              </div>
            </div>
            <hr className="my-8" />

            <OnChainExplorer photoId={photoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
