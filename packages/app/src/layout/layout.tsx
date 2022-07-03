import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { EthereumProviders } from "../EthereumProviders";
import Footer from "./footer";

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/holic/example-nft",
});

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Altered Earth</title>

        <meta property="og:title" key="title" content="Altered Earth" />

        <meta
          property="og:description"
          key="description"
          content="Exploring the earth in unseen ways"
        />

        <meta property="og:url" key="url" content="https://altered-earth.xyz" />

        <meta
          property="og:image"
          key="image"
          content="https://altered-earth.xyz/og-image.png"
        />
      </Head>
      <GraphProvider value={graphClient}>
        <EthereumProviders>
          <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
            <div className="flex flex-cols justify-between align-middle w-full">
              <div className="p-2">
                <Image
                  src="/trc-logo.svg"
                  width={330}
                  height={65}
                  alt="TheRightChoyce.eth"
                />
              </div>
              <div className="p-2">
                <div className="self-end p-2">
                  <ConnectButton />
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
              {children}
            </div>
          </div>

          <Footer />
        </EthereumProviders>
      </GraphProvider>
      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default Layout;
