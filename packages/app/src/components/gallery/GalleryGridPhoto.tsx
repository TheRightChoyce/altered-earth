/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { Photo } from "../Photo";
import { TokenType } from "./tokenType";

interface IGalleryGridPhoto {
  photo: Photo;
  type: TokenType;
  connectedWalletAddress?: string;
  // onMintSuccess: (owner: string, tx: string) => void;
}

export const GalleryGridPhoto = ({
  photo,
  type,
}: // onMintSuccess,
IGalleryGridPhoto) => {
  return (
    <div
      key={`${photo.id}-${type}`}
      className="bg-slate-800 flex flex-col justify-center cursor-pointer"
    >
      <Link href={`/the-hydra/${photo.id}?type=${type}`}>
        <div>
          {/* Image */}
          <div className="h-[90vw] w-[90vw] md:h-[256px] md:w-[256px] overflow-hidden relative">
            <img
              className="h-full w-[90vw] md:w-[256px] object-cover opacity-40"
              src={
                type === TokenType.Original
                  ? photo.previewImageUri
                  : photo.svgPreviewUri
              }
              alt={photo.name}
            />
            {/* Hover text center */}
            <h2 className="absolute z-10 text-2xl custom-major-mono top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              {photo.getNameForMajorMono()}
            </h2>
          </div>

          {/* Price */}
          <div className="flex flex-row gap-16 justify-around p-4">
            <div className="flex flex-col align-middle">
              <h4 className="text-sm font-medium">Mint Price</h4>
              <h2 className="text-2xl font-bold">
                {type === TokenType.Original ? photo.price : "0.05"} ETH
              </h2>
            </div>
            <div className="flex flex-col">
              <h4 className="text-2m font-medium">Available</h4>
              <h2 className="text-2xl font-bold">
                {type === TokenType.Edition ? "50 of 50" : "1 of 1"}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
