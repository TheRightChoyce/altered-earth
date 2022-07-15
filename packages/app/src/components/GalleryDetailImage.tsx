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
import { Photo } from "./Photo";
import { PhotoCollection } from "./PhotoCollection";
import { Spinner } from "./Spinner";

const originalImage = ({ photo }: { photo: Photo }) => {
  return (
    <div className="relative">
      <Image
        layout={"responsive"}
        width={768}
        height={1024}
        src={photo.previewImageUri}
        alt={photo.name}
        priority={true}
      />
      <div className="absolute right-10 top-10 w-64 h-64 border-2 border-slate-900">
        <Image layout={"fill"} src={photo.svgPreviewUri} alt={photo.name} />
      </div>
    </div>
  );
};

export const GalleryDetailImage = ({
  collection,
  photoId,
}: {
  collection: PhotoCollection;
  photoId: number;
}) => {};
