import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { theHydraContract, useTheHydraContractRead } from "../contracts";
import { extractContractError } from "../extractContractError";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { Address } from "./Address";
import { GalleryMintButton } from "./GalleryMintButton";
import { GalleryNav } from "./GalleryNav";
import { OwnerName } from "./OwnerName";
import { PhotoCollection } from "./PhotoCollection";
import { Spinner } from "./Spinner";
import { TypeToggle } from "./TypeToggle";

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
      console.debug(`onSettled ${data}`);
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

  const onMintSuccess = (owner: string, tx: string) => {
    setHasOwner(true);
    console.debug(owner, tx);
  };

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
      <div className="flex">
        {/* Left nav bar */}
        <div className="w-[10vw] custom-side-bar-bg h-[100vh] fixed">
          <div className="flex flex-col">
            <div className="m-auto py-12">
              <Link href="/">
                <a>
                  <h1 className="text-5xl m-auto custom-major-mono">Ae</h1>
                </a>
              </Link>
            </div>

            <div className="py-12 flex justify-center">
              <Link href="/the-hydra">
                <a>
                  <div>
                    <h1 className="text-5xl custom-major-mono">H</h1>
                  </div>
                  <div>
                    <small className="uppercase">The Hydra</small>
                  </div>
                </a>
              </Link>
            </div>
            <div
              className={`${
                type == "original" ? "bg-slate-600" : "hover:bg-gray-700"
              } flex justify-center`}
            >
              <a
                onClick={() => setType("original")}
                href="#edition"
                className="py-12"
              >
                <div>
                  <h1 className="text-5xl custom-major-mono">o</h1>
                </div>
                <div>
                  <small className="uppercase">Originals</small>
                </div>
              </a>
            </div>
            <div
              className={`${
                type == "edition" ? "bg-slate-600" : "hover:bg-gray-700"
              } flex justify-center`}
            >
              <a
                onClick={() => setType("edition")}
                href="#edition"
                className="py-12"
              >
                <div>
                  <h1 className="text-5xl custom-major-mono">e</h1>
                </div>
                <div>
                  <small className="uppercase">Editions</small>
                </div>
              </a>
            </div>
            <div className="fixed bottom-[2vh] w-[10vw] pl-2">
              <div className="flex justify-center">
                <div>
                  <a
                    href="https://therightchoyce.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/trc3-logo.svg"
                      width={128}
                      height={128}
                      alt="therightchoyce.eth"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse lg:flex-row pl-8 w-[90vw] ml-[10vw]">
          {/* left / bottom -- info */}
          <div className="col-span-1 flex-auto basis-1/2 pr-8">
            {/* nav */}
            <div className="flex flex-rows mb-8">
              {/* breadcrumbs + arrow navigation */}
              <div className="h-16 flex items-center justify-between w-full">
                <div className="">
                  <h4 className="lg:text-xl font-extralight leading-relaxed">
                    <Link href="/the-hydra">
                      <a className="font-extrabold">THE HYDRA</a>
                    </Link>{" "}
                    / ORIGINALS / {photo.id}
                  </h4>
                </div>
              </div>

              <div className="h-16 flex items-center">
                <GalleryNav collection={collection} photoId={photoId} />
              </div>
            </div>

            {/* Token Information */}
            <div className="w-10/12">
              {/* Name & description */}
              <div className="my-[2vh]">
                <h2 className="text-2xl lg:text-5xl mb-8">{photo.name}</h2>
                <div className="text-md lg:text-lg">
                  <p className="mb-4">{photo.description}</p>
                  <p className="mb-4">
                    {type == "original" && (
                      <span>
                        An original 1-of-1 artwork comes with a high-res
                        immutable image stored on IPFS and a fully on-chain SVG
                        version. Each token conforms to the ERC-721 standard.
                      </span>
                    )}
                    {type == "edition" && (
                      <span>
                        An edition is a fully on-chain SVG version of the
                        original. 50 editions exist for each original photo.
                        Each token conforms to the ERC-721 standard.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Mint / Ownership */}
              <div className="my-[2vh]">
                {/* Connected states */}
                <div className="h-24 bg-gray-800">
                  {/* If we're waiting on the RPC call, show loading state */}
                  {!tokenLoaded && (
                    <div className="pt-8">
                      <Spinner />
                    </div>
                  )}

                  {/* If our token is loaded AND it has an owner, show that */}
                  {type == "original" && tokenLoaded && hasOwner && (
                    <div className="flex justify-center flex-row pt-4">
                      <div className="basis-1/2">
                        <OwnerName
                          address={owner.data?.toString()}
                          className="lg:text-lg ml-8"
                        />
                      </div>
                      <div className="basis-1/2 m-auto">
                        <OpenSeaButton tokenId={photo.id} />
                      </div>
                    </div>
                  )}

                  {/* If our token is loaded AND it does not have an owner AND the user did not connect their wallet */}
                  {type == "original" && tokenLoaded && !hasOwner && (
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <GalleryMintButton
                          photo={photo}
                          address={address}
                          isOriginal={true}
                          onSuccess={onMintSuccess}
                        />
                      </div>
                      <div className="pt-3 text-sm italic">
                        {address
                          ? "(Mint this original)"
                          : "(Connect your wallet to enter a dream state)"}
                      </div>
                    </div>
                  )}

                  {/* For editions -- show the mint button */}
                  {type == "edition" && tokenLoaded && (
                    <div className="flex flex-col items-center">
                      <div className="w-full">
                        <GalleryMintButton
                          photo={photo}
                          address={address}
                          isOriginal={false}
                          onSuccess={onMintSuccess}
                        />
                      </div>
                      <div className="pt-3 text-sm italic">
                        {address
                          ? "(Mint this edition)"
                          : "(Connect your wallet to enter a dream state)"}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* info */}
              <div className="my-[2vh]">
                <div className="mb-4">
                  <h6 className="uppercase">Price</h6>
                  <div className="text-lg font-bold">
                    {type == "original" ? "0.25" : "0.5"} eth
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="uppercase">Token Id</h6>
                  <div className="text-lg font-bold">
                    {type == "original"
                      ? photo.id
                      : `${photo.getEditionIdStart()} - ${photo.getEditionIdEnd()}`}
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="uppercase">Royalties</h6>
                  <div className="text-lg font-bold">7.5%</div>
                </div>

                <div className="mb-4">
                  <h6 className="uppercase">Contract</h6>
                  <div className="text-lg font-bold">
                    <a
                      href={`https://goerli.etherscan.io/address/${theHydraContract.address}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {Address(theHydraContract.address)}
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="uppercase">Attributes</h6>
                  <div className="text-lg font-bold">
                    <div className="grid grid-cols-2 text-xs lg:text-sm w-1/2">
                      <div>Direction</div>
                      <div>Value1</div>

                      <div>Season</div>
                      <div>Value1</div>

                      <div>Type</div>
                      <div>{type}</div>

                      <div>Trunk</div>
                      <div>Value1</div>

                      <div>Location</div>
                      <div>Value1</div>

                      <div>Dream</div>
                      <div>Vivid</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right / top -- image */}
          <div className="col-span-1 flex-auto h-[100vh] basis-1/2">
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
                <>
                  <div className="relative">
                    <Image
                      layout={"responsive"}
                      width={768}
                      height={1024}
                      src={photo.previewImageUri}
                      alt={photo.name}
                      priority={true}
                      className="opacity-10"
                    />
                    <div className="absolute w-[75%] h-[75%] top-[12.5%] left-[12.5%]">
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
                </>
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
      </div>
    </>
  );
};
