import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

const TypeNavigationLink = ({
  type,
  currentType,
  photoId,
  setType,
}: {
  type: string;
  currentType: string;
  photoId?: number;
  setType?: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const href = `?type=${type}`;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(
      {
        pathname: `/the-hydra/${photoId}`,
        query: { type: type },
      },
      {
        pathname: `/the-hydra/${photoId}`,
        query: { type: type },
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
                type == currentType
                  ? "text-slate-100 font-bold"
                  : "text-slate-600 hover:text-slate-400"
              } px-4 py-2 text-sm transition-all duration-500
            `}
    >
      Browse {type}s
    </a>
  );
};

export const TypeToggle = ({ currentType }: { currentType: string }) => {
  return (
    <div className="flex flex-row my-8">
      <div className="">
        <TypeNavigationLink type={"original"} currentType={currentType} />
      </div>
      <div className="text-2xl">|</div>
      <div>
        <TypeNavigationLink type={"edition"} currentType={currentType} />
      </div>
    </div>
  );
};

export const TypeToggleSmall = ({
  currentType,
  photoId,
  setType,
}: {
  currentType: string;
  photoId: number;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="bg-slate-800 flex w-full justify-center py-2 px-4 uppercase text-sm">
      <span>
        <TypeNavigationLink
          type={"original"}
          currentType={currentType}
          photoId={photoId}
          setType={setType}
        />
      </span>
      <span className="mx-2"> \\ </span>
      <span>
        <TypeNavigationLink
          type={"edition"}
          currentType={currentType}
          photoId={photoId}
          setType={setType}
        />
      </span>
    </div>
  );
};
