import { useENS } from "../useENS";
import { Address } from "./Address";

const zeroAddress = "0x0000000000000000000000000000000000000000";

export const OwnerName = ({ address }: { address: string | undefined }) => {
  const ens = useENS(address || zeroAddress);

  if (ens.address === zeroAddress) {
    return null;
  }
  const addressFormatted = Address(address || zeroAddress);

  return ens.name || addressFormatted;
};
