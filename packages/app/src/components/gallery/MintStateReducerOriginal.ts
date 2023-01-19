import { MintState } from "./mintState";

export const mintStateReducer = (
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
