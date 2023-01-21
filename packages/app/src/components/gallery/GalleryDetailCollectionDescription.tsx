import Link from "next/link";

export const GalleryDetailCollectionDescription = () => {
  return (
    <div className="lg:basis-1/2">
      <h4 className="text-2xl font-bold leading-relaxed">Original Artwork</h4>
      <p className="mb-8">
        Original artworks are 1-of-1s that come with a high-res immutable image
        stored on IPFS. Each NFT conforms to the ERC-721 standard. Purchasing an
        original artwork also allows the current owner to gift up to 5 total
        editions. Editions gifted by a previous owner count toward this total.
      </p>
      <h4 className="text-2xl font-bold leading-relaxed">Edition Artwork</h4>
      <p className="mb-8">
        Editions are an on-chain SVG version of their corresponding original
        artwork. Each edition has a total of 50 available. Editions have 256
        colors and are 64x64 pixels, rendered as a fully on-chain SVG. Both the
        metadata and SVG are immutable, conform to the ERC-721 standard, and
        exist entirely on the Ethereum blockchain.
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
