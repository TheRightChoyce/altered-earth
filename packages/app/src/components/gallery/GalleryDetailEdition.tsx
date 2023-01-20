import { NavBar, TheHydraButton } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryDetailArtworkEdition } from "./GalleryDetailArtwork";
import { GalleryDetailEditionInfo } from "./GalleryDetailEditionInfo";
import { GalleryDetailTokenInfo } from "./GalleryDetailTokenInformation";
import { TokenType } from "./tokenType";

interface IGalleryDetailEdition {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  connectedWalletAddress?: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

export const GalleryDetailEdition = ({
  photo,
  collection,
  originalId,
  connectedWalletAddress,
  onMintSuccess,
}: IGalleryDetailEdition) => {
  return (
    <>
      {/* Left nav bar */}
      <NavBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
      </NavBar>
      <div className="flex flex-col lg:flex-row-reverse pt-16 lg:pt-0 lg:basis-1/2">
        {/* Image */}
        <GalleryDetailArtworkEdition photo={photo} />

        {/* content */}
        <div className="h-full lg:basis-1/2 lg:pl-28 lg:pr-8 lg:pt-8">
          <GalleryDetailTokenInfo
            photo={photo}
            collection={collection}
            type={TokenType.Edition}
            originalId={originalId}
          />

          <GalleryDetailEditionInfo
            photo={photo}
            originalId={originalId}
            connectedWalletAddress={connectedWalletAddress}
            onMintSuccess={onMintSuccess}
          />
        </div>
      </div>
    </>
  );
};
