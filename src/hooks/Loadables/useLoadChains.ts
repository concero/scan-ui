import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChainsStore } from '../useChainsStore'
import { getChains, toConceroChains } from '@/utils/chains'

export const useLoadChains = () => {
	const { setChains, setLoading } = useChainsStore()

	const {
		data: chains,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['chainsConfig'],
		queryFn: async () => {
			const [mainnetResponse, testnetResponse] = await Promise.all([getChains(false), getChains(true)])

			const mainnetChains = toConceroChains(mainnetResponse.payload.items)
			const testnetChains = toConceroChains(testnetResponse.payload.items)

			return [...mainnetChains, ...testnetChains]
		},
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setChains(chains || [])
		setLoading(isLoading)
	}, [chains, isLoading, setChains, setLoading])

	return {
		chains: chains || [],
		loading: isLoading,
		error,
	}
}
