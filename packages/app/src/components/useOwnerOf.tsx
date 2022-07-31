import { useEffect } from "react";

import { useTheHydraContractRead } from "../contracts";

export function useOwnerOf(
  photoId: number | undefined,
  enabled: boolean,
  setTokenLoaded: (isLoaded: boolean) => void,
  setOwner: (owner: string | undefined) => void
) {
  const { data } = useTheHydraContractRead({
    functionName: "ownerOf",
    args: photoId?.toString(),
    watch: true,
    enabled: enabled,
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

      if (!error) {
        setOwner(data?.toString());
        return;
      }

      if (error?.reason === "NOT_MINTED") {
        setOwner(undefined);
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
