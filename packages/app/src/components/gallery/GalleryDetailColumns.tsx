/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar, TheHydraButton } from "../NavBarLarge";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { GalleryDetailTypeToggle } from "./GalleryDetailTypeToggle";
import { GalleryNav, GalleryNavNext, GalleryNavPrevious } from "./GalleryNav";
import { TokenType } from "./tokenType";

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

  // User wallet
  const { address } = useAccount();

  // Photo ids
  const originalId = collection.getOriginalId(photoId);
  const photo = useMemo(() => {
    return collection.getPhoto(originalId);
  }, [collection, originalId]);

  // Default the token type since we might need to manually adjust
  const initTokenType = (photoId: number, originalId: number) => {
    let _type: string = TokenType.Original;
    if (photoId !== originalId) {
      _type = TokenType.Edition;
    }
    if (router.query.type) {
      if (router.query.type instanceof Array) {
        _type = router.query.type[0];
      } else {
        _type = router.query.type;
      }
    }
    return _type;
  };

  // The type we are viewing -- either edition or original
  const [type, setType] = useState(initTokenType(photoId, originalId));

  // Navigation helpers
  const [previousPhoto, setPreviousPhoto] = useState(-1);

  const [originalImageClass, setOriginalImageClass] = useState("");
  // Adjust the opacity of the original when viewing an edition
  useEffect(() => {
    setOriginalImageClass(
      `${type === "original" ? "block" : "hidden"}` // ease-linear transition-all duration-500`
    );
  }, [type]);

  const [editionImageClass, setEditionImageClass] = useState("");
  // Adjust the opacity of the edition when viewing an edition
  useEffect(() => {
    setEditionImageClass(
      `${
        type === "original" ? "hidden" : "block"
      } ease-linear transition-all duration-500`
    );
  }, [type]);

  const onMintSuccess = (owner: string, tx: string) => {
    // setHasOwner(true);
    console.debug(owner, tx);
  };

  if (previousPhoto != originalId) {
    setPreviousPhoto(originalId);
    // setTokenLoaded(false);
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
      <div className="w-64">
        <NavBar>
          <div className="lg:w-full">
            <TheHydraButton />
          </div>
        </NavBar>
      </div>

      {/* content */}
      <div className="w-[60vw] px-4 sm:px-8 bg-slate-800 h-full">
        <div className="mt-8 bg-slate-600 h-[79vh] flex items-center place-content-center">
          <a
            href={
              type === "original"
                ? photo.previewImage1024Uri
                : photo.svgPreviewUri
            }
            target="_blank"
            className="cursor-zoom-in"
            rel="noreferrer"
          >
            <div className={originalImageClass}>
              <img
                src={photo.previewImage1024Uri}
                alt={photo.name}
                className="h-[75vh] border-8 border-slate-200"
              />
            </div>

            <div className={editionImageClass}>
              <img
                src={photo.svgPreviewUri}
                alt={photo.name}
                className="max-h-[50vh] border-8 border-slate-200"
              />
            </div>
          </a>
        </div>
        {/* Original / Edition toggle */}
        <div className="">
          <GalleryDetailTypeToggle setType={setType} currentType={type} />
        </div>

        {/* Image + token info */}
        {/* <div className="flex flex-row">
          <div className="w-16 relative hidden">
            <div className="inline-block absolute top-[50%]">
              <GalleryNavPrevious
                collection={collection}
                photoId={originalId}
                photoType={type.toString()}
              />
            </div>
          </div>
          
          <div className="w-16 relative hidden">
            <div className="inline-block absolute top-[50%]">
              <GalleryNavNext
                collection={collection}
                photoId={originalId}
                photoType={type.toString()}
              />
            </div>
          </div>
        </div> */}

        <div className="">
          <GalleryDetailTokenInfo
            photo={photo}
            collection={collection}
            type={type}
            originalId={originalId}
          />

          {/* Original / Edition info */}
          {type == "original" && (
            <GalleryDetailOriginalInfo
              photo={photo}
              connectedWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
          {type == "edition" && (
            <GalleryDetailEditionInfo
              photo={photo}
              originalId={originalId}
              connectedWalletAddress={address}
              onMintSuccess={onMintSuccess}
            />
          )}
          {/* </div> */}
        </div>
      </div>

      {/* Side bar */}
      <div className="w-128">side</div>
    </div>
  );
};
