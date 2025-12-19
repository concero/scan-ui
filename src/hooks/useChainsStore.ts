import { useContext } from 'react'
import { ChainsContext } from '@/stores'

export const useChainsStore = () => {
	const useStore = useContext(ChainsContext)
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <ChainsStoreProvider>.`)
	}

	const chains = useStore(state => state.chains)
	const loading = useStore(state => state.isLoading)
	const setChains = useStore(state => state.setChains)
	const setLoading = useStore(state => state.setLoading)

	return {
		chains,
		loading,
		setChains,
		setLoading,
	}
}
