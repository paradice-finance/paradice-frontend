import { mainnet, goerli } from "wagmi/chains";
import { Chain } from "wagmi";

export const avalandche: Chain = {
  id: 43114,
  name: "Avalanche C-Chain",
  network: "avalanche",
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/avalanche"] },
  },
  nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
  blockExplorers: {
    default: {
      name: "snowtrace",
      url: "https://snowtrace.io/",
    },
  },
};

export const avalandcheFuji: Chain = {
  id: 43113,
  name: "Avalanche Fuji",
  network: "avalanche-fuji",
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/avalanche_fuji"] },
  },
  nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
  blockExplorers: {
    default: {
      name: "snowtrace",
      url: "https://testnet.snowtrace.io/",
    },
  },
  testnet: true,
};

export const fantomOpera: Chain = {
  id: 250,
  name: "Fantom Opera",
  network: "fantom",
  nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.ftm.tools"] },
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com",
    },
  },
};

export const fantomTestnet: Chain = {
  id: 4002,
  name: "Fantom Testnet",
  network: "fantom-testnet",
  nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.fantom.network"] },
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://testnet.ftmscan.com",
    },
  },
  testnet: true,
};

export { mainnet, goerli };
