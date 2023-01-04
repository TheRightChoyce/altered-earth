import Image from "next/image";
import Link from "next/link";

import { Photo } from "../Photo";
import { GalleryMintButton } from "./GalleryMintButton";
import { TokenType } from "./tokenType";

interface IGalleryGridPhoto {
  photo: Photo;
  type: TokenType;
  connectedWalletAddress: string | undefined;
  // onMintSuccess: (owner: string, tx: string) => void;
}

export const GalleryGridPhoto = ({
  photo,
  type,
  connectedWalletAddress,
}: // onMintSuccess,
IGalleryGridPhoto) => {
  return (
    <div
      key={`${photo.id}-${type}`}
      className="bg-slate-800 mb-4 flex flex-col rounded-lg"
    >
      <Link href={`/the-hydra/${photo.id}?type=${type}`}>
        <a>
          <div className="m-auto">
            <div className="lg:w-80 h-80 object-cover overflow-hidden rounded-t-lg m-auto text-center">
              <Image
                layout={"responsive"}
                objectFit="cover"
                width="100%"
                height="100%"
                src={
                  type === TokenType.Original
                    ? photo.previewImageUri
                    : photo.svgPreviewUri
                }
                alt={photo.name}
                priority={true}
                sizes={"100vw"}
              />
            </div>
          </div>
          <div className="px-4 py-4 flex flex-col">
            <h2 className="mb-2 font-bold">
              <span className="text-xl lg:text-3xl">{photo.name}</span>
              <span className="text-md">
                {type === TokenType.Edition ? " (On-chain Edition)" : ""}
              </span>
            </h2>
            <div className="flex flex-row">
              {type === TokenType.Original && (
                <div className="mb-2">
                  <h5 className="text-md lg:text-xl">Original Price</h5>
                  <h4 className="text-xl font-bold lg:text-3xl">
                    {photo.price} ETH
                  </h4>
                </div>
              )}
              {type === TokenType.Edition && (
                <div className="mb-2">
                  <h5 className="text-md lg:text-xl">Edition Price</h5>
                  <h4 className="text-xl font-bold lg:text-3xl">
                    {photo.price} ETH
                  </h4>
                </div>
              )}
              {/* <div className="basis-1/2">
                <GalleryMintButton
                  photo={photo}
                  address={connectedWalletAddress}
                  isOriginal={true}
                  onSuccess={() => {}}
                  isCorrectNetwork={true}
                />
              </div> */}
            </div>
          </div>
        </a>
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
