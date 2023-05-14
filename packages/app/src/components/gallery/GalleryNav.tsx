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
  display?: string;
}

const linkClassName = "border-b-2 border-slate-700 text-sm font-extralight";

export const GalleryNavPrevious = ({
  collection,
  photoId,
  photoType,
  display,
}: GalleryNavButtonParams) => {
  const navigatePreviousPhotoId =
    photoId == 0 ? collection.photos.length - 1 : photoId - 1;

  return (
    <Link
      href={`/${collection.slug}/${navigatePreviousPhotoId}?type=${photoType}`}
    >
      <a>
        {display === "text" && <span className={linkClassName}>Prev</span>}
        {display !== "text" && (
          <Image src="/arrow-left.svg" width={32} height={32} alt="Previous" />
        )}
      </a>
    </Link>
  );
};

export const GalleryNavNext = ({
  collection,
  photoId,
  photoType,
  display,
}: GalleryNavButtonParams) => {
  const navigateNextPhotoId =
    photoId == collection.photos.length - 1 ? 0 : photoId + 1;

  return (
    <Link href={`/the-hydra/${navigateNextPhotoId}?type=${photoType}`}>
      <a>
        {display === "text" && <span className={linkClassName}>Next</span>}
        {display !== "text" && (
          <Image src="/arrow-right.svg" width={32} height={32} alt="Previous" />
        )}
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
    <div
      className="flex flex-row w-full justify-between items-center px-4 h-14"
      id="nav"
    >
      <div className="basis-1/2">
        <Link href={`/${collection.slug}`}>
          <a className={linkClassName}>Back to gallery</a>
        </Link>
      </div>
      <div className="flex flex-row" id="nav">
        <div className="basis-1/2 text-center mr-8">
          <GalleryNavPrevious
            collection={collection}
            photoId={photoId}
            photoType={photoType}
            display={"text"}
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
            display={"text"}
          />
        </div>
      </div>
    </div>
  );
};
