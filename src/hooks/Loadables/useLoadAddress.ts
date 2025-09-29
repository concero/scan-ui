import type { Transaction } from '@/types'
import { TxsDirection } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAddressStore } from '../useAddressStore'
import { fetchTransactions } from '@/utils/txs'

export const useLoadAddress = (): void => {
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

  const addr = address && isAddress(address) ? address : null
  const direction = dataFilters.direction

  const initialLoad = useMemo(() => skip === 0, [skip])
  const sender = useMemo(() => (direction === TxsDirection.Outgoing ? addr : null), [direction, addr])
  const receiver = useMemo(() => (direction === TxsDirection.Incoming ? addr : null), [direction, addr])

  const parameters = useMemo(() => {
    const params: { take: number; skip: number; sender?: string; receiver?: string } = { take, skip }
    if (sender) params.sender = sender
    if (receiver) params.receiver = receiver
    return params
  }, [take, skip, sender, receiver])

  const hasMore = useRef(false)

  const getTransactionData = useCallback(async (): Promise<Transaction[] | null> => {
    if (!addr) return null
    try {
      const res = await fetchTransactions<Transaction[]>(parameters)
      return res.transactions.flat() ?? null
    } catch (error) {
      return null
    }
  }, [addr, parameters])

  const { data, isLoading } = useQuery({
    queryKey: ['transaction', addr, direction, skip],
    queryFn: getTransactionData,
    enabled: Boolean(addr) && !hasMore.current,
    staleTime: 30000,
    retry: 1,
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    hasMore.current = data?.length === 0
  }, [data])

  useEffect(() => {
    setDirection(direction)
  }, [direction, setDirection])

  useEffect(() => {
    if (initialLoad && initialLoading !== isLoading) setInitialLoading(isLoading)
    if (!initialLoad && dataLoading !== isLoading) setDataLoading(isLoading)
  }, [initialLoad, isLoading, initialLoading, dataLoading, setInitialLoading, setDataLoading])

  useEffect(() => {
    if (!data) return
    if (initialLoad) setTransactions(data)
    else addTransactions(data)
  }, [data, initialLoad, setTransactions, addTransactions])
}
