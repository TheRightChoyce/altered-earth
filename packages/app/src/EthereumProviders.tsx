import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { foundry, goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// Will default to goerli if nothing set in the ENV
export const targetChainId =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "0") || 5;

// filter down to just mainnet + optional target testnet chain so that rainbowkit can tell
// the user to switch network if they're on an alternative one
const targetChains = [mainnet, goerli].filter(
  (chain) => chain.id === 1 || chain.id === targetChainId
);

// For development purposes / we're using a local network
if (targetChainId === foundry.id) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  targetChains.push(foundry);
}
export const { chains, provider, webSocketProvider } = configureChains(
  targetChains,
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Altered Earth",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export const EthereumProviders: React.FC = ({ children }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      theme={darkTheme({
        accentColor: "#ec4899",
        fontStack: "system",
        borderRadius: "none",
      })}
    >
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);
