export const OpenSeaButton = ({ tokenId }: { tokenId: number }) => {
  const url = `https://testnets.opensea.io/collection/0x3705f06940e9e878821f618f0efdebb59eebd787/${tokenId}`;
  return <a href={url}>View on OpenSea</a>;
};
