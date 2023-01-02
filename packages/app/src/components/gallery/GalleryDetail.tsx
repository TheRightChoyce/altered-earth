/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTypeToggle } from "./GalleryDetailTypeToggle";
import { GalleryNav } from "./GalleryNav";
import { TokenType } from "./tokenType";
import { PhotoCollection } from "../PhotoCollection";

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
      `${type === "original" ? "opacity-100" : "opacity-20"}` // ease-linear transition-all duration-500`
    );
  }, [type]);

  const [editionImageClass, setEditionImageClass] = useState("");
  // Adjust the opacity of the edition when viewing an edition
  useEffect(() => {
    setEditionImageClass(
      `${
        type === "original" ? "opacity-0" : "opacity-100"
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
    <div className="flex flex-col items-center relative">
      {/* Image + token info */}
      <div className="relative m-auto pt-32 px-8 h-[70vh] sm:h-[80vh]">
        <img
          src={photo.previewImage1024Uri}
          alt={photo.name}
          className={`${originalImageClass} max-h-[60vh]`}
        />
        <div
          className={`${editionImageClass} absolute w-[75%] h-[50%] top-[25%] left-[12.5%] border-8 border-slate-100`}
        >
          <img src={photo.svgPreviewUri} alt={photo.name} />
        </div>
      </div>

      <div className="bg-slate-800 w-full px-4 sm:px-8 lg:px-32">
        {/* Original / Edition toggle */}
        <div className="w-full">
          <GalleryDetailTypeToggle setType={setType} currentType={type} />
        </div>

        {/* Token Information */}
        <div className="mt-8 mb-8">
          <h2 className="text-3xl lg:text-6xl mb-2 font-bold">{photo.name}</h2>
          <p className="text-lg italic leading-snug">{photo.description}</p>
        </div>

        {/* Original / Edition info */}
        <div className="container">
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
        </div>

        {/* gallary photo nav */}
        <GalleryNav
          collection={collection}
          photoId={originalId}
          photoType={type.toString()}
          photoLimit={50}
        />
      </div>
    </div>
  );
};
