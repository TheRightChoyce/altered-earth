import Image from "next/image";
import { useState } from "react";

import { useTheHydraContractRead } from "../../contracts";
import { useIsMounted } from "../../useIsMounted";

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

export const OnChainExplorer = ({ photoId }: { photoId: number }) => {
  const isMounted = useIsMounted();

  // Page states
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
      if (
        error.errorName === "BeyondTheScopeOfConsciousness" ||
        error.code === "CALL_EXCEPTION"
      ) {
        setPageState(PageState.TokenNotMinted);
      } else if (error.code === "INVALID_ARGUMENT") {
        // this means the photoId didn't get loaded from the router
        setPageState(PageState.Loading);
      } else {
        // else throw this error
        setPageState(PageState.TokenNotMinted);
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
    <>
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
            Raw on-chain json:
            <iframe
              src={tokenURI?.data?.toString()}
              className="w-[80vw] h-128"
            ></iframe>
          </div>
        </div>
      )}

      {pageState == PageState.TokenNotMinted && (
        <div>
          This edition exists beyond the scope of consciousness and can not be
          loaded from chain at this time.
        </div>
      )}

      {pageState == PageState.NotAnOnChainEdition && (
        <div>
          <p className="mb-8">
            This is not an edition. The on-chain explorer can only be used for
            token Ids 50 and up.
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
    </>
  );
};
