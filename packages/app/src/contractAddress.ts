import FoundryContract from "@web3-scaffold/contracts/deploys/foundry/TheHydra.json";
import GoerliContract from "@web3-scaffold/contracts/deploys/goerli/TheHydra.json";
import RinkebyContract from "@web3-scaffold/contracts/deploys/rinkeby/TheHydra.json";

import { targetChainId } from "./EthereumProviders";

// TODO -- need to add main net
let NFTContract: { deployedTo: string };
if (targetChainId === 5) {
  NFTContract = GoerliContract;
} else if (targetChainId === 31337) {
  NFTContract = FoundryContract;
} else {
  NFTContract = RinkebyContract;
}

export default NFTContract;
