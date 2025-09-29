import type { Transaction } from '@/types'
import { TxsDirection } from '@/types'
import { isAddress } from 'viem'
import { useEffect, useCallback } from 'react'
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
	const isInit = skip === 0
	const direction = dataFilters.direction
	const sender = direction === TxsDirection.Outgoing ? addr : null
	const receiver = direction === TxsDirection.Incoming ? addr : null

	const parameters = {
		take,
		skip,
		...(sender ? { sender } : {}),
		...(receiver ? { receiver } : {}),
	}

	const getTransactionData = useCallback(async (): Promise<Transaction[] | null> => {
		if (!addr) return null

		const res = await fetchTransactions<Transaction[]>(parameters)
		return res.transactions.flat() ?? null
	}, [addr, parameters])

	const { data, isLoading } = useQuery({
		queryKey: ['transaction', addr, direction, skip],
		queryFn: getTransactionData,
		enabled: Boolean(addr),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setDirection(direction)
	}, [direction, setDirection])

	useEffect(() => {
		if (isInit && initialLoading !== isLoading) {
			setInitialLoading(isLoading)
		}
	}, [skip, isLoading, initialLoading, setInitialLoading])

	useEffect(() => {
		if (!isInit && dataLoading !== isLoading) {
			setDataLoading(isLoading)
		}
	}, [skip, isLoading, dataLoading, setDataLoading])

	useEffect(() => {
		if (!data || !isInit) return
		setTransactions(data)
	}, [isInit, data, setTransactions])

	useEffect(() => {
		if (!data || isInit) return
		addTransactions(data)
	}, [isInit, data, addTransactions])
}
