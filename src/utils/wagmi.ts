import type { Chain } from 'viem'
import type { ConceroChain } from '@/utils/chains'
import type { Config } from 'wagmi'
import { createConfig } from 'wagmi'
import { injected } from 'wagmi'
import { createTransports, convertToViemChains } from '@/utils/chains'

export const createConfiguration = (conceroChains: ConceroChain[]): ReturnType<typeof createConfig> => {
  const chains = convertToViemChains(conceroChains)
  const transports = createTransports(conceroChains)
  
  return createConfig({
    chains: chains as unknown as readonly [Chain, ...Chain[]],
    connectors: [injected()],
    transports,
  });
};
