import NFTGoerli from "@web3-scaffold/contracts/deploys/goerli/TheHydra.json";
import { TheHydra__factory } from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import { provider, targetChainId } from "./EthereumProviders";

// I would have used `ExampleNFT__factory.connect` to create this, but we may
// not have a provider ready to go. Any interactions with this contract should
// use `exampleNFTContract.connect(providerOrSigner)` first.

// export const exampleNFTContract = new Contract(
//   ExampleNFTGoerli.deployedTo,
//   ExampleNFT__factory.abi
// ) as ExampleNFT;

export const theHydraContract = TheHydra__factory.connect(
  NFTGoerli.deployedTo,
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
    addressOrName: NFTGoerli.deployedTo,
    contractInterface: TheHydra__factory.abi,
  });
