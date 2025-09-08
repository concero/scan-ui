import type { Transaction } from '@/stores'
import { isHash } from 'viem'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTransactionStore } from '../useTransactionStore'
import { useParams } from 'react-router-dom'
import { MOCK_TRANSACTION } from './mockTransaction'

export const useLoadTransaction = (): void => {
	const { identifier } = useParams<{ identifier: string }>()
	const { setTransaction, setLoading } = useTransactionStore()

	const getData = async (): Promise<Transaction | null> => {
		await new Promise(resolve => setTimeout(resolve, 750))
		return MOCK_TRANSACTION
	}

	const { data, isLoading } = useQuery({
		queryKey: ['transaction', identifier],
		queryFn: getData,
		enabled: !!identifier && isHash(identifier),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setTransaction(data ?? null)
		setLoading(isLoading)
	}, [data, isLoading, setTransaction, setLoading])
}
