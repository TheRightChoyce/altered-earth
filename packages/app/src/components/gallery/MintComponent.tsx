import { Photo } from "../Photo";
import { GalleryMintButton } from "./GalleryMintButton";
import { TokenType } from "./tokenType";

interface IMintComponent {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
  tokenType?: TokenType | undefined;
}

export const MintComponentOriginal = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
}: IMintComponent) => {
  return (
    <MintComponent
      photo={photo}
      connectedWalletAddress={connectedWalletAddress}
      onMintSuccess={onMintSuccess}
      tokenType={TokenType.Original}
    />
  );
};

export const MintComponent = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
  tokenType,
}: IMintComponent) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 rounded-lg">
      <div className="mb-2 flex flex-row w-full justify-between">
        <div>
          <h5 className="">
            {tokenType === TokenType.Original ? "Original" : "Edition"} Price
          </h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original
              ? photo.price
              : photo.editionPrice}{" "}
            ETH
          </h4>
        </div>
        <div className="text-right">
          <h5 className="">Available</h5>
          <h4 className="text-3xl font-bold">
            {tokenType === TokenType.Original ? "1 of 1" : "45 of 50"}
          </h4>
        </div>
      </div>
      <div className="w-full mt-4">
        <GalleryMintButton
          photo={photo}
          address={connectedWalletAddress}
          isOriginal={true}
          onSuccess={onMintSuccess}
          isCorrectNetwork={true}
        />
      </div>
    </div>
  );
};
