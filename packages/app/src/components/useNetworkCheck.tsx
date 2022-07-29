import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export function useNetworkCheck() {
  const { chain } = useNetwork();

  const [isCorrect, setIsCorrect] = useState(false);

  chain?.name;

  useEffect(
    () =>
      setIsCorrect(
        // If not connected to a network then set to true since we don't know
        // If connected and its the wrong network, let the app now
        !chain ||
          chain?.id === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "4")
      ),
    [chain]
  );

  return { isCorrectNetwork: isCorrect, networkName: chain?.name };
}
