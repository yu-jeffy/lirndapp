// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Next.js Application Core
// TOP LEVEL
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Imports / Libraries
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import Layout from '../comps/Layout';
import merge from 'lodash.merge';
import { RainbowKitProvider, getDefaultWallets, Theme, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SessionProvider } from "next-auth/react"

// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// RainbowKit / Wagmi Config
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Chains and Providers Options
// Default/Public Provider Info:
// - https://wagmi.sh/docs/providers/public
// - https://docs.ethers.io/v5/api/providers/#providers-getpublicProvider
const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygon,
  ],
  [

    // Switch to a paid Provider Node in production to prevent rate limiting
    // alchemyProvider({ apiKey: 'yourAlchemyApiKey', priority: 0 }),
    //publicProvider({ priority: 1 }),

    publicProvider(),
  ]
);

// Chains Options
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

// Create Wagmi Client (Ethers.js Client)
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// Custom Button Theme
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: 'linear-gradient(90deg, #8015E8 0%, #E27625 100%)',
  },
} as Theme);



// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Next.js Application
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WagmiConfig client={wagmiClient} >
        <RainbowKitProvider
          theme={myTheme}
          coolMode
          chains={chains}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>

  );
}

export default MyApp;
