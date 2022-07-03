import Image from "next/image";
import type { ReactElement } from "react";

import { useTheHydraContractRead } from "../../contracts";
import { Gallery } from "../../Gallery";
import Layout from "../../layout/layout";
import { useIsMounted } from "../../useIsMounted";
import type { NextPageWithLayout } from "../_app";
import { theHydraCollection } from "./data";

const TheHydraPage: NextPageWithLayout = () => {
  const isMounted = useIsMounted();

  return (
    <>
      <Image
        src="/altered-earth.svg"
        width={1500}
        height={155}
        alt="Altered Earth"
      />
      <h1 className="text-4xl">THE HYDRA COLLECTION</h1>
      <h6>
        The hydra exists where the river meets the woods. The journey is forever
        changing, but The Hydra is always the destination. A tree that holds
        anchor as everything around it is in motion. The Hydra Collection
        explores this Earth tree through the lens of deep textures and wonderful
        colors. Each photo represents a small portion of The Hydra, starting
        with its majestic heads and working across each intricate skin texture
        and tone.
      </h6>

      <Gallery collection={theHydraCollection} />
    </>
  );
};

TheHydraPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraPage;
