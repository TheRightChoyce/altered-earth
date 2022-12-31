import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ToastContainer } from "react-toastify";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { AlteredEarthButton } from "../components/NavBar";
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
          <div className="min-h-screen bg-slate-700 text-slate-100">
            <div className="pt-8 pb-8 lg:h-0 flex flex-row items-center bg-slate-900 w-[100vw] lg:hidden">
              <div className="basis-1/4">
                <Link href="/">
                  <a>
                    <h1 className="text-4xl lg:text-5xl m-auto custom-major-mono ml-8">
                      Ae
                    </h1>
                  </a>
                </Link>
              </div>
              <div className="basis-1/4"></div>
              <div className="basis-1/2">
                {/* spacer since rainbowkit has its own layout */}
                <div className="ml-2">
                  <ConnectButton
                    label="Enter Dream State"
                    accountStatus="address"
                    chainStatus="none"
                    showBalance={false}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900">{children}</div>
            <Footer />
          </div>
        </EthereumProviders>
      </GraphProvider>
      <ToastContainer position="bottom-right" draggable={false} />
    </>
  );
};

export default Layout;
