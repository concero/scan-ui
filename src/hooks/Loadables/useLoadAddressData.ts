import type { Address } from 'viem'
import { Status, Transaction, TxType } from '@/types'
import { TxsDirection } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions, SenderOrReceiver } from '@/utils/txs'
import { useParamsSync } from '../useParamsSync'

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
		setPagination,
	} = useAddressStore()

	useParamsSync(address)

	const { take, skip } = pagination
	const { direction, fromChainIds, status, toChainIds, type } = dataFilters

	const addr = useMemo<Address | null>(() => {
		return address && isAddress(address) ? address : null
	}, [address])

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
		const params: SenderOrReceiver = { take, skip, filters: { direction } }
		if (sender) params.sender = sender
		if (receiver) params.receiver = receiver
		if (type) params.filters.type = type === TxType.All ? undefined : type
		if (fromChainIds) params.filters.fromChainIds = fromChainIds
		if (toChainIds) params.filters.toChainIds = toChainIds
		if (status) params.filters.status = status === Status.All ? undefined : status

		return params
	}, [take, skip, direction, sender, receiver, type, fromChainIds, toChainIds, status])

	const hasMore = useRef<boolean>(true)

	const getAddressData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!addr) return null

		const response = await fetchTransactions<Transaction[]>(parameters)
		const transactions = response.transactions.flat() ?? null
		return transactions
	}, [addr, parameters])

	const { data, isLoading } = useQuery({
		queryKey: [
			'transaction',
			addr,
			direction,
			status,
			type,
			dataFilters.fromTimestamp,
			dataFilters.toTimestamp,
			dataFilters.fromChainIds,
			dataFilters.toChainIds,
			skip,
		],
		queryFn: getAddressData,
		enabled: Boolean(addr),
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
	}, [data, addr])

	useEffect(() => {
		if (initialLoad && initialLoading !== isLoading) setInitialLoading(isLoading)
	}, [initialLoad, initialLoading, isLoading, setInitialLoading, addr])

	useEffect(() => {
		if (!initialLoad && dataLoading !== isLoading) setDataLoading(isLoading)
	}, [initialLoad, dataLoading, isLoading, setDataLoading, addr])

	useEffect(() => {
		if (!data || !initialLoad) return

		setTransactions(data)
	}, [data, initialLoad, setTransactions, addr])

	useEffect(() => {
		if (!data || initialLoad) return
		addTransactions(data)
	}, [data, initialLoad, addTransactions, addr])

	useEffect(() => {
		if (!addr) return

		setPagination({ take: pagination.take, skip: 0 })
		hasMore.current = true
	}, [addr, setPagination])
}
