/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { useTheHydraContractRead } from "../contracts";

export function useEditionInfo(
  originalId: number,
  enabled: boolean,
  setNextAvailableEditionId: (nextId: number) => void,
  setEditionSoldOut: (nextId: boolean) => void
) {
  const { data }: { data: any } = useTheHydraContractRead({
    functionName: "editionsGetInfoFromOriginal",
    args: [originalId],
    watch: false,
    enabled: enabled,
    onError(error: any) {
      console.log(error);
      if (error.reason !== "BeyondTheScopeOfConsciousness") {
        throw error;
      }
    },
    onSettled(data: any, error: any) {
      if (error && error.reason !== "BeyondTheScopeOfConsciousness") {
        throw error;
      }
      setNextAvailableEditionId(data?.nextId.toNumber());
      setEditionSoldOut(data?.soldOut);
    },
    onSuccess(data: any) {
      setNextAvailableEditionId(data?.nextId.toNumber());
      setEditionSoldOut(data?.soldOut);
    },
  });

  useEffect(() => {
    setNextAvailableEditionId(data?.nextId.toNumber());
  }, [data, setNextAvailableEditionId]);

  return data;
}
