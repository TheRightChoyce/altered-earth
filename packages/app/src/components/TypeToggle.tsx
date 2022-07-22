import { useRouter } from "next/router";
import React from "react";

const TypeNavigationLink = ({
  type,
  currentType,
}: {
  type: string;
  currentType: string;
}) => {
  const router = useRouter();
  const href = `?type=${type}`;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(
      {
        pathname: router.pathname,
        query: { type: type },
      },
      {
        pathname: router.pathname,
        query: { type: type },
      },
      { scroll: false }
    );
  };

  return (
    <a
      onClick={handleClick}
      href={href}
      aria-current="page"
      className={`
              ${
                type == currentType
                  ? "text-slate-100"
                  : "text-slate-600 hover:text-slate-400"
              } px-4 py-2 lg:w-64 text-2xl transition-all duration-500
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
