import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient } from "wagmi";
import { arbitrum, bsc, mainnet, polygon, goerli } from "wagmi/chains";

import WagmiProvider from "../components/WagmiProvider";
import "../styles/global.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (ready && !process.env.WALLETCONNECT_PROJECT_ID) {
    console.log(process.env.WALLETCONNECT_PROJECT_ID, "tets")
    throw new Error(
      "You need to provide WALLETCONNECT_PROJECT_ID env variable"
    );
  }
  const chains = [goerli, arbitrum, mainnet, polygon, bsc];

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: process.env.WALLETCONNECT_PROJECT_ID! }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (ready &&
    <>
      <WagmiProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </WagmiProvider>
      <Web3Modal
        projectId={process.env.WALLETCONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
