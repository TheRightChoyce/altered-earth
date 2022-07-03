import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { useTheHydraContractRead } from "../../contracts";
import { Gallery } from "../../Gallery";
import { useIsMounted } from "../../useIsMounted";
import { theHydraCollection } from "./data";

const TheHydraPage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
        <h1 className="text-4xl">THE HYDRA COLLECTION</h1>
        <h6>
          The hydra exists where the river meets the woods. The journey is
          forever changing, but The Hydra is always the destination. A tree that
          holds anchor as everything around it is in motion. The Hydra
          Collection explores this Earth tree through the lens of deep textures
          and wonderful colors. Each photo represents a small portion of The
          Hydra, starting with its majestic heads and working across each
          intricate skin texture and tone.
        </h6>

        <Gallery collection={theHydraCollection} />

        {/* <p>
          {(isMounted ? totalSupply.data?.toNumber().toLocaleString() : null) ??
            "??"}
          /{(isMounted ? maxSupply.data : null) ?? "??"} minted
        </p> */}

        {/* <MintButton />
        <Inventory /> */}
      </div>
    </div>
  );
};

export default TheHydraPage;
