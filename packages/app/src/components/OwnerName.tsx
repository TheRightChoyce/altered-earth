import { useENS } from "../useENS";
import { Address } from "./Address";

const zeroAddress = "0x0000000000000000000000000000000000000000";

export const OwnerName = ({
  address,
  className,
}: {
  address: string | undefined;
  className: string;
}) => {
  const ens = useENS(address || zeroAddress);

  if (ens.address === zeroAddress) {
    return null;
  }
  const addressFormatted = Address(address || zeroAddress);
  return (
    <div className={className}>
      <h4 className="text-xl mb-2">{ens.name || addressFormatted}</h4>
      <h6 className="text-sm">is wandering this reality</h6>
    </div>
  );
};
