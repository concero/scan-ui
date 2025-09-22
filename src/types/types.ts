import type { Address } from 'viem'

export enum Status {
	Pending = 'pending',
	Success = 'success',
	Canceled = 'canceled',
}

export enum TxType {
	LBF = 'lbf',
	IOU = 'iou',
	Canonical = 'canonical',
	Message = 'message',
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
