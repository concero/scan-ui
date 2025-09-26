import type { Address } from 'viem'
import type { Transaction } from '@/types'
import { TxsDirection } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions } from '@/utils/txs'

const ITEMS_PER_PAGE = 20

export const useLoadAddress = (): void => {
	const { address } = useParams<{ address: string }>()
	const { direction, page, setTransactions, setDirection, setCount, setLoading } = useAddressStore()

	const getData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!address || !isAddress(address)) return null

		const sender: Address | null = direction === TxsDirection.Outgoing ? address : null
		const receiver: Address | null = direction === TxsDirection.Incoming ? address : null
		const skip = (page - 1) * ITEMS_PER_PAGE

		const params = {
			take: ITEMS_PER_PAGE,
			skip,
			...(sender ? { sender } : {}),
			...(receiver ? { receiver } : {}),
		}

		const response = await fetchTransactions<Transaction[]>(params)
		setCount(response.pagination.count ?? 0)
		return response.transactions.flat() ?? null
	}, [address, direction, page])

	const { data: transaction, isLoading } = useQuery({
		queryKey: ['transaction', address, direction, page],
		queryFn: getData,
		enabled: Boolean(address) && isAddress(address ?? ''),
		staleTime: 30_000,
		retry: 0,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setDirection(direction)
	}, [direction, setDirection])

	useEffect(() => {
		setTransactions(transaction ?? null)
		setLoading(isLoading)
	}, [transaction, isLoading, setTransactions, setLoading])
}
