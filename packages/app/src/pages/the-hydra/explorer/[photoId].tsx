import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import { GalleryNav } from "../../../components/GalleryNav";
import {
  SideBar,
  TheHydraButton,
  TypeNavigationButton,
} from "../../../components/SideBar";
import { useTheHydraContractRead } from "../../../contracts";
import { theHydraCollection } from "../../../data/the-hydra";
import { extractContractError } from "../../../extractContractError";
import Layout from "../../../layout/GalleryLayout";
import { useIsMounted } from "../../../useIsMounted";
import type { NextPageWithLayout } from "../../_app";

type OnChainMetaDataAttribute = {
  trait_type: string;
  value: string;
};

type OnChainMetaData = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<OnChainMetaDataAttribute>;
};

enum PageState {
  Loading,
  TokenNotMinted,
  TokenMinted,
  NotAnOnChainEdition,
}

const TheHydraDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const photoId = parseInt(router.query.photoId as string, 10);

  // Page states
  const isMounted = useIsMounted();
  const [pageState, setPageState] = useState(PageState.Loading);

  // Token specific info
  const [metadata, setMetadata] = useState<OnChainMetaData | undefined>(
    undefined
  );
  const [cloudflareIpfsLink, setCloudflareIpfsLink] = useState("");

  const tokenURI = useTheHydraContractRead({
    functionName: "tokenURI",
    args: photoId?.toString(),
    watch: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      if (error.errorName === "BeyondTheScopeOfConsciousness") {
        setPageState(PageState.TokenNotMinted);
      } else if (error.code === "INVALID_ARGUMENT") {
        // this means the photoId didn't get loaded from the router
        setPageState(PageState.Loading);
      } else {
        // else throw this error
        throw error;
      }
    },
    onSuccess(data) {
      if (photoId < 50) {
        setCloudflareIpfsLink(
          `https://cloudflare-ipfs.com/ipfs/${data
            ?.toString()
            .replace("ipfs://", "")}`
        );
        setPageState(PageState.NotAnOnChainEdition);
        return;
      }

      if (data.indexOf("data:application/json;base64,") != 0) {
        console.log("error, bad base64 url");
      }
      const result = JSON.parse(
        Buffer.from(
          data?.toString().replace("data:application/json;base64,", ""),
          "base64"
        ).toString("binary")
      );

      setMetadata(result);
      setPageState(PageState.TokenMinted);
    },
  });

  // Ensure the router is giving us a photoId.. sometimes it gets delayed!
  if (!isMounted || isNaN(photoId)) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left nav bar */}
      <SideBar>
        <div className="lg:w-full">
          <TheHydraButton />
        </div>
      </SideBar>

      <div className="flex flex-col-reverse lg:flex-row w-[100vw] lg:pl-8 lg:w-[90vw] lg:ml-[10vw]">
        {/* left / bottom -- info */}
        <div className="col-span-1 flex-auto basis-1/2 pr-8">
          {/* nav */}
          <div className="flex flex-rows mb-8 ml-4 lg:ml-0" id="nav">
            {/* breadcrumbs + arrow navigation */}
            <div className="h-16 flex items-center justify-between w-full">
              <div className="">
                <h4 className="lg:text-xl font-extralight leading-relaxed">
                  <Link href="/the-hydra">
                    <a className="font-extrabold">THE HYDRA</a>
                  </Link>{" "}
                  / <span className="uppercase">on-chain explorer</span> / #
                  {photoId}
                </h4>
              </div>
            </div>
          </div>
          {/* Token Information */}
          <div className="w-10/12 m-auto lg:m-0">
            {pageState == PageState.Loading && (
              <div className="">Loading data from chain</div>
            )}

            {pageState == PageState.TokenMinted && (
              <div>
                <div>Name: {metadata?.name}</div>
                <div>Desc: {metadata?.description}</div>
                <div>
                  Image:
                  {metadata?.image && (
                    <Image
                      src={metadata?.image.toString()}
                      width={512}
                      height={512}
                      alt={metadata?.name}
                    />
                  )}
                </div>
                <div>Url: {metadata?.external_url}</div>
                <div>
                  Attributes:
                  {metadata?.attributes.map((attr) => (
                    <div key={attr.trait_type}>
                      {attr.trait_type}: {attr.value}
                    </div>
                  ))}
                </div>
                <div>
                  Raw on-chain metadata:
                  <iframe src={tokenURI?.data?.toString()}></iframe>
                </div>
              </div>
            )}

            {pageState == PageState.TokenNotMinted && (
              <div>
                This edition exists beyond the scope of consciousness and can
                not be loaded from chain at this time.
              </div>
            )}

            {pageState == PageState.NotAnOnChainEdition && (
              <div>
                <p className="mb-8">
                  This is not an edition. The on-chain explorer can only be used
                  for token Ids 50 and up.
                </p>
                The off-chain metadata for this photo can be viewed here:
                <br />
                <a
                  href={cloudflareIpfsLink}
                  className="underline"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {cloudflareIpfsLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TheHydraDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TheHydraDetailPage;
