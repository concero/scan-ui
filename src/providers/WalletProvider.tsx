import type { ReactElement } from 'react'
import { WagmiProvider } from 'wagmi'
import { useChainsStore } from '@/hooks/useChainsStore'
import { createConfiguration } from '@/utils/wagmi'
import { useLoadChains } from '@/hooks/Loadables/useLoadChains'

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ 
  children 
}): ReactElement => {
  const { chains } = useChainsStore()
  const { loading } = useLoadChains()
  
  if (loading || Object.keys(chains).length === 0) {
	return <>{children}</>
  }
  
  const conceroChains = Object.values(chains)
  const config = createConfiguration(conceroChains)

  return <WagmiProvider config={config}>{children}</WagmiProvider>
}
