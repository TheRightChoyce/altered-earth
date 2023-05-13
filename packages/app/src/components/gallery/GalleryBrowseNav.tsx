import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

import { TokenType } from "./tokenType";

const NavigationLink = ({
  type,
  currentType,
  photoId,
  setType,
}: {
  type: string;
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
      setType(type.toLowerCase());
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
              } px-4 text-lg transition-all duration-500
            `}
    >
      {type}s
    </a>
  );
};

export const GalleryBrowseNav = ({
  currentType,
  setType,
}: {
  currentType: string;
  // setType?: Dispatch<SetStateAction<string>>;
  setType?: (type: TokenType) => void;
}) => {
  return (
    <div className="bg-slate-800 flex flex-row justify-center content-center py-4 gap-4">
      <NavigationLink
        type={"Original"}
        currentType={currentType}
        setType={setType}
      />
      <NavigationLink
        type={"Edition"}
        currentType={currentType}
        setType={setType}
      />
    </div>
  );
};
