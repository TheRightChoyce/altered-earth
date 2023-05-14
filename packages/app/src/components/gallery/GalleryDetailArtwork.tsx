/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
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
    <div className="relative w-[100vw] overflow-hidden h-[75vh]">
      <div className="object-cover w-full">
        <a
          href={photo.previewImage1024Uri}
          target="_blank"
          className="cursor-zoom-in"
          rel="noreferrer"
        >
          <Image
            src={photo.previewImage1024Uri}
            alt={photo.name}
            objectFit="cover"
            layout="fill"
            className="opacity-80"
          />

          {children}
        </a>
      </div>
    </div>
  );
};

export const GalleryDetailArtworkOriginalOld = ({
  photo,
  children,
}: IGalleryDetailArtworkOriginal) => {
  return (
    <div>
      <div className="lg:w-[45vw] flex items-center place-content-center pb-8 px-4 lg:py-0 lg:px-0">
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
    <div className="relative w-[100vw] overflow-hidden h-[75vh]">
      <div className="object-cover w-full">
        <a
          href={photo.svgPreviewUri}
          target="_blank"
          className="cursor-zoom-in"
          rel="noreferrer"
        >
          <div className="block">
            <Image
              src={photo.previewImage1024Uri}
              alt={photo.name}
              objectFit="cover"
              layout="fill"
              className="opacity-30"
            />
          </div>
          <div className="absolute top-[18vh] right-[12.5vw] lg:top-[15vw] lg:right-[10vw] shadow-2xl">
            <img
              src={photo.svgPreviewUri}
              alt={photo.name}
              className="max-w-[75vw] lg:max-w-[25vw] border-8 border-slate-200"
            />
          </div>
        </a>
      </div>
    </div>
  );
};
