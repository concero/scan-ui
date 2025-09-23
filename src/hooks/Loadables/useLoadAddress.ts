import { TxsDirection, type Transaction } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions } from '@/utils/txs'

export const useLoadAddress = (): void => {
	const { address } = useParams<{ address: string }>()
	const { direction, setTransactions, setLoading } = useAddressStore()

	const getData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!address || !isAddress(address)) return null

		const sender = direction === TxsDirection.Outgoing ? address : null
		const receiver = direction === TxsDirection.Incoming ? address : null

		const params = {
			take: 9,
			skip: 0,
			...(sender ? { sender } : {}),
			...(receiver ? { receiver } : {}),
		}

		const response = await fetchTransactions<Transaction[]>(params)

		return response.transactions.flat() ?? null
	}, [address, direction])

	const { data: transaction, isLoading } = useQuery({
		queryKey: ['transaction', address, direction],
		queryFn: getData,
		enabled: Boolean(address) && isAddress(address ?? ''),
		staleTime: 30_000,
		retry: 0,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setTransactions(transaction ?? null)
		setLoading(isLoading)
	}, [transaction, isLoading, setTransactions, setLoading])
}
