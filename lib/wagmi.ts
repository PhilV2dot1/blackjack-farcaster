import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { celo } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { injected, metaMask } from "wagmi/connectors";

const celoRpcUrl = "https://forno.celo.org";

function getAppUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
}

export const config = createConfig({
  chains: [celo],
  connectors: [
    farcasterMiniApp(),
    metaMask({
      dappMetadata: {
        name: "Blackjack on Celo",
        url: getAppUrl(),
      },
    }),
    injected({
      target: () => ({
        id: "injected",
        name: "Browser Wallet",
        provider: typeof window !== "undefined" ? window.ethereum : undefined,
      }),
    }),
  ],
  transports: {
    [celo.id]: http(celoRpcUrl, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
      timeout: 10_000,
    }),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
