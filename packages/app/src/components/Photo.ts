import { Alchemy } from "alchemy-sdk";
import { useEffect } from "react";
import slugify from "slugify";

import { useTheHydraContractRead } from "../contracts";

interface IAttribute {
  trait_type: string;
  value: string;
}

export class Photo {
  collection = "";
  id = 0;
  name = "";
  description = "";
  price = 0.25;
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

  getOwnerFromContract = (setOwner: (owner: string | undefined) => void) => {
    const { data } = useTheHydraContractRead({
      functionName: "ownerOf",
      args: this.id,
      watch: false,
      enabled: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(error: any) {
        console.log(error);
        if (error.reason !== "NOT_MINTED") {
          throw error;
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSettled(data, error: any) {
        console.log("Settled", data, error);
        // if (!error) {
        //   setOwner(data?.toString());
        //   return;
        // }
        // if (error?.reason === "NOT_MINTED") {
        //   setOwner(undefined);
        // } else {
        //   throw error;
        // }
      },
      onSuccess(data) {
        console.log("onSuccess", data);
        // setOwner(data?.toString());
      },
    });

    useEffect(() => {
      setOwner(data?.toString());
    }, [data, setOwner]);
  };
}
