import Image from "next/image";
import Link from "next/link";

import { PhotoCollection } from "./PhotoCollection";

export const GalleryNav = ({
  collection,
  photoId,
  photoType,
}: {
  collection: PhotoCollection;
  photoId: number;
  photoType: string;
}) => {
  const navigatePreviousPhotoId =
    photoId == 0 ? collection.photos.length - 1 : photoId - 1;
  const navigateNextPhotoId =
    photoId == collection.photos.length - 1 ? 0 : photoId + 1;

  return (
    <div className="w-24">
      <div>
        <Link
          href={`/the-hydra/${navigatePreviousPhotoId}?type=${photoType}#artwork`}
        >
          <a>
            <Image
              src="/arrow-left.svg"
              width={32}
              height={32}
              alt="Previous"
            />
          </a>
        </Link>
        <div className="w-8 inline-block">&nbsp;</div>
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
