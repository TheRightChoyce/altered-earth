export enum MintState {
  // loading / unknown
  Unknown,

  // Not connected to any network
  NotConnected,

  // Connected to the wrong chain/network
  WrongNetwork,

  // For when type == original
  OriginalAvailable,
  OriginalOwned,

  // for when type == edition AND a specific Id is passed, i.e. 51, 1025, etc..
  EditionAvailable,
  EditionOwned,

  // for when type == edition and the original id is passsed i.e. anything below the orginal supply
  GenericEditionAvailable,
  GenericEditionSoldOut,
}
