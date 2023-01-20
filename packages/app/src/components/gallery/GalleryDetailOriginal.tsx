import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailArtworkOriginal } from "./GalleryDetailArtwork";
import { GalleryDetailOriginalInfo } from "./GalleryDetailOriginalInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { TokenType } from "./tokenType";

interface IGalleryDetailOriginal {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  connectedWalletAddress?: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

export const GalleryDetailOriginal = ({
  photo,
  collection,
  originalId,
  connectedWalletAddress,
  onMintSuccess,
}: IGalleryDetailOriginal) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse pt-16 lg:pt-0 lg:basis-1/2">
        {/* Image */}
        <GalleryDetailArtworkOriginal photo={photo} />

        {/* content */}
        <div className="h-full lg:basis-1/2 lg:pl-28 lg:pr-8 lg:pt-8">
          <GalleryDetailTokenInfo
            photo={photo}
            collection={collection}
            type={TokenType.Original}
            originalId={originalId}
          />

          <GalleryDetailOriginalInfo
            photo={photo}
            connectedWalletAddress={connectedWalletAddress}
            onMintSuccess={onMintSuccess}
          />
        </div>
      </div>
    </>
  );
};
