import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { TokenType } from "./tokenType";

interface IGalleryDetailTokenInfo {
  photo: Photo;
  collection: PhotoCollection;
  originalId: number;
  type: string;
}

export const GalleryDetailTokenInfo = ({
  photo,
  type,
}: IGalleryDetailTokenInfo) => {
  return (
    <div className="text-center lg:pt-8">
      {type === TokenType.Edition && <small>On-chain edition of</small>}
      <h2 className="text-5xl font-bold custom-major-mono mb-12 lg:text-7xl lg:mb-16">
        <span className="block">the</span>
        <span className="block">HydrA</span>
        <span className="block">#{photo.id}</span>
      </h2>
      <p className="mt-4 text-lg italic leading-snug mb-8 lg:text-xl h-16 lg:h-8 lg:mb-8">
        {photo.description}
      </p>
    </div>
  );
};
