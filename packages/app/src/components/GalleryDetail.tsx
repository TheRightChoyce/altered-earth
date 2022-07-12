import Image from "next/image";
import { useState } from "react";
import { useAccount } from "wagmi";

import { useTheHydraContractRead } from "../contracts";
import { extractContractError } from "../extractContractError";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { GalleryMintButton } from "./GalleryMintButton";
import { GalleryNav } from "./GalleryNav";
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
  const { address, isConnected, isDisconnected } = useAccount();
  const [hasOwner, setHasOwner] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [previousPhoto, setPreviousPhoto] = useState(-1);

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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-[2vh]">
        {/* Top / Left column  */}
        <div className="lg:col-span-1">
          <div>
            <div
              className={`${
                address ? "grayscale-0" : "grayscale"
              } transition-colors ease-in-out duration-5000 border-4 md:border-8 border-white photoPreview overflow-hidden m-auto`}
            >
              {tokenLoaded && (
                <Image
                  layout="responsive"
                  width="768"
                  height="1024"
                  src={photo.previewImageUri}
                  alt={photo.name}
                  priority={true}
                />
              )}
              {!tokenLoaded && (
                <div className="flex h-full items-center">
                  <div className="grow">
                    <Spinner />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom / Right column */}
        <div className="lg:col-span-1 text-sm ml-[4vw] mt-[3vw] mr-[4vw] lg:mt-0">
          {/* <!-- nav --> */}
          <div className="px-[2vw] my-4">
            <GalleryNav collection={collection} photoId={photoId} />
          </div>

          {/* <!-- Info --> */}
          <div className="px-[2vw] my-4">
            <h2 className="text-2xl uppercase lg:text-4xl">{photo.name}</h2>

            <div className="mt-4 h-24 bg-slate-800">
              {/* If we're waiting on the RPC call, show loading state */}
              {!tokenLoaded && (
                <div className="pt-8">
                  <Spinner />
                </div>
              )}

              {/* If our token is loaded AND it has an owner, show that */}
              {tokenLoaded && hasOwner && (
                <OwnerName
                  address={owner.data?.toString()}
                  className="mt-4 h-24 p-4 overflow-hidden lg:text-lg"
                />
              )}

              {/* If our token is loaded AND it does not have an owner AND the user did not connect their wallet */}

              {tokenLoaded && !hasOwner && (
                <GalleryMintButton
                  photo={photo}
                  address={address}
                  isConnected={isConnected}
                  isDisconnected={isDisconnected}
                />
              )}
            </div>

            {address ? null : (
              <div className="mt-4 italic text-center">
                (Connect your wallet to enter a dream state)
              </div>
            )}

            <div className="mt-8 mb-8 lg:text-lg">
              <p className="mb-4">{photo.description}</p>
              <p className="mb-4">
                Each photo comes with a high-res immutable imoage stored on IPFS
                (and maybe an on-chain SVG version)
              </p>
            </div>

            <div className="grid grid-cols-2 uppercase text-xs mb-8 lg:text-lg">
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
    </>
  );
};
