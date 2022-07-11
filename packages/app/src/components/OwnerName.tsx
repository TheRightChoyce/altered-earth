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
  const start = address?.slice(0, 6);
  const end = address?.slice(address?.length - 5, address?.length - 1);
  const addressFormatted = `${start}...${end}`;
  return (
    <h4 className={className}>
      {ens.name || addressFormatted} is wandering this reality
    </h4>
  );
};
