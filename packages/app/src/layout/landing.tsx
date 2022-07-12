import Head from "next/head";
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

const Landing: React.FC = ({ children }) => {
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
          <div className="min-h-screen bg-slate-900 text-slate-100">
            <ConnectBar />
            <div className="flex-grow flex flex-col gap-4 pb-[10vh] justify-between align-middle">
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

export default Landing;
