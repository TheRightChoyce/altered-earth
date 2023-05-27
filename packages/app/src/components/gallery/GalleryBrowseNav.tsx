import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { TokenType } from "./tokenType";

const NavigationLink = ({
  type,
  currentType,
  photoId,
  setType,
}: {
  type: TokenType;
  currentType: string;
  photoId?: number;
  // setType?: Dispatch<SetStateAction<string>>;
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
      { scroll: false }
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
      className={`
              ${
                type.toLowerCase() == currentType
                  ? "text-slate-100 font-bold underline underline-offset-4"
                  : "text-slate-600 hover:text-slate-400"
              } px-4 text-md capitalize
            `}
    >
      {type}s
    </a>
  );
};

export const GalleryBrowseNav = ({
  currentType,
}: {
  currentType: string;
  // setType?: Dispatch<SetStateAction<string>>;
  setType?: (type: TokenType) => void;
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
}: {
  type: TokenType;
  currentType: TokenType;
  photoId?: number;
}) => {
  let href = "/the-hydra";
  if (photoId) {
    href += `/${photoId}/${type.toLowerCase()}`;
  }

  return (
    <Link href={href}>
      <a className="link">
        View the{" "}
        {currentType === TokenType.Original ? "on-chain edition" : "original"}
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
