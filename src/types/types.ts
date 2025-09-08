export enum Status {
	Pending = 'pending',
	Success = 'success',
	Canceled = 'canceled',
}

export enum TransactionType {
	Message = 'Message',
	LBFBridge = 'LBF Bridge',
	CanonicalBridge = 'Canonical Bridge',
	IOUBridge = 'IOU Bridge',
}

export type Chain = {
	id: number
	name: string
	selector: number
	logo: string
	currency: string
}

export type Token = {
	name: string
	symbol: string
	amount: number
	usd: number
	logo: string
}

export type Direction = {
	token: Token
	chain: Chain
	address: string
	hash: string
	gas: number
}

export type TransactionData = {
	messageId: string
	status: Status
	type: TransactionType
	finality: boolean
	timestamp: number
	duration: number
	from: Direction
	to: Direction
	payload: string
	gasLimit: number
	fees: number
	reason?: string
}
