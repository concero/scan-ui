import type { Transaction } from '@/stores'
import { isHash } from 'viem'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTransactionStore } from '../useTranscationStore'
import { useParams } from 'react-router-dom'
import { MOCK_TRANSACTION } from './mockTransaction'

export const useLoadTransaction = (): void => {
  const { messageId } = useParams<{ messageId: string }>()
  const { setTransaction, setLoading } = useTransactionStore()

  const getData = async (): Promise<Transaction | null> => {
    if (!messageId || !isHash(messageId)) {
      return null
    }
    await new Promise((resolve) => setTimeout(resolve, 350))
    return MOCK_TRANSACTION
  }

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['transaction', messageId],
    queryFn: getData,
    enabled: !!messageId && isHash(messageId),
    staleTime: 30_000,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) setTransaction(data)
    
    setLoading(isLoading)
  }, [data, isLoading, setTransaction, setLoading])
}
