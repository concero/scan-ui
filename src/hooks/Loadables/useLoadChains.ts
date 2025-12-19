import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChainsStore } from '../useChainsStore'
import { getChains, toConceroChains } from '@/utils/chains'

export const useLoadChains = () => {
	const { setChains, setLoading } = useChainsStore()

	const { data: chains, isLoading: isLoading } = useQuery({
		queryKey: ['chainsConfig'],
		queryFn: async () => {
			const response = await getChains()
			return toConceroChains(response.payload.items)
		},
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setChains(chains || [])
		setLoading(isLoading)
	}, [chains, isLoading, setChains, setLoading])

	return { chains: chains, loading: isLoading }
}
