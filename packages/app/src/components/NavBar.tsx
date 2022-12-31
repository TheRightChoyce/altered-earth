import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const NavBar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-[100vw] h-24 custom-side-bar-bg flex-row items-center justify-around lg:justify-start lg:flex-col lg:w-[10vw] lg:h-[100vh] lg:fixed hidden lg:visible">
      <div className="lg:w-full">
        <AlteredEarthButton />
      </div>
      {children}
      <TheRightChoyceFloatingButton />
    </div>
  );
};

export const TypeNavigationButton = ({
  type,
  currentType,
  originalId,
}: {
  type: string;
  currentType: string;
  originalId?: number;
}) => {
  const router = useRouter();
  const title = type[0].toLowerCase();

  const url = `/the-hydra${
    originalId !== null ? `/${originalId?.toString()}` : ""
  }?type=${type}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    router.push(url, url, { scroll: false, shallow: true });
  };

  return (
    <a onClick={handleClick} href={url} className="py-12">
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

export const AlteredEarthButton = () => {
  return (
    <Link href="/">
      <a>
        <div className="text-center h-24 px-4 lg:px-0 lg:h-32 flex flex-col items-center justify-center">
          <h1 className="text-4xl lg:text-5xl m-auto custom-major-mono">Ae</h1>
        </div>
      </a>
    </Link>
  );
};

export const TheRightChoyceFloatingButton = () => {
  return (
    <div className="hidden invisible lg:visible lg:block lg:fixed lg:bottom-[2vh] lg:w-[10vw] lg:pl-2">
      <div className="flex justify-center">
        <div>
          <a href="https://therightchoyce.com" target="_blank" rel="noreferrer">
            <Image
              src="/trc3-logo.svg"
              width={128}
              height={128}
              alt="therightchoyce.eth"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export const TheHydraButton = () => {
  return (
    <Link href="/the-hydra">
      <a>
        <div className="text-center h-24 px-4 lg:px-0 lg:h-32 flex flex-col items-center justify-center">
          <div className="pt-2 lg:pt-0">
            <h1 className="text-5xl custom-major-mono">H</h1>
          </div>
          <div>
            <small className="uppercase">The Hydra</small>
          </div>
        </div>
      </a>
    </Link>
  );
};
