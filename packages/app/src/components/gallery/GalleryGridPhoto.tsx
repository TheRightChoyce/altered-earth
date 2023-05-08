/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../Button";
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
      className="bg-slate-800 mb-4 flex flex-col justify-center px-8 py-8"
    >
      <Link href={`/the-hydra/${photo.id}?type=${type}`}>
        <div className="flex flex-row justify-center cursor-pointer align-middle">
          <div className="h-[192px] w-[192px] overflow-hidden">
            <img
              className="h-full w-[192px] object-cover"
              src={
                type === TokenType.Original
                  ? photo.previewImageUri
                  : photo.svgPreviewUri
              }
              alt={photo.name}
            />
          </div>
        </div>
      </Link>
      <h2 className="my-4 text-xl lg:text-2xl custom-major-mono text-center">
        {photo.getNameForMajorMono()}
      </h2>
      <div className="text-md mb-2 text-center">
        {type === TokenType.Edition ? "Edition of 50" : "Original 1-of-1"}
      </div>

      <h4 className="text-xl font-bold lg:text-2xl text-center mb-2">
        {type === TokenType.Original ? photo.price : "0.05"} ETH
      </h4>

      <Link href={`/the-hydra/${photo.id}?type=${type}`}>
        <Button>
          View {type === TokenType.Original ? "Original" : "Edition"}
        </Button>
      </Link>
    </div>
  );
};

{
  /* <Link href={`/the-hydra/${photo.id}?type=edition`}>
                <a>
                  <div className="relative h-48 w-48 md:h-64 md:w-64 6object-cover bg-slate-200">
                    <Image
                      layout={"responsive"}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      src={photo.svgPreviewUri}
                      alt={photo.name}
                      priority={true}
                        sizes={"100vw"}
                    />
                  </div>
                </a>
              </Link> */
}
