import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/Image";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { EthereumProviders } from "../EthereumProviders";
import { ConnectBar } from "./ConnectBar";
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
          <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="h-16 lg:h-0 flex items-center justify-center">
              <div className="lg:pr-6 lg:top-6 lg:right-6 z-20 fixed">
                <ConnectButton
                  label="Enter Dream State"
                  accountStatus="full"
                  chainStatus="icon"
                  showBalance={true}
                />
              </div>
            </div>

            {children}
          </div>

          <Footer />
        </EthereumProviders>
      </GraphProvider>
      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default Layout;
