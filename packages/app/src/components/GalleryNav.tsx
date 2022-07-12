import Image from "next/image";
import Link from "next/link";

import { PhotoCollection } from "./PhotoCollection";

export const GalleryNav = ({
  collection,
  photoId,
}: {
  collection: PhotoCollection;
  photoId: number;
}) => {
  const navigatePreviousPhotoId =
    photoId === 0 ? collection.photos.length - 1 : photoId - 1;
  const navigateNextPhotoId =
    photoId === collection.photos.length - 1 ? 0 : photoId + 1;

  return (
    <div className="flex justify-between m-auto ">
      <div>
        <Link href={`/the-hydra/${navigatePreviousPhotoId}`}>
          <a>
            <Image
              src="/arrow-left.svg"
              width={32}
              height={32}
              alt="Previous"
            />
          </a>
        </Link>
        <div className="w-4 inline-block">&nbsp;</div>
        <Link href={`/the-hydra/${navigateNextPhotoId}`}>
          <a>
            <Image src="/arrow-right.svg" width={32} height={32} alt="Next" />
          </a>
        </Link>
      </div>
      <div>
        <Link href={`/the-hydra`}>
          <a>
            <Image src="/x.svg" width={28} height={28} alt="Close" />
          </a>
        </Link>
      </div>
    </div>
  );
};
