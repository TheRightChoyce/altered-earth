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
      className="gallery-grid-photo bg-slate-800 flex flex-col justify-center cursor-pointer rounded-lg"
    >
      <Link href={`/the-hydra/${type}/${photo.id}`}>
        <div className="relative">
          {/* Image */}
          {type === TokenType.Original && (
            <div className="w-full h-64 md:h-96">
              <img
                className="object-cover w-full h-full transition-opacity ease-in-out duration-100 rounded-lg"
                src={photo.previewImageUri}
                alt={photo.name}
              />
            </div>
          )}
          {type === TokenType.Edition && (
            <div className="w-64 h-64 m-auto border-8 mt-8">
              <img
                className="object-cover w-full h-full transition-opacity ease-in-out duration-100 rounded-lg"
                src={photo.svgPreviewUri}
                alt={photo.name}
              />
            </div>
          )}
          {/* Caption */}
          <h2 className="absolute z-10 text-2xl custom-major-mono top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 transition-opacity ease-in-out duration-100">
            {photo.getNameForMajorMono()}
          </h2>

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
