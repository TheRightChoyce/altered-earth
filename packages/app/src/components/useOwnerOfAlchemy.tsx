import { Alchemy } from "alchemy-sdk";
import { BigNumberish } from "ethers";
import { useEffect, useState } from "react";

import NFTContract from "../contractAddress";

export function useOwnerOf(
  alchemy: Alchemy,
  tokenId: number | BigNumberish | undefined,
  enabled: boolean,
  setTokenLoaded: (isLoaded: boolean) => void,
  setOwner: (owner: string | undefined) => void
) {
  let ownerAddress: string | undefined;
  
  if (!tokenId) {
    setTokenLoaded(false);
    setOwner(undefined);
  }
  
  // const [lastFetch, setLastFetch] = useState(new Date());
  // if (new Date().getTime() - lastFetch.getTime() > 10000) {
  //   console.log("enough time as passed, checking for token owner");
  //   setLastFetch(new Date());
  //   alchemy.nft
  //     .getOwnersForNft(NFTContract.deployedTo, tokenId || 0)
  //     .then((result) => {
  //       console.log(result);
  //       setOwner(result.owners[0]);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setOwner(undefined);
  //     })
  //     .finally(() => {
  //       setTokenLoaded(true);
  //       setLastFetch(new Date());
  //     });
  // }
  // const { data } = useTheHydraContractRead({
  //   functionName: "ownerOf",
  //   args: photoId?.toString(),
  //   watch: true,
  //   enabled: enabled,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onError(error: any) {
  //     setTokenLoaded(true);
  //     if (error.reason === "NOT_MINTED") {
  //       setOwner(undefined);
  //     } else {
  //       throw error;
  //     }
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onSettled(data, error: any) {
  //     setTokenLoaded(true);
  //     if (!error) {
  //       setOwner(data?.toString());
  //       return;
  //     }
  //     if (error?.reason === "NOT_MINTED") {
  //       setOwner(undefined);
  //     } else {
  //       throw error;
  //     }
  //   },
  //   onSuccess(data) {
  //     setTokenLoaded(true);
  //     setOwner(data?.toString());
  //   },
  // });
  useEffect(() => {
    setOwner(ownerAddress ? ownerAddress : undefined);
    setTokenLoaded(true);
  }, [ownerAddress, setOwner]);
}
