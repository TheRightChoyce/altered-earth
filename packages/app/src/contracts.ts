import { TheHydra__factory } from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import NFTContract from "./contractAddress";
import { provider, targetChainId } from "./EthereumProviders";

export const theHydraContract = TheHydra__factory.connect(
  NFTContract.deployedTo,
  provider({ chainId: targetChainId })
);

export const useTheHydraContractRead = (
  readConfig: Omit<
    Parameters<typeof useContractRead>[0],
    "addressOrName" | "contractInterface"
  >
) =>
  useContractRead({
    ...readConfig,
    addressOrName: NFTContract.deployedTo,
    contractInterface: TheHydra__factory.abi,
  });
