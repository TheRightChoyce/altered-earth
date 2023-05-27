import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { CustomConnectButton } from "./ConnectButton";
import { PhotoCollection } from "./PhotoCollection";

interface IModalToggle {
  open: boolean;
  toggle: () => void;
}

interface IGalleryNavButton {
  collection: PhotoCollection;
  photoId: number;
  photoType: string;
}

interface IGalleryTypeButton {
  type: string;
  currentType?: string;
  setType: (val: string) => void;
}

export const NavBar = ({ children }: { children?: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div
        className="hidden absolute z-40 top-4 px-4 lg:flex justify-between w-full h-16"
        id="navbar"
      >
        <div className="text-left flex">
          <div className="w-24">
            <AlteredEarthButton open={modalOpen} toggle={toggleModal} />
          </div>
          {/* <div className="pt-4">
            <b>Collections</b>
            <div className="relative inline-block" id="info">
              <a href="#" className="">
                <b>Info</b>
              </a>
              <div
                className="hidden right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                id="info-content"
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Option 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Option 3
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="text-right">
          <div className="lg:w-40">
            <CustomConnectButton connectMessage="Connect" />
          </div>
        </div>
      </div>

      <div className="absolute z-40 top-4 px-4 flex flex-row w-[100vw] justify-between lg:hidden">
        <AlteredEarthButton open={modalOpen} toggle={toggleModal} />
        <MenuButton open={modalOpen} toggle={toggleModal} />
        <FloatingNavModal open={modalOpen} toggle={toggleModal} />
      </div>
    </>
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

export const AlteredEarthButton = ({ open, toggle }: IModalToggle) => {
  return (
    <>
      <div className="flex items-center justify-center cursor-pointer">
        <Link href="/">
          <h1 className="text-3xl lg:text-5xl custom-major-mono font-extrabold">
            <span>Ae</span>
          </h1>
        </Link>
      </div>
    </>
  );
};

export const MenuButton = ({ open, toggle }: IModalToggle) => {
  return (
    <div
      onClick={() => toggle()}
      className={`${
        open ? "" : ""
      } flex items-center justify-center cursor-pointer px-4`}
    >
      <h1
        onClick={() => toggle()}
        className="text-4xl lg:text-5xl custom-major-mono font-bold"
      >
        {open ? "x" : "V"}
      </h1>
    </div>
  );
};

export const FloatingNavModal = ({ open, toggle }: IModalToggle) => {
  return (
    <div
      className={`${
        open
          ? "opacity-100 fixed w-[100vw] h-[100vh] top-0 left-0 px-4 pt-4 z-50 bg-slate-900 backdrop-filter backdrop-blur-xl bg-opacity-90 transition-all flex flex-col"
          : "opacity-0 fixed overflow-hidden transition-opacity hidden"
      } ease-in-out duration-100`}
    >
      <div className="flex flex-row justify-end">
        <MenuButton open={open} toggle={toggle} />
      </div>
      <div className="mb-12 hidden lg:block">
        <h1 className="text-5xl leading-relaxed lg:text-7xl lg:mb-2 custom-major-mono h-18">
          Altered eArth
        </h1>
        <h2 className="text-lg md:text-xl lg:text-3xl text-slate-500">
          Exploring the earth in unseen ways
        </h2>
      </div>

      <div className="mb-12">
        <h5 className="text-lg text-slate-400">Web3 Account</h5>
        <div className="lg:w-96">
          <CustomConnectButton connectMessage="Connect Web3 Wallet" />
        </div>
      </div>

      <div className="mb-12">
        <h5 className="text-lg text-slate-400">Collections</h5>
        <ul>
          <li>
            <h2 className="text-4xl lg:text-6xl custom-major-mono ml-[-2px]">
              <Link href={"/the-hydra"}>
                <a className="hover:text-slate-300">the HydrA</a>
              </Link>
            </h2>
          </li>
        </ul>
      </div>

      <div className="mb-16">
        <h5 className="text-lg text-slate-400">Info</h5>
        <ul>
          <li>
            <h2 className="text-3xl">
              <Link href={"/the-hydra/the-process"}>
                <a>The Process</a>
              </Link>
            </h2>
          </li>
          <li>
            <h2 className="text-3xl">
              <Link href={"/the-hydra/gifting"}>
                <a>Gifting</a>
              </Link>
            </h2>
          </li>
          <li>
            <h2 className="text-3xl">
              <Link href={"/the-hydra/on-chain-editions"}>
                <a>On-chain editions</a>
              </Link>
            </h2>
          </li>
        </ul>
      </div>

      <h5 className="text-lg text-slate-400">Created by</h5>

      <h2 className="text-3xl">
        <a href="https://therightchoyce.com" target="_blank" rel="noreferrer">
          therightchoyce.eth
        </a>
      </h2>
    </div>
  );
};

export const TheRightChoyceFloatingButton = () => {
  return (
    <div className="hidden invisible lg:visible lg:block lg:fixed lg:bottom-[2vh] lg:w-34 lg:pl-2">
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

export const NavigatePreviousButton = ({
  collection,
  photoId,
  photoType,
}: IGalleryNavButton) => {
  return (
    <Link
      href={`/the-hydra/${
        photoId == 0 ? collection.photos.length - 1 : photoId - 1
      }?type=${photoType}`}
    >
      <a className="lg:h-24 flex flex-col items-center justify-center hover:bg-slate-700">
        <div>
          <Image src="/arrow-left.svg" width={32} height={32} alt="Previous" />
        </div>
        <small className="uppercase mt-[-2px]">previous</small>
      </a>
    </Link>
  );
};
export const NavigateNextButton = ({
  collection,
  photoId,
  photoType,
}: IGalleryNavButton) => {
  return (
    <Link
      href={`/the-hydra/${
        photoId == collection.photos.length - 1 ? 0 : photoId + 1
      }?type=${photoType}`}
    >
      <a className="lg:h-24 flex flex-col items-center justify-center hover:bg-slate-700">
        <div>
          <Image src="/arrow-right.svg" width={32} height={32} alt="Next" />
        </div>
        <small className="uppercase mt-[-2px]">next</small>
      </a>
    </Link>
  );
};

export const GalleryTypeButon = ({ type, setType }: IGalleryTypeButton) => {
  const href = `?type=${type}`;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setType(type);
  };
  return (
    <a
      onClick={handleClick}
      href={href}
      aria-current="page"
      className={`text-lg transition-all duration-500 inline-block py-2 w-full`}
    >
      <div className="lg:h-24 flex flex-col items-center justify-center hover:bg-slate-700">
        <h1 className="text-3xl custom-major-mono font-bold">
          {type === "original" ? "o" : "e"}
        </h1>
        <small className="uppercase">Browse {type}s</small>
      </div>
    </a>
  );
};

export const TheHydraButton = () => {
  return (
    <Link href="/the-hydra">
      <a>
        <div className="text-center h-24 px-4 lg:px-0 lg:h-32 flex flex-col items-center justify-center hover:bg-slate-700">
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
