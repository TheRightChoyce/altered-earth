import { useENS } from "../useENS";

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
  return (
    <h4 className={className}>
      {ens.name || ens.address} is wandering this reality
    </h4>
  );
};
