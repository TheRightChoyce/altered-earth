import React, { Dispatch, SetStateAction } from "react";

const TypeNavigationLink = ({
  type,
  currentType,
  setType,
}: {
  type: string;
  currentType: string;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const href = `?type=${type}`;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setType(type);
  };

  return (
    <div
      className={`
    ${
      type == currentType ? "bg-slate-700" : "bg-slate-800"
    } basis-1/2 text-center rounded-md`}
    >
      <a
        onClick={handleClick}
        href={href}
        aria-current="page"
        className={`
                ${
                  type == currentType
                    ? "text-slate-100"
                    : "text-slate-400 hover:text-slate-300"
                } text-lg transition-all duration-500 inline-block py-2
              `}
      >
        {type === "original" && "Original 1-of-1"}
        {type === "edition" && "Edition of 50"}
      </a>
    </div>
  );
};

export const GalleryDetailTypeToggle = ({
  currentType,
  setType,
}: {
  currentType: string;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row justify-items-stretch px-4 my-8">
      <TypeNavigationLink
        type={"original"}
        currentType={currentType}
        setType={setType}
      />
      <TypeNavigationLink
        type={"edition"}
        currentType={currentType}
        setType={setType}
      />
    </div>
  );
};
