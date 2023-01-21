import Image from "next/image";
import Link from "next/link";

import { PhotoCollection } from "../PhotoCollection";

interface GalleryNavParams {
  collection: PhotoCollection;
  photoId: number;
  photoType: string;
  photoLimit?: number;
}

interface GalleryNavButtonParams {
  collection: PhotoCollection;
  photoId: number;
  photoType: string;
}

export const GalleryNavPrevious = ({
  collection,
  photoId,
  photoType,
}: GalleryNavButtonParams) => {
  const navigatePreviousPhotoId =
    photoId == 0 ? collection.photos.length - 1 : photoId - 1;

  return (
    <Link href={`/the-hydra/${navigatePreviousPhotoId}?type=${photoType}`}>
      <a>
        <Image src="/arrow-left.svg" width={32} height={32} alt="Previous" />
      </a>
    </Link>
  );
};

export const GalleryNavNext = ({
  collection,
  photoId,
  photoType,
}: GalleryNavButtonParams) => {
  const navigateNextPhotoId =
    photoId == collection.photos.length - 1 ? 0 : photoId + 1;

  return (
    <Link href={`/the-hydra/${navigateNextPhotoId}?type=${photoType}`}>
      <a>
        <Image src="/arrow-right.svg" width={32} height={32} alt="Previous" />
      </a>
    </Link>
  );
};

export const GalleryNav = ({
  collection,
  photoId,
  photoType,
}: GalleryNavParams) => {
  return (
    <div className="flex flex-row w-full sm:w-[256px]" id="nav">
      <div className="basis-1/2 text-center mr-4">
        <GalleryNavPrevious
          collection={collection}
          photoId={photoId}
          photoType={photoType}
        />
      </div>
      {/* <div className="basis-1/2 text-center">
        {photoId + 1} of {photoLimit}
      </div> */}
      <div className="basis-1/2 text-center">
        <GalleryNavNext
          collection={collection}
          photoId={photoId}
          photoType={photoType}
        />
      </div>
    </div>
  );
};
