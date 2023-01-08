import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryNav } from "./GalleryNav";

interface IGalleryDetailTokenInfo {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  type: string;
}

export const GalleryDetailTokenInfo = ({
  photo,
  collection,
  originalId,
  type,
}: IGalleryDetailTokenInfo) => {
  return (
    <div className="mt-8 mb-8">
      <div className="flex flex-row">
        <div className="basis-5/6">
          <h2 className="text-3xl lg:text-6xl mb-2 font-bold custom-major-mono">
            the hydrA #{photo.id}
          </h2>
        </div>

        <div className="basis-1/6 sm:hidden">
          {/* gallary photo nav */}
          <GalleryNav
            collection={collection}
            photoId={originalId}
            photoType={type}
            photoLimit={50}
          />
        </div>
      </div>
      <p className="mt-4 text-lg italic leading-snug">{photo.description}</p>
    </div>
  );
};
