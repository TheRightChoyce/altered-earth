/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheHydraContractRead } from "../contracts";

export function useOwnerOf(
  photoId: number | undefined,
  enabled: boolean,
  setTokenLoaded: (isLoaded: boolean) => void,
  setOwner: (owner: string | undefined) => void
) {
  useTheHydraContractRead({
    functionName: "ownerOfOrNull",
    args: photoId?.toString(),
    watch: false, //(photoId || 0) < 50, // only watch for originals
    enabled: enabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      console.log("onError", error);
      setTokenLoaded(true);

      if (error.reason === "NOT_MINTED") {
        setOwner(undefined);
      } else {
        throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettled(data: any, error: any) {
      console.log("onSettled", data, error);
      setTokenLoaded(true);

      if (error) {
        throw error;
      } else {
        setOwner(
          data?.toString() === "0x0000000000000000000000000000000000000000"
            ? undefined
            : data?.toString()
        );
        return;
      }
    },
    onSuccess(data: any) {
      console.log("onSuccess", data);
      setTokenLoaded(true);
      setOwner(
        data?.toString() === "0x0000000000000000000000000000000000000000"
          ? undefined
          : data?.toString()
      );
    },
  });

  // useEffect(() => {
  //   setOwner(ownerAddress ? ownerAddress : undefined);
  // }, [ownerAddress, setOwner]);
}
