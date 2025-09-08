import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Status, TransactionType } from '@/types'

export type TxChain = {
	id: number
	name: string
	selector: number
	logo: string
	currency: string
}

export type TxToken = {
	name: string
	symbol: string
	amount: number
	usd: number
	logo: string
}

export type TxDirection = {
	token: TxToken
	chain: TxChain
	address: string
	hash: string
	gas: number
}

export type Transaction = {
	messageId: string
	status: Status
	type: TransactionType
	finality: boolean
	timestamp: number
	duration: number
	from: TxDirection
	to: TxDirection
	payload: string
	gasLimit: number
	fees: number
	reason?: string
}

export type TransactionStateSlice = {
	transaction: Transaction | null
	loading: boolean
}

export type TransactionActions = {
	setTransaction: (transaction: Transaction | null) => void
	setLoading: (loading: boolean) => void	
}

export type TransactionState = TransactionStateSlice & TransactionActions
export type TransactionStore = UseBoundStoreWithEqualityFn<StoreApi<TransactionState>>
