import FoundryContract from "@web3-scaffold/contracts/deploys/foundry/TheHydra.json";
import GoerliContract from "@web3-scaffold/contracts/deploys/goerli/TheHydra.json";
import RinkebyContract from "@web3-scaffold/contracts/deploys/rinkeby/TheHydra.json";
import { TheHydra__factory } from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import { provider, targetChainId } from "./EthereumProviders";

// TODO -- need to add main net
let NFTContract: { deployedTo: string };
if (targetChainId === 4) {
  NFTContract = RinkebyContract;
} else if (targetChainId === 5) {
  NFTContract = GoerliContract;
} else if (targetChainId === 31337) {
  NFTContract = FoundryContract;
} else {
  NFTContract = RinkebyContract;
}

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
