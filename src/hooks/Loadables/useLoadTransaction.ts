import type { Transaction } from '@/stores'
import { isHash } from 'viem'
import { useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTransactionStore } from '../useTransactionStore'
import { useParams } from 'react-router-dom'
import { identifyParam } from '@/utils/identify'
import { fetchTransaction } from '@/utils/tx'

export const useLoadTransaction = (): void => {
	const { identifier } = useParams<{ identifier: string }>()
	const { setTransaction, setLoading } = useTransactionStore()

	const getData = useCallback(async (): Promise<Transaction | null> => {
		if (!identifier) return null

		const paramInfo = await identifyParam(identifier)
		const { srcHash, dstHash, id, none } = paramInfo

		const response = await fetchTransaction<Transaction>(identifier, { srcHash, dstHash, id, none })

		return response.transactions?.[0] ?? null
	}, [identifier])

	const { data: transaction, isLoading } = useQuery({
		queryKey: ['transaction', identifier],
		queryFn: getData,
		enabled: Boolean(identifier) && isHash(identifier ?? ''),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		console.log('useLoadTransaction effect', { transaction, isLoading })
		setTransaction(transaction ?? null)
		setLoading(isLoading)
	}, [transaction, isLoading, setTransaction, setLoading])
}
