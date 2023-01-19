/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alchemy } from "alchemy-sdk";
import { Result } from "ethers/lib/utils";
import { useEffect } from "react";
import slugify from "slugify";

import { useTheHydraContractRead } from "../contracts";
import { targetChainId } from "../EthereumProviders";

interface IAttribute {
  trait_type: string;
  value: string;
}

export class EditionInfoFromContract {
  endId = 0;
  gifted = 0;
  localIndex = 0;
  maxPerOriginal = 50;
  minted = 0;
  nextId = 0;
  originalId = 0;
  soldOut = false;
  startId = 0;

  constructor(data: Result | undefined) {
    this.endId = data?.endId.toNumber();
    this.gifted = data?.gifted.toNumber();
    this.localIndex = data?.localIndex.toNumber();
    this.maxPerOriginal = data?.maxPerOriginal.toNumber();
    this.minted = data?.minted.toNumber();
    this.nextId = data?.nextId.toNumber();
    this.originalId = data?.originalId.toNumber();
    this.soldOut = data?.soldOut;
    this.startId = data?.startId.toNumber();
  }
}

export class Photo {
  collection = "";
  id = 0;
  name = "";
  description = "";
  price = 0.25;
  editionPrice = 0.05;
  previewImage = "";
  svgPreview = "";
  // Uris are set from the collection since it knows the root path
  svgPreviewUri = "";
  previewImageUri = "";
  previewImage1024Uri = "";
  slug = "";
  attributes: Record<string, string> = {};

  loadingOwner = false;
  hasOwner = false;
  ownerAddress = "";

  constructor(
    collection: string,
    id: number,
    name: string,
    description: string,
    price?: number,
    attributes?: Array<IAttribute>
  ) {
    this.collection = collection;
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price || this.price;

    this.slug = slugify(this.name.toLowerCase());

    this.previewImage = `${id}.jpg`;
    this.svgPreview = `${id}.svg`;

    if (attributes) {
      attributes.forEach((attribute) => {
        this.attributes[attribute["trait_type"]] = attribute["value"];
      });
    }
  }

  getEditionIdStart = () => {
    return this.id * 50 + 50;
  };
  getEditionIdEnd = () => {
    return this.id * 50 + 99;
  };
  getEditionIndex = (tokenId: number) => {
    return (tokenId % 50) + 1;
  };
  getOwner = (
    alchemy: Alchemy,
    setOwner: (owner: string | undefined) => void
  ) => {
    if (this.loadingOwner) {
      return;
    }
    this.loadingOwner = true;
    alchemy.nft
      .getOwnersForNft("0x918185983D656a412155964A7765FEec4384abc4", this.id)
      .then((result) => {
        console.log(result);
        this.ownerAddress = result.owners[0];
        this.hasOwner = true;
      })
      .catch((e) => {
        console.log(e);
        this.ownerAddress = "";
        this.hasOwner = false;
        // setOwner(undefined);
      })
      .finally(() => {
        this.loadingOwner = false;
        setOwner(this.ownerAddress);
        // setTokenLoaded(true);
        // setLastFetch(new Date());
      });
  };

  getOwnerFromContract = (
    setOwner: (owner: string | undefined) => void,
    setTokenLoaded: (loaded: boolean) => void,
    isEnabled: boolean
  ) => {
    const { data, isFetched }: { data: any; isFetched: boolean } =
      useTheHydraContractRead({
        functionName: "ownerOf",
        args: [this.id],
        watch: false,
        enabled: isEnabled,
        chainId: targetChainId, // needed for when we're on a testnet and a wallet isn't conected

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
          if (error.reason !== "NOT_MINTED") {
            throw error;
          }
        },
      });

    useEffect(() => {
      setOwner(data?.toString());
      setTokenLoaded(isFetched);
    }, [data, setOwner, setTokenLoaded, isFetched]);
  };

  getEditionInfo = (
    originalId: number,
    setTokenLoaded: (loaded: boolean) => void,
    setEditionInfo: (val: EditionInfoFromContract | undefined) => void,
    isEnabled: boolean
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, isFetched }: { data: any; isFetched: boolean } =
      useTheHydraContractRead({
        functionName: "editionsGetInfoFromOriginal",
        args: [originalId],
        watch: false,
        enabled: isEnabled,
        chainId: targetChainId, // needed for when we're on a testnet and a wallet isn't conected

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(error: any) {
          if (error.reason !== "BeyondTheScopeOfConsciousness") {
            throw error;
          }
        },
      });

    useEffect(() => {
      setEditionInfo(new EditionInfoFromContract(data as Result));
      setTokenLoaded(isFetched);
    }, [data, isFetched, setEditionInfo, setTokenLoaded]);
  };
}
