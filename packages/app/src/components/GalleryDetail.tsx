import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [hasOwner, setHasOwner] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [previousPhoto, setPreviousPhoto] = useState(-1);
  const [type, setType] = useState("original");

  const { address, isReconnecting, isDisconnected } = useAccount();
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );

  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
  }, [address, isReconnecting, isDisconnected]);

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
      <div className="flex flex-col lg:flex-row mt-[3vh]">
        {/* Top / Left column  */}
        <div className="lg:w-[60vw]">
          <div className="p-[2vw]">
            <div className={`${imageClass} m-auto`}>
              {tokenLoaded && type == "original" && (
                <div className="">
                  <Image
                    layout={"responsive"}
                    width={768}
                    height={1024}
                    src={photo.previewImageUri}
                    alt={photo.name}
                    priority={true}
                  />
                </div>
              )}
              {!tokenLoaded && type == "original" && (
                <div className="flex h-[100vh] items-center">
                  <div className="grow">
                    <Spinner />
                  </div>
                </div>
              )}

              {tokenLoaded && type == "edition" && (
                <div className="flex w-[50vw] h-[50vw] lg:w-[512px] lg:h-[512px] items-center m-auto">
                  <div className="grow">
                    <Image
                      layout={"responsive"}
                      width={768}
                      height={768}
                      src={photo.svgPreviewUri}
                      alt={photo.name}
                      priority={true}
                    />
                  </div>
                </div>
              )}
              {!tokenLoaded && type == "edition" && (
                <div className="flex w-[50vw] h-[50vw] lg:w-[512px] lg:h-[512px] items-center m-auto">
                  <div className="grow">
                    <Spinner />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom / Right column */}
        <div className="lg:w-[40vw] text-sm mt-[3vw] lg:mt-0">
          {/* <!-- nav --> */}
          <div className="px-[2vw] my-4">
            <GalleryNav collection={collection} photoId={photoId} />
          </div>

          {/* <!-- Info --> */}
          <div className="px-[2vw]">
            <h2 className="my-[2vh] text-2xl uppercase lg:text-4xl">
              {photo.name}
            </h2>

            <div className="inline-flex my-[2vh] w-full bg-slate-900">
              <a
                href="#original"
                aria-current="page"
                className={`
                  ${
                    type == "original"
                      ? "text-slate-100 bg-slate-700"
                      : "text-slate-600 hover:text-slate-400"
                  } px-4 py-2 w-1/2 text-lg text-center transition-all duration-500
                `}
                onClick={() => setType("original")}
              >
                1 of 1 Original
              </a>
              <a
                href="#edition"
                className={`
                  ${
                    type == "edition"
                      ? "text-slate-100 bg-slate-700"
                      : "text-slate-600 hover:text-slate-400"
                  } px-4 py-2 w-1/2 text-lg text-center transition-all duration-500
                `}
                onClick={() => setType("edition")}
              >
                On-chain edition
              </a>
            </div>

            <div className="my-[2vh] lg:text-md">
              <p className="mb-4">{photo.description}</p>
              <p className="mb-4">
                Each 1 of 1 photo comes with a high-res immutable imoage stored
                on IPFS, and a fully on-chain SVG version.
              </p>
            </div>

            <div className="my-[2vh]">
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
                  <GalleryMintButton photo={photo} address={address} />
                )}
              </div>

              {address ? null : (
                <div className="mt-4 italic text-center">
                  (Connect your wallet to enter a dream state)
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 uppercase text-xs mt-[2vh] mb-[4vh] lg:text-sm">
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
