import type { Transaction } from '@/types'
import { isAddress, isHash } from 'viem'
import { useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions } from '@/utils/txs'

export const useLoadAddress = (): void => {
	const { address } = useParams<{ address: string }>()
	const { setTransactions, setLoading } = useAddressStore()

	const getData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!address || !isAddress(address)) return null

		const response = await fetchTransactions<Transaction[]>({
			take: 10,
			skip: 0,
			sender: address,
		})

		console.log(response)

		return response.transactions.flat() ?? null
	}, [address])

	const { data: transaction, isLoading } = useQuery({
		queryKey: ['transaction', address],
		queryFn: getData,
		enabled: Boolean(address) && isAddress(address ?? ''),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setTransactions(transaction ?? null)
		setLoading(isLoading)
	}, [transaction, isLoading, setTransactions, setLoading])
}
