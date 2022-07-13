import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "../Button";
import { MintButton } from "../MintButton";
import { Photo } from "./Photo";

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-slate-600"
                  >
                    <div className="m-0 w-full">Dream state required</div>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const GalleryMintButton = ({
  photo,
  address,
}: {
  photo: Photo;
  address: string | undefined;
}) => {
  return (
    <>
      {address && (
        <>
          <MintButton
            tokenId={photo.id}
            disabled={address ? false : true}
            label="Alter your Reality"
          />
          <div className="text-center mt-3">0.25 ETH</div>
        </>
      )}
      {!address && (
        <>
          <CustomConnectButton />
          <div className="text-center mt-3">0.25 ETH</div>
        </>
      )}
    </>
  );
};
