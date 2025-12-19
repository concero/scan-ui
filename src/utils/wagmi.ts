import type { Chain } from 'viem'
import type { ConceroChain } from '@/utils/chains'
import type { Config } from 'wagmi'
import { createTransports, convertToViemChains } from '@/utils/chains'
import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi'
import { arbitrumSepolia } from 'viem/chains'

export const createConfiguration = (conceroChains: ConceroChain[]): Config => {
  if (conceroChains.length === 0) {
    return createConfig({
      chains: [arbitrumSepolia],
      connectors: [injected()],
      transports: {
        [arbitrumSepolia.id]: http()
      },
    });
  }
  const chains = convertToViemChains(conceroChains)
  const transports = createTransports(conceroChains)
  
  return createConfig({
    chains: chains as unknown as readonly [Chain, ...Chain[]],
    connectors: [injected()],
    transports,
  });
};
