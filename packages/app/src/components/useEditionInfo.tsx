import { useEffect } from "react";

import { useTheHydraContractRead } from "../contracts";

export function useEditionInfo(
  originalId: number,
  enabled: boolean,
  setNextAvailableEditionId: (nextId: number) => void,
  setEditionSoldOut: (nextId: boolean) => void
) {
  const { data } = useTheHydraContractRead({
    functionName: "editionsGetInfoFromOriginal",
    args: [originalId],
    watch: false,
    enabled: enabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      console.log(error);
      if (error.reason !== "BeyondTheScopeOfConsciousness") {
        throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSettled(data, error: any) {
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
