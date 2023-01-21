/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import {
  GalleryTypeButon,
  NavBar,
  NavigateNextButton,
  NavigatePreviousButton,
  TheHydraButton,
} from "../NavBar";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailEdition } from "./GalleryDetailEdition";
import { GalleryDetailOriginal } from "./GalleryDetailOriginal";
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
    <>
      {/* Left nav bar */}
      <NavBar>
        <div className="lg:w-full">
          <TheHydraButton />
          <GalleryTypeButon
            type={TokenType.Original}
            currentType={type}
            setType={setType}
          />
          <GalleryTypeButon
            type={TokenType.Edition}
            currentType={type}
            setType={setType}
          />
          <NavigatePreviousButton
            photoId={photoId}
            collection={collection}
            photoType={type}
          />
          <NavigateNextButton
            photoId={photoId}
            collection={collection}
            photoType={type}
          />
        </div>
      </NavBar>
      {type === TokenType.Original && (
        <GalleryDetailOriginal
          photo={photo}
          collection={collection}
          originalId={originalId}
          connectedWalletAddress={address}
          onMintSuccess={onMintSuccess}
        />
      )}
      {type === TokenType.Edition && (
        <GalleryDetailEdition
          photo={photo}
          collection={collection}
          originalId={originalId}
          connectedWalletAddress={address}
          onMintSuccess={onMintSuccess}
        />
      )}
    </>
  );
};
