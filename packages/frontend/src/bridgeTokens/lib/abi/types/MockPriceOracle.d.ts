/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MockPriceOracleInterface extends ethers.utils.Interface {
  functions: {
    "consult(uint256)": FunctionFragment;
    "priceAverage()": FunctionFragment;
    "update(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "consult",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "priceAverage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "update",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "consult", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "priceAverage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "update", data: BytesLike): Result;

  events: {};
}

export class MockPriceOracle extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MockPriceOracleInterface;

  functions: {
    consult(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { priceInEth: BigNumber }>;

    "consult(uint256)"(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { priceInEth: BigNumber }>;

    priceAverage(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _x: BigNumber }>;

    "priceAverage()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _x: BigNumber }>;

    update(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "update(uint256)"(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  consult(
    amountOfX: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "consult(uint256)"(
    amountOfX: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  priceAverage(overrides?: CallOverrides): Promise<BigNumber>;

  "priceAverage()"(overrides?: CallOverrides): Promise<BigNumber>;

  update(
    average: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "update(uint256)"(
    average: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    consult(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "consult(uint256)"(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    priceAverage(overrides?: CallOverrides): Promise<BigNumber>;

    "priceAverage()"(overrides?: CallOverrides): Promise<BigNumber>;

    update(average: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "update(uint256)"(
      average: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    consult(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "consult(uint256)"(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    priceAverage(overrides?: CallOverrides): Promise<BigNumber>;

    "priceAverage()"(overrides?: CallOverrides): Promise<BigNumber>;

    update(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "update(uint256)"(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    consult(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "consult(uint256)"(
      amountOfX: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceAverage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "priceAverage()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    update(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "update(uint256)"(
      average: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
