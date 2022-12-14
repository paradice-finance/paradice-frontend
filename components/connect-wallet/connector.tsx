import {
  WagmiConfig,
  createClient,
  configureChains,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Profile } from "./display-wallet";
import { UseNetwork } from "./hookTest/use-network";
import { UseSwirchNetwork } from "./hookTest/user-switch-network";
import { UseAccount } from "./hookTest/use-account";
import { UseDisconnect } from "./hookTest/use-disconnext";
import { goerli, mainnet } from "../../utils/chains";

const CHAINS = [mainnet, goerli];

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(CHAINS, [
  alchemyProvider({ apiKey: "7Lruu1VFLBlDSkjXskbfm6aCJ8mJsVRe" }),
  publicProvider(),
]);

// Set up client
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

// Pass client to React Context Provider
export function ConnectWallet() {
  return (
    <WagmiConfig client={client}>
      <UseAccount />
      <UseNetwork />
      <UseSwirchNetwork />
      <Profile />
      <UseDisconnect />
    </WagmiConfig>
  );
}
