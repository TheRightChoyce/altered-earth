/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  TheHydraDataStore,
  TheHydraDataStoreInterface,
} from "../TheHydraDataStore";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_offChainBaseURI",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BeyondTheScopeOfConsciousness",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMemorySequence",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "getOffChainBaseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_photoId",
        type: "uint256",
      },
    ],
    name: "getPhotoData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
    ],
    name: "setOffChainBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_photoId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "storePhotoData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000a3838038062000a38833981016040819052620000349162000157565b600080546001600160a01b0319166001600160a01b03841690811782556040518492907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a3508051620000929060019060208401906200009b565b50505062000293565b828054620000a99062000257565b90600052602060002090601f016020900481019282620000cd576000855562000118565b82601f10620000e857805160ff191683800117855562000118565b8280016001018555821562000118579182015b8281111562000118578251825591602001919060010190620000fb565b50620001269291506200012a565b5090565b5b808211156200012657600081556001016200012b565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156200016b57600080fd5b82516001600160a01b03811681146200018357600080fd5b602084810151919350906001600160401b0380821115620001a357600080fd5b818601915086601f830112620001b857600080fd5b815181811115620001cd57620001cd62000141565b604051601f8201601f19908116603f01168101908382118183101715620001f857620001f862000141565b8160405282815289868487010111156200021157600080fd5b600093505b8284101562000235578484018601518185018701529285019262000216565b82841115620002475760008684830101525b8096505050505050509250929050565b600181811c908216806200026c57607f821691505b6020821081036200028d57634e487b7160e01b600052602260045260246000fd5b50919050565b61079580620002a36000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806313af4035146100675780638da5cb5b1461007c5780638db1abb5146100ac5780639fbbc841146100c1578063aa929202146100d4578063b4e169cb146100e7575b600080fd5b61007a6100753660046104ae565b6100fa565b005b60005461008f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100b4610178565b6040516100a3919061053a565b61007a6100cf366004610563565b61020a565b61007a6100e2366004610614565b61024b565b6100b46100f5366004610690565b610307565b6000546001600160a01b0316331461012d5760405162461bcd60e51b8152600401610124906106a9565b60405180910390fd5b600080546001600160a01b0319166001600160a01b0383169081178255604051909133917f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d769190a350565b606060018054610187906106cf565b80601f01602080910402602001604051908101604052809291908181526020018280546101b3906106cf565b80156102005780601f106101d557610100808354040283529160200191610200565b820191906000526020600020905b8154815290600101906020018083116101e357829003601f168201915b5050505050905090565b6000546001600160a01b031633146102345760405162461bcd60e51b8152600401610124906106a9565b8051610247906001906020840190610415565b5050565b6000546001600160a01b031633146102755760405162461bcd60e51b8152600401610124906106a9565b611408811461029757604051636d63ea9f60e11b815260040160405180910390fd5b6102d682828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061033192505050565b60009384526002602052604090932080546001600160a01b0319166001600160a01b03909416939093179092555050565b60008181526002602052604090205460609061032b906001600160a01b03166103d6565b92915050565b600080826040516020016103459190610709565b6040516020818303038152906040529050600081604051602001610369919061072f565b60405160208183030381529060405290508051602082016000f092506001600160a01b0383166103cf5760405162461bcd60e51b81526020600482015260116024820152701111541313d65351539517d19052531151607a1b6044820152606401610124565b5050919050565b606061032b8260016103f2816001600160a01b0384163b610763565b60408051603f8301601f19168101909152818152818360208301863c9392505050565b828054610421906106cf565b90600052602060002090601f0160209004810192826104435760008555610489565b82601f1061045c57805160ff1916838001178555610489565b82800160010185558215610489579182015b8281111561048957825182559160200191906001019061046e565b50610495929150610499565b5090565b5b80821115610495576000815560010161049a565b6000602082840312156104c057600080fd5b81356001600160a01b03811681146104d757600080fd5b9392505050565b60005b838110156104f95781810151838201526020016104e1565b83811115610508576000848401525b50505050565b600081518084526105268160208601602086016104de565b601f01601f19169290920160200192915050565b6020815260006104d7602083018461050e565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561057557600080fd5b813567ffffffffffffffff8082111561058d57600080fd5b818401915084601f8301126105a157600080fd5b8135818111156105b3576105b361054d565b604051601f8201601f19908116603f011681019083821181831017156105db576105db61054d565b816040528281528760208487010111156105f457600080fd5b826020860160208301376000928101602001929092525095945050505050565b60008060006040848603121561062957600080fd5b83359250602084013567ffffffffffffffff8082111561064857600080fd5b818601915086601f83011261065c57600080fd5b81358181111561066b57600080fd5b87602082850101111561067d57600080fd5b6020830194508093505050509250925092565b6000602082840312156106a257600080fd5b5035919050565b6020808252600c908201526b15539055551213d49256915160a21b604082015260600190565b600181811c908216806106e357607f821691505b60208210810361070357634e487b7160e01b600052602260045260246000fd5b50919050565b60008152600082516107228160018501602087016104de565b9190910160010192915050565b6a600b5981380380925939f360a81b8152815160009061075681600b8501602087016104de565b91909101600b0192915050565b60008282101561078357634e487b7160e01b600052601160045260246000fd5b50039056fea164736f6c634300080d000a";

type TheHydraDataStoreConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TheHydraDataStoreConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TheHydraDataStore__factory extends ContractFactory {
  constructor(...args: TheHydraDataStoreConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _owner: PromiseOrValue<string>,
    _offChainBaseURI: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TheHydraDataStore> {
    return super.deploy(
      _owner,
      _offChainBaseURI,
      overrides || {}
    ) as Promise<TheHydraDataStore>;
  }
  override getDeployTransaction(
    _owner: PromiseOrValue<string>,
    _offChainBaseURI: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _owner,
      _offChainBaseURI,
      overrides || {}
    );
  }
  override attach(address: string): TheHydraDataStore {
    return super.attach(address) as TheHydraDataStore;
  }
  override connect(signer: Signer): TheHydraDataStore__factory {
    return super.connect(signer) as TheHydraDataStore__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TheHydraDataStoreInterface {
    return new utils.Interface(_abi) as TheHydraDataStoreInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TheHydraDataStore {
    return new Contract(address, _abi, signerOrProvider) as TheHydraDataStore;
  }
}
