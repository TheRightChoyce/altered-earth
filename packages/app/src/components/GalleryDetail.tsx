import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAccount } from "wagmi";

import { useTheHydraContractRead } from "../contracts";
import { extractContractError } from "../extractContractError";
import { MintButton } from "../MintButton";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { OwnerName } from "./OwnerName";
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
  const { address } = useAccount();
  const [hasOwner, setHasOwner] = useState(false);
  const owner = useTheHydraContractRead({
    functionName: "ownerOf",
    args: photoId?.toString(),
    watch: true,
    onError(error) {
      const contractError = extractContractError(error);
      if (contractError !== "NOT_MINTED") {
        throw error;
      }
    },
    onSettled(data, error) {
      if (error) {
        const contractError = extractContractError(error);
        if (contractError !== "NOT_MINTED") {
          throw error;
        }
      }
      setHasOwner(data ? true : false);
    },
    onSuccess(data) {
      setHasOwner(data ? true : false);
    },
  });

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="col-span-3">
        {/* <!-- photo --> */}
        <div>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div
              className={`${
                address ? "grayscale-0" : "grayscale"
              } transition-all ease-in-out duration-5000 border-8 border-white`}
            >
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
      <div className="col-span-2 text-sm">
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

        {/* <!-- Info --> */}
        <div className="pt-8">
          <h2 className="text-3xl">{photo.name}</h2>
          <OwnerName address={owner.data?.toString()} className="mt-4" />
          {!hasOwner && (
            <div className="mt-4">
              <MintButton
                tokenId={photo.id}
                disabled={address ? false : true}
                label={address ? "Alter your Reality" : "Dream state required"}
              />
              <div className="text-center py-4 bg-slate-800">0.25 ETH</div>
              {address ? null : (
                <div className="mt-2 italic text-center">
                  (Connect your wallet to enter a dream state)
                </div>
              )}
            </div>
          )}

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

          {hasOwner && <OpenSeaButton tokenId={photo.id} />}
        </div>
      </div>
    </div>
  );
};
