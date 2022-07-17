export const Address = (address: string) => {
  const start = address?.slice(0, 6);
  const end = address?.slice(address?.length - 5, address?.length - 1);
  return `${start}...${end}`;
};
