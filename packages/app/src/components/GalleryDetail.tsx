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
import { Spinner } from "./Spinner";

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
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [previousPhoto, setPreviousPhoto] = useState(-1);

  const navigatePreviousPhotoId =
    photoId === 0 ? collection.photos.length - 1 : photoId - 1;
  const navigateNextPhotoId =
    photoId === collection.photos.length - 1 ? 0 : photoId + 1;

  const owner = useTheHydraContractRead({
    functionName: "ownerOfOrNull",
    args: photoId?.toString(),
    watch: true,
    onError(error) {
      setTokenLoaded(true);
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
        setTokenLoaded(true);
      }
      setHasOwner(
        data?.toString() === "0x0000000000000000000000000000000000000000"
          ? false
          : true
      );
      setTokenLoaded(true);
    },
    onSuccess(data) {
      setHasOwner(
        data?.toString() === "0x0000000000000000000000000000000000000000"
          ? false
          : true
      );
      setTokenLoaded(true);
    },
  });

  if (previousPhoto != photoId) {
    setPreviousPhoto(photoId);
    setTokenLoaded(false);
  }

  if (!isMounted) {
    return <div>...</div>;
  }

  if (isNaN(photoId) || photoId < 0 || photoId > collection.photos.length) {
    return notFound;
  }

  const photo = collection.photos[photoId];

  if (!photo) {
    return notFound;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      {/* Top / Left column  */}
      <div className="lg:col-span-3">
        <div>
          <div
            className={`${
              address ? "grayscale-0" : "grayscale"
            } transition-colors ease-in-out duration-5000 border-4 md:border-8 border-white photoPreview overflow-hidden m-auto`}
          >
            {tokenLoaded && (
              <Image
                layout="fill"
                width="768"
                height="1024"
                src={photo.previewImageUri}
                alt={photo.name}
                priority={true}
              />
            )}
          </div>
        </div>
      </div>
      {/* Bottom / Right column */}
      <div className="lg:col-span-2 text-sm ml-[1vw] mt-[3vw] mr-[2vw] lg:mt-0">
        {/* <!-- nav --> */}
        <div className="flex justify-between m-auto max-w-sm lg:max-w-lg">
          <div>
            <Link href={`/the-hydra/${navigatePreviousPhotoId}`}>
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
            <Link href={`/the-hydra/${navigateNextPhotoId}`}>
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
        <div className="pt-8 max-w-sm mx-auto lg:max-w-lg">
          <h2 className="text-3xl">
            #{photo.id}
            {" // "}
            {photo.name}
          </h2>
          <div className="mt-4 h-24 bg-slate-800">
            {!tokenLoaded && (
              <div className="pt-8">
                <Spinner />
              </div>
            )}

            {tokenLoaded && hasOwner && (
              <OwnerName
                address={owner.data?.toString()}
                className="mt-4 h-24 p-4 overflow-hidden"
              />
            )}

            {tokenLoaded && !hasOwner && (
              <>
                <MintButton
                  tokenId={photo.id}
                  disabled={address ? false : true}
                  label={
                    address ? "Alter your Reality" : "Dream state required"
                  }
                />
                <div className="text-center mt-3">0.25 ETH</div>
                {address ? null : (
                  <div className="mt-2 italic text-center">
                    (Connect your wallet to enter a dream state)
                  </div>
                )}
              </>
            )}
          </div>

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
