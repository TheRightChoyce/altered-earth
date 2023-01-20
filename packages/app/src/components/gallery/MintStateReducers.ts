import { MintState } from "./mintState";

export const mintStateReducerOriginal = (
  tokenLoaded: boolean,
  owner: string | undefined,
  connectedWalletAddress: string | undefined
) => {
  if (!tokenLoaded) {
    return MintState.Unknown;
  } else if (!connectedWalletAddress) {
    return MintState.NotConnected;
  } else if (owner !== undefined) {
    return MintState.OriginalOwned;
  } else if (owner === undefined) {
    return MintState.OriginalAvailable;
  }

  return MintState.Unknown;
};

export const mintStateReducerEdition = (
  tokenLoaded: boolean,
  connectedWalletAddress: string | undefined,
  editionSoldOut: boolean | undefined
) => {
  if (!tokenLoaded) {
    return MintState.Unknown;
  } else if (!connectedWalletAddress) {
    return MintState.NotConnected;
  } else if (editionSoldOut === true) {
    return MintState.GenericEditionSoldOut;
  } else if (editionSoldOut === false) {
    return MintState.GenericEditionAvailable;
  }

  return MintState.Unknown;
};
