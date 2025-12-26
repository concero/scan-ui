import { useSwitchChain, useChainId } from 'wagmi'
import { useCallback } from 'react'

export const useSwitchNetwork = (chainId: number) => {
	const { switchChainAsync } = useSwitchChain()
	const currentChainId: number = useChainId()

	const switchNetwork = useCallback(async (): Promise<boolean> => {
		try {
			await switchChainAsync({ chainId: chainId })
			console.log(`[Concero Scan]: Successfully switched to chain ${chainId}`)
			return true
		} catch (error) {
			console.error(`[Concero Scan]: Failed to switch to chain ${chainId}:`, error)
			return false
		}
	}, [currentChainId, chainId, switchChainAsync])

	return {
		switchNetwork,
	}
}
