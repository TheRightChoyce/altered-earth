import { useEffect } from "react";

import { useTheHydraContractRead } from "../contracts";

export function useEditionInfo(
  originalId: number,
  setNextAvailableEditionId: (nextId: number | undefined) => void,
  setEditionSoldOut: (nextId: boolean) => void
) {
  const { data } = useTheHydraContractRead({
    functionName: "editionsGetInfoFromOriginal",
    args: originalId.toString(),
    watch: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      if (error.reason !== "BeyondTheScopeOfConsciousness") {
        throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettled(data, error: any) {
      console.log("onSettled", data);
      if (error && error.reason !== "BeyondTheScopeOfConsciousness") {
        throw error;
      }
      setNextAvailableEditionId(data?.nextId.toNumber());
      setEditionSoldOut(data?.soldOut);
    },
    onSuccess(data) {
      setNextAvailableEditionId(data?.nextId.toNumber());
      setEditionSoldOut(data?.soldOut);
    },
  });

  useEffect(() => {
    setNextAvailableEditionId(data?.nextId.toNumber());
  }, [data, setNextAvailableEditionId]);

  return data;
}
