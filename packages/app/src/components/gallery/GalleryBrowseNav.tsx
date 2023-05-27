import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { TokenType } from "./tokenType";

const NavigationLink = ({
  type,
  currentType,
  photoId,
}: {
  type: TokenType;
  currentType: string;
  photoId?: number;
  setType?: (type: TokenType) => void;
}) => {
  return (
    <Link
      href={`/the-hydra/${type.toLowerCase()}${photoId ? `/${photoId}` : ""}`}
    >
      <a
        className={`px-4 text-md capitalize cursor-pointer ${
          type.toLowerCase() == currentType
            ? "text-slate-100 font-bold underline underline-offset-4"
            : "text-slate-600 hover:text-slate-400"
        }`}
      >
        {type}s
      </a>
    </Link>
  );
};

export const GalleryActionNavigation = ({
  currentType,
}: {
  currentType: TokenType;
}) => {
  return (
    <div className="flex flex-row justify-center content-center py-4 gap-4 bg-slate-800 w-96 m-auto rounded-lg">
      <NavigationLink type={TokenType.Original} currentType={currentType} />
      <NavigationLink type={TokenType.Edition} currentType={currentType} />
    </div>
  );
};

export const TokenTypeToggleLink = ({
  type,
  currentType,
  photoId,
  linkText,
}: {
  type: TokenType;
  currentType: TokenType;
  photoId?: number;
  linkText?: string;
}) => {
  const href = `/the-hydra/${type.toLowerCase()}${
    photoId ? `/${photoId}/` : ""
  }`;

  return (
    <Link href={href}>
      <a className="link">
        {linkText && linkText}
        {!linkText && (
          <span>
            View the{" "}
            {currentType === TokenType.Original
              ? "on-chain edition"
              : "original"}
          </span>
        )}
      </a>
    </Link>
  );
};

export const ToggleTypeButtonOld = ({
  type,
  currentType,
  photoId,
  setType,
}: {
  type: TokenType;
  currentType: TokenType;
  photoId?: number;
  setType?: (type: TokenType) => void;
}) => {
  const router = useRouter();
  const pathName = `/the-hydra${photoId ? `/${photoId}` : ""}`;
  const href = `?type=${type.toLowerCase()}`;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(
      {
        pathname: pathName,
        query: { type: type.toLowerCase() },
      },
      {
        pathname: pathName,
        query: { type: type.toLowerCase() },
      },
      { scroll: true }
    );
    if (setType) {
      setType(type);
    }
  };
  return (
    <a
      onClick={handleClick}
      href={href}
      aria-current="page"
      className="text-md underline underline-offset-4"
    >
      View the{" "}
      {currentType === TokenType.Original ? "on-chain edition" : "original"}
    </a>
  );
};
