import { Photo } from "../Photo";
import { GalleryMintButton } from "./GalleryMintButton";

interface IMintComponent {
  photo: Photo;
  connectedWalletAddress: string | undefined;
  onMintSuccess: (owner: string, tx: string) => void;
}

export const MintComponent = ({
  photo,
  connectedWalletAddress,
  onMintSuccess,
}: IMintComponent) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-slate-800 rounded-lg">
      <div className="mb-2 flex flex-row w-full justify-between">
        <div>
          <h5 className="">Original Price</h5>
          <h4 className="text-3xl font-bold">0.25 ETH</h4>
        </div>
        <div className="text-right">
          <h5 className="">Available</h5>
          <h4 className="text-3xl font-bold">1 of 1</h4>
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
