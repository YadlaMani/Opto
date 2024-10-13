import { http } from "@wagmi/core";
import { sepolia, baseSepolia } from "viem/chains"; // import base-sepolia
import { createConfig } from "wagmi";
import { walletConnect } from "wagmi/connectors";

const connector = walletConnect({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
});

export const wagmiClient = createConfig({
  connectors: [connector],
  chains: [sepolia, baseSepolia], // include base-sepolia
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(), // add transport for base-sepolia
  },
});
