import { Alchemy, Network } from "alchemy-sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { theHydraContract } from "../contracts";
import { LooksRareButton } from "../LooksRareButton";
import { OpenSeaButton } from "../OpenSeaButton";
import { useIsMounted } from "../useIsMounted";
import { Address } from "./Address";
import { ExplorerButton } from "./ExplorerButton";
import { GalleryDetailEditionInfo } from "./gallery/GalleryDetailEditionInfo";
import { GalleryDetailOriginalInfo } from "./gallery/GalleryDetailOriginalInfo";
import { GalleryDetailTypeToggle } from "./gallery/GalleryDetailTypeToggle";
import { MintState } from "./gallery/mintState";
import { TokenType } from "./gallery/tokenType";
import { GalleryMintButton } from "./GalleryMintButton";
import { GalleryNav } from "./GalleryNav";
import { NavBar, TheHydraButton, TypeNavigationButton } from "./NavBar";
import { OwnerName } from "./OwnerName";
import { PhotoCollection } from "./PhotoCollection";
import { Spinner } from "./Spinner";
import { useEditionInfo } from "./useEditionInfo";
import { useNetworkCheck } from "./useNetworkCheck";
// import { useOwnerOf } from "./useOwnerOf";

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

  // Token specific info
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const [owner, setOwner] = useState<string | undefined>(undefined);
  const [mintState, setMintState] = useState(MintState.Unknown);
  const [editionSoldOut, setEditionSoldOut] = useState(false);
  // const [nextAvailableEditionId, setNextAvailableEditionId] = useState<
  //   number | undefined
  // >(undefined);

  const alchemy = useMemo(() => {
    return new Alchemy({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      network: Network.ETH_GOERLI,
    });
  }, []);

  // Photo ids
  const originalId = collection.getOriginalId(photoId);
  const photo = useMemo(() => {
    return collection.getPhoto(originalId);
  }, [collection, originalId]);

  photo?.getOwnerFromContract(setOwner);

  // Default the token type since we might need to manually adjust
  const initTokenType = (photoId: number, originalId: number) => {
    let _type: string = TokenType.Original;
    if (photoId !== originalId) {
      _type = TokenType.Edition;
    }
    // if (router.query.type) {
    //   if (router.query.type instanceof Array) {
    //     _type = router.query.type[0];
    //   } else {
    //     _type = router.query.type;
    //   }
    // }
    return _type;
  };
  // load the photo we want to disply on this page using the original id

  // The type we are viewing -- either edition or original
  const [type, setType] = useState(initTokenType(photoId, originalId));

  // Navigation helpers
  const [previousPhoto, setPreviousPhoto] = useState(-1);

  // User wallet
  const { address, isReconnecting, isDisconnected } = useAccount();

  // UI helpers
  const [imageClass, setImageClass] = useState(
    "grayscale-0 transition-all ease-in-out duration-5000"
  );
  const [originalImageClass, setOriginalImageClass] = useState(
    type === "original" ? "opacity-100" : "opacity-20"
  );
  const [editionImageClass, setEditionImageClass] = useState(
    type === "original" ? "opacity-20" : "opacity-100"
  );

  // Use and watch the owner of this token
  // useOwnerOf(
  //   // alchemy,
  //   photoId,
  //   isCorrectNetwork && isConnected,
  //   setTokenLoaded,
  //   setOwner
  // );

  // Use and watch the edition info
  // useEditionInfo(
  //   originalId,
  //   isCorrectNetwork && isConnected,
  //   setNextAvailableEditionId,
  //   setEditionSoldOut
  // );

  // Adjust the grayscale of the images if user is not connected
  useEffect(() => {
    setImageClass(
      (isReconnecting || address) && !isDisconnected
        ? "grayscale-0 transition-all ease-in-out duration-5000"
        : "grayscale"
    );
  }, [address, isReconnecting, isDisconnected]);

  // Adjust the opacity of the original when viewing an edition
  useEffect(() => {
    setOriginalImageClass(
      `${
        type === "original" ? "opacity-100" : "opacity-20"
      } ease-linear transition-all duration-500`
    );
  }, [type, tokenLoaded]);

  // Adjust the opacity of the edition when viewing an edition
  useEffect(() => {
    setEditionImageClass(
      `${
        type === "original" ? "opacity-0" : "opacity-100"
      } ease-linear transition-all duration-500`
    );
  }, [type, tokenLoaded]);

  // Set the type since this is a url param and might need a page rerender to be applied
  // useEffect(() => {
  //   setType(_type);
  // }, [_type]);

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
        if (photoId > originalId) {
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
    photoId,
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
      <NavBar>
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
      </NavBar>

      {/* Image + token info */}
      <div className="px-8">
        <div className="relative mb-4" id="artwork">
          {/* Image */}
          <div className={`${imageClass} m-auto`}>
            <div className="relative min-h-[290]">
              <Image
                layout={"responsive"}
                width={768}
                height={1024}
                src={photo.previewImage1024Uri}
                alt={photo.name}
                priority={true}
                sizes={"100vw"}
                className={originalImageClass}
              />
              <div
                className={`${editionImageClass} absolute w-[75%] h-[56%] top-[12.5%] left-[12.5%] border-8 border-slate-100`}
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

          {/* Token Information */}
          <div className="absolute top-2 left-4">
            {/* {type == TokenType.Edition && <h3 className="mb-2">Edition of:</h3>} */}
            <h2 className="text-2xl lg:text-5xl mb-8 bg-black px-2 opacity-75">
              {photo.name}
            </h2>
          </div>

          <div className="absolute bottom-8 left-4 mr-4 bg-black px-2 opacity-75">
            <p className="text-lg italic leading-tight">{photo.description}</p>
          </div>
        </div>
      </div>

      {/* gallary photo nav */}
      <GalleryNav
        collection={collection}
        photoId={originalId}
        photoType={type.toString()}
        photoLimit={50}
      />

      <div className="bg-slate-800">
        {/* Original / Edition toggle */}
        <GalleryDetailTypeToggle setType={setType} currentType={type} />

        {/* Original / Edition info */}
        <div className="container">
          {type == "original" && (
            <GalleryDetailOriginalInfo
              alchemy={alchemy}
              isConnected={isConnected}
              photo={photo}
              mintState={mintState}
              userWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
          {type == "edition" && (
            <GalleryDetailEditionInfo
              isConnected={isConnected}
              photo={photo}
              originalId={originalId}
              mintState={mintState}
              userWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
        </div>
      </div>

      {/* old */}

      {/* content */}
      <div className="flex lg:flex-row lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        {/* left / bottom -- info */}
        <div className="col-span-1 flex-auto basis-1/2 pr-8">
          {/* Token Information */}
          <div className="w-10/12 m-auto lg:m-0">
            {/* Name & description */}

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
                {/* Wallet not connected to a network */}
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
                src={photo.previewImage1024Uri}
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
