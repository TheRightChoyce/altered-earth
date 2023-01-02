import Image from "next/image";
import Link from "next/link";

import { PhotoCollection } from "../PhotoCollection";

interface GalleryNavParams {
  collection: PhotoCollection;
  photoId: number;
  photoType: string;
  photoLimit: number;
}

export const GalleryNav = ({
  collection,
  photoId,
  photoType,
  photoLimit,
}: GalleryNavParams) => {
  const navigatePreviousPhotoId =
    photoId == 0 ? collection.photos.length - 1 : photoId - 1;
  const navigateNextPhotoId =
    photoId == collection.photos.length - 1 ? 0 : photoId + 1;

  return (
    <div className="flex flex-row my-4 w-full sm:w-[256px]" id="nav">
      <div className="basis-1/4 text-center">
        <Link href={`/the-hydra/${navigatePreviousPhotoId}?type=${photoType}`}>
          <a>
            <Image
              src="/arrow-left.svg"
              width={32}
              height={32}
              alt="Previous"
            />
          </a>
        </Link>
      </div>
      <div className="basis-1/2 text-center">
        {photoId + 1} of {photoLimit}
      </div>
      <div className="basis-1/4 text-center">
        <Link
          href={`/the-hydra/${navigateNextPhotoId}?type=${photoType}#artwork`}
        >
          <a>
            <Image src="/arrow-right.svg" width={32} height={32} alt="Next" />
          </a>
        </Link>
      </div>
    </div>
  );
};
