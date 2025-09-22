import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'
import { Status } from '@/types'
import { Address } from 'viem'

export enum TxType {
	LBF = 'lbf',
	IOU = 'iou',
	Canonical = 'canonical',
	Message = 'message',
	CCIP = 'ccip_testnet'
}

export type TxChain = {
	id: number
	selector: number
	name: string
}

export type TxToken = {
	name: string
	symbol: string
	address: Address
	decimals: number
	priceUSD: number
	amount: number
}

export type TxDirection = {
	chain: TxChain
	token: TxToken
	address: string
	hash: string
	timestamp: number
}

export type Transaction = {
	type: TxType
	id: string
	status: Status
	isFinalityRequired: boolean
	dstChainGasLimit?: number
	messagePayload: string
	from: TxDirection
	to: TxDirection
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
