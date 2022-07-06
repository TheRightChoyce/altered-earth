import { toast } from "react-toastify";
import { useAccount } from "wagmi";

import { Button } from "./Button";
import { theHydraContract } from "./contracts";
import { extractContractError } from "./extractContractError";
import { promiseNotify } from "./promiseNotify";
import { switchChain } from "./switchChain";
import { usePromiseFn } from "./usePromiseFn";

export const MintButton = ({ tokenId }: { tokenId: number }) => {
  const { connector } = useAccount();

  const [alterRealityResult, alterReality] = usePromiseFn(
    async (id: number, onProgress: (message: string) => void) => {
      if (!connector) {
        throw new Error("Wallet not connected");
      }

      onProgress("Preparing wallet…");
      await switchChain(connector);
      const signer = await connector.getSigner();
      const contract = theHydraContract.connect(signer);
      const price = await contract.mintPrice();

      try {
        onProgress(`Minting token #${id}…`);

        const tx = await promiseNotify(
          contract.alterReality(id, { value: price })
        ).after(1000 * 5, () =>
          onProgress("Please confirm transaction in your wallet…")
        );
        console.log("mint tx", tx);

        onProgress("Finalizing transaction…");
        const receipt = await promiseNotify(tx.wait())
          .after(1000 * 15, () =>
            onProgress(
              "It can sometimes take a while to finalize a transaction…"
            )
          )
          .after(1000 * 30, () => onProgress("Still working on it…"));
        console.log("mint receipt", receipt);

        return { receipt };
      } catch (error) {
        console.error("Transaction error:", error);
        const contractError = extractContractError(error);
        throw new Error(`Transaction error: ${contractError}`);
      }
    },
    [connector]
  );

  return (
    <Button
      pending={alterRealityResult.type === "pending"}
      className="w-10/12 bg-pink-700 hover:bg-pink-500"
      onClick={(event) => {
        event.preventDefault();
        const toastId = toast.loading("Starting…");
        alterReality(tokenId, (message) => {
          toast.update(toastId, { render: message });
        }).then(
          ({ receipt }) => {
            // TODO: show etherscan link?
            toast.update(toastId, {
              isLoading: false,
              type: "success",
              render: `Minted!`,
              autoClose: 5000,
              closeButton: true,
            });
            console.log(receipt);
          },
          (error) => {
            toast.update(toastId, {
              isLoading: false,
              type: "error",
              render: String(error.message),
              autoClose: 5000,
              closeButton: true,
            });
          }
        );
      }}
    >
      <div className="m-0 w-full">Alter your reality</div>
    </Button>
  );
};
