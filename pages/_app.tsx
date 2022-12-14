import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import WagmiProvider from "../components/WagmiProvider";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}
