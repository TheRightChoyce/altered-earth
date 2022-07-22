import { useRouter } from "next/router";
import React from "react";

export const TypeNavigationButton = ({
  type,
  currentType,
}: {
  type: string;
  currentType: string;
}) => {
  const router = useRouter();
  const href = `?type=${type}`;
  const title = type[0].toLowerCase();
  const { photoId } = router.query;

  let url = "/the-hydra";

  if (photoId) {
    url += `/${photoId}?type=${type}`;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    router.push(url, undefined, { scroll: false, shallow: true });
  };

  return (
    <a onClick={handleClick} href={href} className="py-12">
      <div
        className={`${
          currentType == type ? "bg-slate-600" : "hover:bg-gray-700"
        } text-center h-24 px-4 lg:px-0 lg:h-32 flex flex-col items-center justify-center`}
      >
        <div className="pt-2 lg:pt-0">
          <h1 className="text-5xl custom-major-mono">{title}</h1>
        </div>
        <div>
          <small className="uppercase">{type}s</small>
        </div>
      </div>
    </a>
  );
};
