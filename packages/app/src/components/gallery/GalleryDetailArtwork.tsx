/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Photo } from "../Photo";

interface IGalleryDetailArtworkOriginal {
  photo: Photo;
  children?: React.ReactNode;
}

interface IGalleryDetailArtworkEdition {
  photo: Photo;
}

export const GalleryDetailArtworkOriginal = ({
  photo,
  children,
}: IGalleryDetailArtworkOriginal) => {
  return (
    <div>
      <div className="lg:w-[45vw] flex items-center place-content-center py-8 px-4 lg:py-0 lg:px-0">
        <a
          href={photo.previewImage1024Uri}
          target="_blank"
          className="cursor-zoom-in"
          rel="noreferrer"
        >
          <div className="block">
            <img
              src={photo.previewImage1024Uri}
              alt={photo.name}
              className="w-full"
            />
          </div>
          {children}
        </a>
      </div>
    </div>
  );
};

export const GalleryDetailArtworkEdition = ({
  photo,
}: IGalleryDetailArtworkEdition) => {
  return (
    <div>
      <div className="lg:w-[45vw] flex items-center place-content-center py-8 px-4 lg:py-0 lg:px-0">
        <a
          href={photo.svgPreviewUri}
          target="_blank"
          className="cursor-zoom-in"
          rel="noreferrer"
        >
          <div className="block">
            <img
              src={photo.previewImage1024Uri}
              alt={photo.name}
              className="w-full opacity-20"
            />
          </div>
          <div className="absolute top-[22vh] left-[12.5vw] lg:top-[25vh] lg:right-[10vw] shadow-2xl">
            <img
              src={photo.svgPreviewUri}
              alt={photo.name}
              className="max-w-[75vw] border-8 border-slate-200"
            />
          </div>
        </a>
      </div>
    </div>
  );
};
