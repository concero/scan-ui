import type { Transaction } from '@/types'
import { isHash } from 'viem'
import { useEffect, useCallback, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useTransactionsStore } from '../useTransactionsStore'
import { identifyParam } from '@/utils/identify'
import { fetchTransaction } from '@/utils/tx'

export const useLoadTransaction = (): void => {
	const { identifier } = useParams<{ identifier: string }>()
	const {
		pagination,
		initialLoading,
		dataLoading,
		setTransactions,
		addTransactions,
		setInitialLoading,
		setDataLoading,
		setPagination,
	} = useTransactionsStore()

	const { take, skip } = pagination

	const id = useMemo<string | null>(() => {
		return identifier && isHash(identifier) ? identifier : null
	}, [identifier])

	const initialLoad: boolean = useMemo(() => {
		return skip === 0
	}, [skip])

	const parameters = useMemo(() => {
		return { take, skip }
	}, [take, skip])

	const hasMore = useRef<boolean>(true)

	const getTransactionData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!id) return null

		const paramInfo = await identifyParam(id)
		const { srcHash, dstHash, id: paramId, none } = paramInfo

		const response = await fetchTransaction<Transaction>(id, { srcHash, dstHash, id: paramId, none }, take, skip)
		const transactions = response.transactions ?? null

		if (!transactions || transactions.length === 0) return null
		return transactions
	}, [id, take, skip])

	const { data, isLoading } = useQuery({
		queryKey: ['transaction', id, skip],
		queryFn: getTransactionData,
		enabled: Boolean(id),
		staleTime: 30000,
		retry: 2,
		refetchOnWindowFocus: false,
		retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
		retryOnMount: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
	})

	useEffect(() => {
		if (!Array.isArray(data)) return
		if (data.length < take) hasMore.current = false
		else hasMore.current = true
	}, [data, id, take])

	useEffect(() => {
		if (initialLoad && initialLoading !== isLoading) setInitialLoading(isLoading)
	}, [initialLoad, initialLoading, isLoading, setInitialLoading, id])

	useEffect(() => {
		if (!initialLoad && dataLoading !== isLoading) setDataLoading(isLoading)
	}, [initialLoad, dataLoading, isLoading, setDataLoading, id])

	useEffect(() => {
		if (!data || !initialLoad) return
		setTransactions(data)
	}, [data, initialLoad, setTransactions, id])

	useEffect(() => {
		if (!data || initialLoad) return
		addTransactions(data)
	}, [data, initialLoad, addTransactions, id])

	useEffect(() => {
		if (!id) return

		setPagination({ take: pagination.take, skip: 0 })
		hasMore.current = true
	}, [id, setPagination, pagination.take])
}
