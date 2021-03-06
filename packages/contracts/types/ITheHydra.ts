/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ITheHydraInterface extends utils.Interface {
  functions: {
    "editionGetIndexFromId(uint256)": FunctionFragment;
    "editionGetMintCount(uint256)": FunctionFragment;
    "editionGetNextId(uint256)": FunctionFragment;
    "editionGetOriginalId(uint256)": FunctionFragment;
    "editionGetStartId(uint256)": FunctionFragment;
    "getMaxEditionsPerOriginal()": FunctionFragment;
    "getOrigialTotalSupply()": FunctionFragment;
    "getTotalSupply()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "editionGetIndexFromId"
      | "editionGetMintCount"
      | "editionGetNextId"
      | "editionGetOriginalId"
      | "editionGetStartId"
      | "getMaxEditionsPerOriginal"
      | "getOrigialTotalSupply"
      | "getTotalSupply"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "editionGetIndexFromId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "editionGetMintCount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "editionGetNextId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "editionGetOriginalId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "editionGetStartId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxEditionsPerOriginal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOrigialTotalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSupply",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "editionGetIndexFromId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editionGetMintCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editionGetNextId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editionGetOriginalId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editionGetStartId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxEditionsPerOriginal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrigialTotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSupply",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ITheHydra extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITheHydraInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    editionGetIndexFromId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    editionGetMintCount(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    editionGetNextId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    editionGetOriginalId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    editionGetStartId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaxEditionsPerOriginal(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOrigialTotalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  editionGetIndexFromId(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  editionGetMintCount(
    _originalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  editionGetNextId(
    _originalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  editionGetOriginalId(
    _id: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  editionGetStartId(
    _originalId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaxEditionsPerOriginal(overrides?: CallOverrides): Promise<BigNumber>;

  getOrigialTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    editionGetIndexFromId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetMintCount(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetNextId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetOriginalId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetStartId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxEditionsPerOriginal(overrides?: CallOverrides): Promise<BigNumber>;

    getOrigialTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    editionGetIndexFromId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetMintCount(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetNextId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetOriginalId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    editionGetStartId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxEditionsPerOriginal(overrides?: CallOverrides): Promise<BigNumber>;

    getOrigialTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    editionGetIndexFromId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    editionGetMintCount(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    editionGetNextId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    editionGetOriginalId(
      _id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    editionGetStartId(
      _originalId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxEditionsPerOriginal(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOrigialTotalSupply(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
