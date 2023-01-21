import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";

interface IGalleryDetailTokenInfo {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  type: string;
}

export const GalleryDetailTokenInfo = ({ photo }: IGalleryDetailTokenInfo) => {
  return (
    <div className="text-center lg:pt-8">
      <h2 className="text-5xl font-bold custom-major-mono mb-8 lg:text-8xl lg:mb-16">
        <span className="block">the</span>
        <span className="block">HydrA</span>
        <span className="block">#{photo.id}</span>
      </h2>
      <p className="mt-4 text-lg italic leading-snug mb-4 lg:text-xl lg:mb-16 h-16">
        {photo.description}
      </p>
    </div>
  );
};
