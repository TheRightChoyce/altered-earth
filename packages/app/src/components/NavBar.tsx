import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { CustomConnectButton } from "./ConnectButton";

interface IModalToggle {
  open: boolean;
  toggle: () => void;
}

export const NavBar = ({ children }: { children?: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex flex-row z-50 fixed w-[100vw] custom-side-bar-bg justify-between px-4 lg:px-0 lg:justify-start lg:w-36 h-16 lg:h-[100vh] lg:block lg:fixed ">
      <FloatingNavModal open={modalOpen} toggle={toggleModal} />
      <AlteredEarthButton open={modalOpen} toggle={toggleModal} />
      <MenuButton open={modalOpen} toggle={toggleModal} />

      <div className="hidden lg:block">{children}</div>

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

export const AlteredEarthButton = ({ open, toggle }: IModalToggle) => {
  return (
    <div
      onClick={() => toggle()}
      className={`${
        open ? "bg-slate-800" : ""
      } lg:h-32 flex items-center justify-center cursor-pointer`}
    >
      <h1
        onClick={() => toggle()}
        className="text-2xl lg:text-5xl custom-major-mono"
      >
        <span className="lg:hidden">Altered eArth</span>
        <span className="hidden lg:block">{open ? "x" : "Ae"}</span>
      </h1>
    </div>
  );
};

export const MenuButton = ({ open, toggle }: IModalToggle) => {
  return (
    <div
      onClick={() => toggle()}
      className={`${
        open ? "bg-slate-800" : ""
      } flex items-center justify-center cursor-pointer lg:hidden lg:h-32 `}
    >
      <h1
        onClick={() => toggle()}
        className="text-4xl lg:text-5xl custom-major-mono px-4"
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
        open ? "opacity-100" : "opacity-0"
      } fixed z-40 top-16 left-0 w-[100vw] h-[100vh] bg-slate-900 transition-all ease-in-out duration-100 backdrop-filter backdrop-blur-xl bg-opacity-90 px-4 lg:top-0 lg:left-36 lg:px-8 pt-8`}
    >
      <div className="mb-16 hidden lg:block">
        <h1 className="text-5xl leading-relaxed lg:text-7xl lg:mb-2 custom-major-mono h-18">
          Altered eArth
        </h1>
        <h2 className="text-lg md:text-xl lg:text-3xl text-slate-500">
          Exploring the earth in unseen ways
        </h2>
      </div>

      <div className="mb-16 lg:hidden">
        <h5 className="text-lg text-slate-400">Web3 Account</h5>
        <CustomConnectButton connectMessage="Connect Web3 Wallet" />
      </div>

      <div className="mb-16">
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
