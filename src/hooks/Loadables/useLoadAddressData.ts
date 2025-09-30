import type { Transaction } from '@/types'
import type { Address } from 'viem'
import { TxsDirection } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions } from '@/utils/txs'

export const useLoadAddressData = (): void => {
	const { address } = useParams<{ address: string }>()
	const {
		dataFilters,
		pagination,
		initialLoading,
		dataLoading,
		setTransactions,
		addTransactions,
		setDirection,
		setInitialLoading,
		setDataLoading,
	} = useAddressStore()

	const { take, skip } = pagination
	const { direction } = dataFilters

	const addr: Address | null = address && isAddress(address) ? address : null
	const initialLoad: boolean = useMemo(() => {
		const result = skip === 0
		return result
	}, [skip])

	const sender: Address | null = useMemo(() => {
		const result = direction === TxsDirection.Outgoing ? addr : null
		return result
	}, [direction, addr])

	const receiver: Address | null = useMemo(() => {
		const result = direction === TxsDirection.Incoming ? addr : null
		return result
	}, [direction, addr])

	const parameters = useMemo(() => {
		const params: { take: number; skip: number; sender?: string; receiver?: string } = { take, skip }
		if (sender) params.sender = sender
		if (receiver) params.receiver = receiver
		return params
	}, [take, skip, sender, receiver])

	const hasMore = useRef<boolean>(true)

	const getAddressData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!addr) return null

		const response = await fetchTransactions<Transaction[]>(parameters)
		const transactions = response.transactions.flat() ?? null
		return transactions
	}, [addr, parameters])

	const { data, isLoading } = useQuery({
		queryKey: ['transaction', addr, direction, skip],
		queryFn: getAddressData,
		enabled: Boolean(addr) && hasMore.current,
		staleTime: 30000,
		retry: 1,
		retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
		refetchOnWindowFocus: false,
		retryOnMount: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	})

	useEffect(() => {
		setDirection(direction)
	}, [direction, setDirection])

	useEffect(() => {
		if (!Array.isArray(data)) return
		if (data.length < take) hasMore.current = false
		else hasMore.current = true
	}, [data])

	useEffect(() => {
		if (initialLoad && initialLoading !== isLoading) setInitialLoading(isLoading)
	}, [initialLoad, initialLoading, isLoading, setInitialLoading])

	useEffect(() => {
		if (!initialLoad && dataLoading !== isLoading) setDataLoading(isLoading)
	}, [initialLoad, dataLoading, isLoading, setDataLoading])

	useEffect(() => {
		if (!data || !initialLoad) return
		setTransactions(data)
	}, [data, initialLoad, setTransactions])

	useEffect(() => {
		if (!data || initialLoad) return
		addTransactions(data)
	}, [data, initialLoad, addTransactions])
}
