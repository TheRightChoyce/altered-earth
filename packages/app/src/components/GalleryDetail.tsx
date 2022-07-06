import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useTheHydraContractRead } from "../contracts";
import { MintButton } from "../MintButton";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { PhotoCollection } from "./PhotoCollection";

const notFound = (
  <div className="flex flex-col w-full text-center">
    <h4>Photo not found!</h4>
  </div>
);

export const GalleryDetail = ({
  collection,
  photoId,
}: {
  collection: PhotoCollection;
  photoId: number;
}) => {
  const isMounted = useIsMounted();
  const [hasOwner, setHasOwner] = useState(false);
  const owner = { data: null };
  // const owner = useTheHydraContractRead({
  //   functionName: "ownerOf",
  //   args: photoId?.toString(),
  //   watch: true,
  //   onError(error) {
  //     console.log("Error", error);
  //     setHasOwner(false);
  //   },
  //   onSuccess(data) {
  //     console.log("Data", data);
  //     setHasOwner(true);
  //   },
  // });

  if (!isMounted) {
    return null;
  }

  if (isNaN(photoId) || photoId < 0 || photoId > collection.photos.length) {
    return notFound;
  }

  const photo = collection.photos[photoId];

  if (!photo) {
    return notFound;
  }

  console.log(owner);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-3">
        {/* <!-- nav --> */}
        <div className="flex justify-between">
          <div>
            <Link href={`/the-hydra/${photo.id - 1}`}>
              <a>
                <Image
                  src="/arrow-left.svg"
                  width={32}
                  height={32}
                  alt="Previous"
                />
              </a>
            </Link>
            <div className="w-4 inline-block">&nbsp;</div>
            <Link href={`/the-hydra/${photo.id + 1}`}>
              <a>
                <Image
                  src="/arrow-right.svg"
                  width={32}
                  height={32}
                  alt="Next"
                />
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/the-hydra`}>
              <a>
                <Image src="/x.svg" width={28} height={28} alt="Close" />
              </a>
            </Link>
          </div>
        </div>
        {/* <!-- photo --> */}
        <div>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div className="border-8 border-white">
              <Image
                src={photo.previewImageUri}
                layout="responsive"
                width="75%"
                height="100%"
                objectFit="contain"
                alt={photo.name}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right column */}
      <div className="col-span-2 pt-8 text-sm">
        <h2 className="text-3xl">{photo.name}</h2>
        <h4>Owned by: {hasOwner ? owner.data : "--"}</h4>

        <div className="mt-8 mb-8">
          <p className="mb-4">{photo.description}</p>
          <p className="mb-4">
            Each photo comes with a high-res immutable imoage stored on IPFS
            (and maybe an on-chain SVG version)
          </p>
        </div>

        <div className="grid grid-cols-2 uppercase text-xs mb-8">
          <div>Token ID</div>
          <div>{photo.id}</div>

          <div>Token standard</div>
          <div>ERC-721</div>

          <div>Contract</div>
          <div>0x1234...0987</div>

          <div>Metadata</div>
          <div>IPFS</div>

          <div>Roylaties</div>
          <div>7.5%</div>
        </div>

        {/* <div className="uppercase mb-8">OpenSea | LooksRare</div> */}

        {hasOwner ? (
          <OpenSeaButton tokenId={photo.id} />
        ) : (
          <MintButton tokenId={photo.id} />
        )}
      </div>
    </div>
  );
};
