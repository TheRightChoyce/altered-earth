/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar, TheHydraButton } from "../NavBar";
import { PhotoCollection } from "../PhotoCollection";
import {
  GalleryDetailArtworkEdition,
  GalleryDetailArtworkOriginal,
} from "./GalleryDetailArtwork";
import { GalleryDetailEdition } from "./GalleryDetailEdition";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailOriginal } from "./GalleryDetailOriginal";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { GalleryDetailTypeToggle } from "./GalleryDetailTypeToggle";
import { GalleryNav, GalleryNavNext, GalleryNavPrevious } from "./GalleryNav";
import {
  mintStateReducerEdition,
  mintStateReducerOriginal,
} from "./MintStateReducers";
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

  if (type === TokenType.Original) {
    return (
      <GalleryDetailOriginal
        photo={photo}
        collection={collection}
        originalId={originalId}
        connectedWalletAddress={address}
        onMintSuccess={onMintSuccess}
      />
    );
  } else {
    return (
      <GalleryDetailEdition
        photo={photo}
        collection={collection}
        originalId={originalId}
        connectedWalletAddress={address}
        onMintSuccess={onMintSuccess}
      />
    );
  }
};
