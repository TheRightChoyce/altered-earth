import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { theHydraContract } from "../contracts";
import { LooksRareButton } from "../LooksRareButton";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { Address } from "./Address";
import { ExplorerButton } from "./ExplorerButton";
import { GalleryBreadcrumbs } from "./GalleryBreadcrumbs";
import { GalleryMintButton } from "./GalleryMintButton";
import { GalleryNav } from "./GalleryNav";
import { OwnerName } from "./OwnerName";
import { PhotoCollection } from "./PhotoCollection";
import { SideBar, TheHydraButton, TypeNavigationButton } from "./SideBar";
import { Spinner } from "./Spinner";
import { useEditionInfo } from "./useEditionInfo";
import { useNetworkCheck } from "./useNetworkCheck";
import { useOwnerOf } from "./useOwnerOf";

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
  const router = useRouter();
  const { isConnected, isCorrectNetwork, networkName } = useNetworkCheck();

  // define some page states
  enum TokenType {
    Original = "original",
    Edition = "edition",
  }

  enum MintState {
    // loading / unknown
    Unknown,

    // Not connected to any network
    NotConnected,

    // Connected to the wrong chain/network
    WrongNetwork,

    // For when type == original
    OriginalAvailable,
    OriginalOwned,

    // for when type == edition AND a specific Id is passed, i.e. 51, 1025, etc..
    EditionAvailable,
    EditionOwned,

    // for when type == edition and the original id is passsed i.e. anything below the orginal supply
    GenericEditionAvailable,
    GenericEditionSoldOut,
  }

  // Default the token type since we might need to manually adjust
  let _type = router.query.type || TokenType.Original;

  // Get the correct Ids
  const originalId = collection.getOriginalId(photoId);
  let galleryPhotoId = _type == TokenType.Original ? originalId : photoId;

  // Default to the edition if an edition id was specifically provided
  if (photoId > originalId) {
    _type = TokenType.Edition;
    galleryPhotoId = photoId;
  }

  // load the photo we want to disply on this page using the original id
  const photo = collection.getPhoto(originalId);

  // The type we are viewing -- either edition or original
  const [type, setType] = useState(_type);

  // Token specific info
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [owner, setOwner] = useState<string | undefined>(undefined);
  const [editionSoldOut, setEditionSoldOut] = useState(false);
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [nextAvailableEditionId, setNextAvailableEditionId] = useState<
    number | undefined
  >(undefined);

  // Navigation helpers
  const [previousPhoto, setPreviousPhoto] = useState(-1);

  // User wallet
  const { address, isReconnecting, isDisconnected } = useAccount();

  // UI helpers
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );

  // Use and watch the owner of this token
  useOwnerOf(
    photoId,
    isCorrectNetwork && isConnected,
    setTokenLoaded,
    setOwner
  );

  // Use and watch the edition info
  useEditionInfo(
    originalId,
    isCorrectNetwork && isConnected,
    setNextAvailableEditionId,
    setEditionSoldOut
  );

  // Adjust the grayscale of the images if user is not connected
  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
  }, [address, isReconnecting, isDisconnected]);

  // Set the type since this is a url param and might need a page rerender to be applied
  useEffect(() => {
    setType(_type);
  }, [_type]);

  // set the mint state as it can change from various factors
  useEffect(() => {
    if (!isCorrectNetwork) {
      setMintState(MintState.WrongNetwork);
    } else if (!isConnected) {
      setMintState(MintState.NotConnected);
    } else if (!tokenLoaded) {
      setMintState(MintState.Unknown);
    } else {
      if (type == TokenType.Original) {
        if (owner !== undefined) setMintState(MintState.OriginalOwned);
        else if (owner === undefined) setMintState(MintState.OriginalAvailable);
      } else if (type == TokenType.Edition) {
        if (galleryPhotoId > originalId) {
          // a specific edition was requested
          if (owner !== undefined) setMintState(MintState.EditionOwned);
          if (owner === undefined) setMintState(MintState.EditionAvailable);
        } else {
          // use the generic edition page
          if (editionSoldOut) setMintState(MintState.GenericEditionSoldOut);
          else setMintState(MintState.GenericEditionAvailable);
        }
      }
    }
  }, [
    MintState,
    TokenType,
    galleryPhotoId,
    originalId,
    editionSoldOut,
    tokenLoaded,
    type,
    owner,
    isConnected,
    isCorrectNetwork,
  ]);

  const onMintSuccess = (owner: string, tx: string) => {
    // setHasOwner(true);
    console.debug(owner, tx);
  };

  if (previousPhoto != originalId) {
    setPreviousPhoto(originalId);
    setTokenLoaded(false);
  }

  if (!isMounted) {
    return <div>...</div>;
  }

  if (!photo) {
    return notFound;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar */}
      <SideBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton
            type="original"
            currentType={type.toString()}
            originalId={originalId}
          />
        </div>
        <div className="lg:w-full">
          <TypeNavigationButton
            type="edition"
            currentType={type.toString()}
            originalId={originalId}
          />
        </div>
      </SideBar>

      {/* contact */}
      <div className="flex flex-col-reverse lg:flex-row w-[100vw] lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        {/* left / bottom -- info */}
        <div className="col-span-1 flex-auto basis-1/2 pr-8">
          {/* nav */}
          <div className="flex flex-rows mb-8 ml-4 lg:ml-0" id="nav">
            {/* breadcrumbs + arrow navigation */}
            <GalleryBreadcrumbs
              breadcrumb={`${type.toString()}s`}
              photoId={photoId}
            />

            <div className="h-16 flex items-center">
              <GalleryNav
                collection={collection}
                photoId={originalId}
                photoType={type.toString()}
              />
            </div>
          </div>

          {/* Token Information */}
          <div className="w-10/12 m-auto lg:m-0">
            {/* Name & description */}
            <div className="my-[2vh]">
              {type == TokenType.Edition && (
                <h3 className="mb-2">Edition of:</h3>
              )}
              <h2 className="text-2xl lg:text-5xl mb-8">{photo.name}</h2>
              <div className="text-md lg:text-lg">
                <p className="text-2xl italic mb-8">{photo.description}</p>
                <p className="mb-4">
                  {type == "original" && (
                    <span>
                      An altered reality forever wandering the Ethereum
                      blockchain. This is an original 1-of-1 artwork that comes
                      with a high-res immutable image stored on IPFS. Each token
                      conforms to the ERC-721 standard.
                    </span>
                  )}
                  {type == "edition" && (
                    <span>
                      An altered reality forever wandering on the Ethereum
                      blockchain. This edition is an on-chain SVG version of{" "}
                      {photo.name}. Its has 256 colors and is a 64x64 pixel
                      representation of the original 1-of-1 artwork. The
                      metadata and SVG are immutable, conform to the ERC-721
                      standard, and exist entirely on the Ethereum blockchain.
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
                {mintState == MintState.Unknown && (
                  <div className="pt-8">
                    <Spinner />
                  </div>
                )}
                {/* Wallet connected to the wrong network */}
                {mintState == MintState.NotConnected && (
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <GalleryMintButton
                        photo={photo}
                        address={address}
                        isOriginal={true}
                        onSuccess={onMintSuccess}
                        isCorrectNetwork={isCorrectNetwork}
                      />
                    </div>
                    <div className="pt-3 text-sm italic">
                      Click above to connect your web3 wallet
                    </div>
                  </div>
                )}

                {/* Wallet connected to the wrong network */}
                {mintState == MintState.WrongNetwork && (
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <GalleryMintButton
                        photo={photo}
                        address={address}
                        isOriginal={true}
                        onSuccess={onMintSuccess}
                        isCorrectNetwork={isCorrectNetwork}
                      />
                    </div>
                    <div className="pt-3 text-sm italic">
                      Please connect your wallet to the{` `}
                      {process.env.NEXT_PUBLIC_CHAIN_NAME} network
                    </div>
                  </div>
                )}

                {/* Original or specific edition is already owned */}
                {(mintState == MintState.OriginalOwned ||
                  mintState == MintState.EditionOwned) && (
                  <div>
                    <div className="flex flex-row pt-4 items-center">
                      <div className="">
                        <OwnerName
                          address={owner}
                          className="lg:text-2xl ml-8"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {mintState === MintState.GenericEditionSoldOut && (
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <GalleryMintButton
                        photo={photo}
                        address={address}
                        isOriginal={false}
                        onSuccess={onMintSuccess}
                        isCorrectNetwork={isCorrectNetwork}
                        disabled={true}
                      />
                    </div>
                    <div className="pt-3 text-sm italic">
                      This edition is sold old!
                    </div>
                  </div>
                )}

                {/* Original token is available */}
                {mintState == MintState.OriginalAvailable && (
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <GalleryMintButton
                        photo={photo}
                        address={address}
                        isOriginal={true}
                        onSuccess={onMintSuccess}
                        isCorrectNetwork={isCorrectNetwork}
                      />
                    </div>
                    <div className="pt-3 text-sm italic">
                      {isCorrectNetwork
                        ? address
                          ? "(Mint this original)"
                          : "(Connect your wallet to enter a dream state)"
                        : `You are connected to the ${networkName} network`}
                    </div>
                  </div>
                )}

                {/* Edition is available */}
                {(mintState == MintState.EditionAvailable ||
                  mintState == MintState.GenericEditionAvailable) && (
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <GalleryMintButton
                        photo={photo}
                        address={address}
                        isOriginal={false}
                        onSuccess={onMintSuccess}
                        isCorrectNetwork={isCorrectNetwork}
                      />
                    </div>
                    <div className="pt-3 text-sm italic">
                      {isCorrectNetwork
                        ? address
                          ? "(Mint this edition)"
                          : "(Connect your wallet to enter a dream state)"
                        : `You are connected to the ${networkName} network`}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* If this token is owned, show the links to it on OS */}
            {mintState == MintState.OriginalOwned && (
              <div className="mb-[2vh] flex flex-row">
                <div className="basis-1/2 mr-4">
                  <OpenSeaButton tokenId={galleryPhotoId} />
                </div>
                <div className="basis-1/2">
                  <LooksRareButton tokenId={galleryPhotoId} />
                </div>
              </div>
            )}
            {mintState == MintState.EditionOwned && (
              <div className="mb-[2vh] flex flex-row">
                <div className="basis-1/3 mr-4">
                  <OpenSeaButton tokenId={galleryPhotoId} />
                </div>
                <div className="basis-1/3 mr-4">
                  <LooksRareButton tokenId={galleryPhotoId} />
                </div>
                <div className="basis-1/3">
                  <ExplorerButton tokenId={galleryPhotoId} />
                </div>
              </div>
            )}

            {/* Editions disclaimer */}
            {(mintState == MintState.EditionOwned ||
              mintState == MintState.EditionAvailable) && (
              <div className="bg-gray-700 border-gray-500 border-2 p-4 my-[4vh]">
                <b>NOTE</b>: You are viewing the detail page specifically for
                token #{photoId}, which is an edition of token #{originalId}. If
                you wish to view the generic edition mint page,{" "}
                <Link href={`/the-hydra/${originalId}?type=edition`}>
                  <a className="font-bold hover:bg-gray-500">click here</a>
                </Link>{" "}
                and you will be able to mint the next available edition.
              </div>
            )}

            {/* Let the user which editionId is next available */}
            {mintState == MintState.GenericEditionAvailable && (
              <div>
                If you minted now, you would receive token #
                {nextAvailableEditionId}
              </div>
            )}

            {/* info */}
            <div className="my-[2vh]">
              <div className="mb-4">
                <h6 className="uppercase">Price</h6>
                <div className="text-lg font-bold">
                  {type == "original" ? "0.25" : "0.05"} eth
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
                    href={`https://${process.env.NEXT_PUBLIC_CHAIN_NAME?.toLowerCase()}.etherscan.io/address/${
                      theHydraContract.address
                    }`}
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
                    {type === TokenType.Original && (
                      <>
                        <div>Type</div>
                        <div>Original</div>

                        <div>Chakra</div>
                        <div>{photo.attributes["Chakra"]}</div>

                        <div>Season</div>
                        <div>{photo.attributes["Season"]}</div>
                      </>
                    )}

                    {type === TokenType.Edition && (
                      <>
                        <div>Type</div>
                        <div>Edition</div>

                        <div>Edition</div>
                        <div>
                          {photo.getEditionIndex(nextAvailableEditionId || 0)}{" "}
                          of 50
                        </div>

                        <div>Original</div>
                        <div>{originalId}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right / top -- image */}
        <div className="col-span-1 flex-auto h-[100vh] basis-1/2" id="artwork">
          <div className={`${imageClass} m-auto`}>
            <div className="relative min-h-[290]">
              <Image
                layout={"responsive"}
                width={768}
                height={1024}
                src={photo.previewImageUri}
                alt={photo.name}
                priority={true}
                sizes={"100vw"}
                className={`${
                  type == "original" && tokenLoaded
                    ? "opacity-100"
                    : "opacity-20"
                } ease-linear transition-all duration-500`}
              />
              <div
                className={`${
                  type == "original" ? "opacity-0" : "opacity-100"
                } absolute w-[75%] h-[56%] top-[12.5%] left-[12.5%] ease-linear transition-all duration-300 border-8 border-slate-100`}
              >
                <Image
                  layout={"responsive"}
                  width={768}
                  height={768}
                  src={photo.svgPreviewUri}
                  alt={photo.name}
                  priority={true}
                  sizes={"100vw"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
