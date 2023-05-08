import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { useIsMounted } from "../../useIsMounted";
import { NavBar, TheHydraButton } from "../NavBar";
import { Photo } from "../Photo";
import { PhotoCollection } from "../PhotoCollection";
import { GalleryGridPhoto } from "./GalleryGridPhoto";
import { TokenType } from "./tokenType";

export const Gallery = ({ collection }: { collection: PhotoCollection }) => {
  const isMounted = useIsMounted();
  const { address } = useAccount();

  if (!isMounted) {
    return null;
  }

  if (!collection) {
    return (
      <div>
        <h3>No collection specified!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:basis-36">
        <NavBar>
          <TheHydraButton />
        </NavBar>
      </div>

      {/* content */}
      <div className="flex flex-col items-center relative">
        {/* <div className="relative w-full overflow-hidden h-[40vh]">
          <div className={`object-cover w-full h-[40vh]`}>
            <Image
              src="/the-hydra/hydra-gallery-hero.png"
              alt="The Hydra Collection"
              objectFit="cover"
              layout="fill"
            />
          </div>
        </div> */}

        <div className="px-4">
          {/* <div className="flex flex-rows mb-4 lg:mb-8" id="nav">
            <GalleryBreadcrumbs photoId={undefined} breadcrumb={`${type}s`} />
          </div> */}

          <div className="flex flex-col lg:flex-row mt-8 mb-8">
            <div className="basis-1/2 lg:basis-full text-center">
              <h1 className="text-5xl leading-normal custom-major-mono font-bold pt-12 mb-8 lg:mb-12 lg:text-8xl lg:pt-0 lg:leading-[124px]">
                {collection.name}
                <br />
                collection
              </h1>
              <div className="lg:px-32">
                {collection.headline && (
                  <div className="container mb-4 tracking-wide text-md lg:text-2xl lg:mb-8 text-slate-200">
                    <p>{collection.headline}</p>
                  </div>
                )}
                {collection.description && (
                  <div className="container mb-4 tracking-wide text-md lg:text-xl lg:mb-8 text-slate-300">
                    <p>{collection.description}</p>
                  </div>
                )}
                <div className="container mb-4 tracking-wide text-md lg:text-lg lg:mb-8 text-slate-400">
                  The collection consists of fifty 1-of-1 original photos (token
                  #s 0-49) and fifty editions of 50 (token #s 50-2,499). Each
                  original photo has a corresponding on-chain edition.
                  Purchasing an original artwork also allows the current owner{" "}
                  <Link href="gifting">
                    <a className="border-b-2 border-slate-700 font-extralight">
                      to gift up to 5 total editions
                    </a>
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>

          {/* {!address && <ConnectNotice />} */}

          <h3 className="text-2xl text-center mb-8">Browse Artwork:</h3>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 auto-cols-max gap-4 justify-center">
            {collection.photos.map((photo: Photo) => (
              <>
                <GalleryGridPhoto
                  photo={photo}
                  type={TokenType.Original}
                  connectedWalletAddress={address}
                />

                <GalleryGridPhoto
                  photo={photo}
                  type={TokenType.Edition}
                  connectedWalletAddress={address}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
