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
    <div className="w-full lg:w-64 lg:justify-start lg:flex-row lg:h-[100vh] lg:block lg:fixed z-50 bg-slate-800">
      <FloatingNavModal open={modalOpen} toggle={toggleModal} />

      <div className="lg:hidden flex flex-row justify-between place-content-between items-center">
        <AlteredEarthButton open={modalOpen} toggle={toggleModal} />
        <div className="w-16">
          <div
            className="bg-slate-200 rounded-full px-2 text-slate-900 text-center"
            onClick={() => toggleModal()}
          >
            MENU
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="">
          <AlteredEarthButton open={modalOpen} toggle={toggleModal} />
        </div>
        <div className="hidden lg:block">{children}</div>
        <TheRightChoyceFloatingButton />
      </div>
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
        open ? "" : ""
      } text-center h-14 lg:h-32 px-4 lg:px-0 items-center justify-center cursor-pointer`}
    >
      <h1
        onClick={() => toggle()}
        className="text-2xl lg:text-5xl m-auto custom-major-mono"
      >
        {open ? "x" : "Ae"}
      </h1>
    </div>
  );
};

export const FloatingNavModal = ({ open, toggle }: IModalToggle) => {
  return (
    <div
      className={`${
        open ? "top-0 lg:left-64" : "top-[-100vh] lg:left-[-100vw]"
      } z-40 w-[100vw] h-[100vh] bg-slate-900 lg:pl-16 lg:pt-8 transition-all ease-in-out duration-100 overflow-hidden fixed`}
    >
      <div className="lg:hidden bg-slate-700 p-4 text-right mb-8">
        <div
          className="bg-slate-200 rounded-full px-2 text-slate-900 text-center"
          onClick={() => toggle()}
        >
          Close
        </div>
      </div>
      <div className="mb-16 px-4">
        <h1 className="text-4xl leading-relaxed lg:text-7xl lg:mb-2 custom-major-mono h-18">
          Altered eArth
        </h1>
        <h2 className="text-lg md:text-xl lg:text-3xl text-slate-500">
          Exploring the earth in unseen ways
        </h2>
      </div>

      <div className="mb-16 px-4">
        <CustomConnectButton connectMessage="Connect Web3 Wallet" />
      </div>

      <div className="mb-16 px-4">
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

      <div className="mb-16 px-4">
        <h5 className="text-lg text-slate-400">Info</h5>
        <ul>
          <li>
            <h2 className="text-2xl lg:text-3xl">
              <Link href={"/the-hydra/the-process"}>
                <a>The Process</a>
              </Link>
            </h2>
          </li>
          <li>
            <h2 className="text-2xl lg:text-3xl">
              <Link href={"/the-hydra/gifting"}>
                <a>Gifting</a>
              </Link>
            </h2>
          </li>
          <li>
            <h2 className="text-2xl lg:text-3xl">
              <Link href={"/the-hydra/on-chain-editions"}>
                <a>On-chain editions</a>
              </Link>
            </h2>
          </li>
        </ul>
      </div>

      <div className="pl-4">
        <h5 className="text-lg text-slate-400">Created by</h5>

        <h2 className="text-2xl lg:text-3xl">
          <a href="https://therightchoyce.com" target="_blank" rel="noreferrer">
            therightchoyce.eth
          </a>
        </h2>
      </div>
    </div>
  );
};

export const TheRightChoyceFloatingButton = () => {
  return (
    <div className="hidden invisible lg:visible lg:block lg:fixed lg:bottom-[2vh] lg:w-64 lg:pl-2">
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
