/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar } from "../NavBar";
import { PhotoCollection } from "../PhotoCollection";
import { Spinner } from "../Spinner";
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
  tokenType,
}: {
  collection: PhotoCollection;
  photoId: number;
  tokenType: TokenType;
}) => {
  const isMounted = useIsMounted();

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
    if (tokenType) {
      _type = tokenType;
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
  }

  useEffect(() => {
    setType(tokenType);
  }, [tokenType]);

  if (!isMounted) {
    return (
      <div className="text-center pt-32 h-96">
        <Spinner />
      </div>
    );
  }

  if (!photo) {
    return notFound;
  }

  return (
    <>
      <div className="flex flex-col gap-8 align-bottom">
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
      </div>
      {/* Left nav bar */}
      <NavBar></NavBar>
    </>
  );
};
