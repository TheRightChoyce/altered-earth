import { useEffect } from "react";

import { useTheHydraContractRead } from "../contracts";

export function useOwnerOf(
  photoId: number | undefined,
  setTokenLoaded: (isLoaded: boolean) => void,
  setOwner: (owner: string | undefined) => void
) {
  const { data } = useTheHydraContractRead({
    functionName: "ownerOf",
    args: photoId?.toString(),
    watch: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      setTokenLoaded(true);

      if (error.reason === "NOT_MINTED") {
        setOwner(undefined);
      } else {
        throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettled(data, error: any) {
      setTokenLoaded(true);

      if (error && error.reason === "NOT_MINTED") {
        setOwner(undefined);
      } else if (!error) {
        setOwner(data?.toString());
      } else {
        throw error;
      }
    },
    onSuccess(data) {
      setTokenLoaded(true);
      setOwner(data?.toString());
    },
  });

  useEffect(() => {
    setOwner(data ? data.toString() : undefined);
  }, [data, setOwner]);

  return data;
}
