import Link from "next/link";

export const GalleryDetailCollectionDescription = () => {
  return (
    <div className="lg:basis-1/2">
      <h4 className="text-2xl font-bold leading-relaxed">Description</h4>
      <p className="mb-8 leading-normal">
        An altered reality forever wandering the Ethereum blockchain.
      </p>
      <h4 className="text-2xl font-bold leading-relaxed">Original Artwork</h4>
      <p className="mb-8">
        The original is a 1-of-1 artwork that comes with a high-res immutable
        image stored on IPFS. Each token conforms to the ERC-721 standard.
        Purchasing an original allows the current owner to gift up to 5
        editions.
      </p>
      <h4 className="text-2xl font-bold leading-relaxed">Edition Artwork</h4>
      <p className="mb-8">
        There are editions of 50 for each original artwork. Editions are an
        on-chain SVG version of their corresponding original artwork. They have
        256 colors and are a 64x64 pixels. Both the metadata and SVG are
        immutable, conform to the ERC-721 standard, and exist entirely on the
        Ethereum blockchain.
      </p>
      <h4 className="text-2xl font-bold leading-relaxed">Gifting</h4>
      <p className="mb-8">
        Each original allows the current owner to gift up to 5 editions. Learn
        more on our{" "}
        <Link href="./gifting">
          <a className="underline underline-offset-4">gifting page.</a>
        </Link>
      </p>
    </div>
  );
};
