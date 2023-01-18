import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "../Button";
import { MintButton } from "../MintButton";
import { Photo } from "./Photo";

interface ICustomConnectButton {
  connectMessage: string | undefined;
}

export const CustomConnectButton = ({
  connectMessage,
}: ICustomConnectButton) => {
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
                    className="bg-pink-600"
                  >
                    <div className="m-0 w-full">
                      {connectMessage || "Connect Web3 Wallet"}
                    </div>
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
                          // eslint-disable-next-line @next/next/no-img-element
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

export const NetworkSwitchButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openChainModal, mounted }) => {
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
              return (
                <Button onClick={openChainModal} type="button">
                  <div className="m-0 w-full">
                    Connect to {process.env.NEXT_PUBLIC_CHAIN_NAME}
                  </div>
                </Button>
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
  isCorrectNetwork,
  isOriginal,
  onSuccess,
  disabled,
}: {
  photo: Photo;
  address: string | undefined;
  isCorrectNetwork: boolean | undefined;
  isOriginal: boolean;
  onSuccess: (owner: string, tx: string) => void;
  disabled?: boolean | undefined;
}) => {
  if (!isCorrectNetwork) {
    return <NetworkSwitchButton />;
  }

  if (!address) {
    return <CustomConnectButton connectMessage="Dream state required" />;
  }

  return (
    <MintButton
      tokenId={photo.id}
      disabled={disabled}
      label="Alter your Reality"
      isOriginal={isOriginal}
      onSuccess={onSuccess}
    />
  );
};
