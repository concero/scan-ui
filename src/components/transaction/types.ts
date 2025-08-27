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

export type Direction = {
	chain: Chain
	hash: string
	gas: number
}

export type TransactionData = {
	messageId: string
	status: Status
	type: TransactionType
	sender: string
	receiver: string
	finality: boolean
	timestamp: number
	duration: number
	from: Direction
	to: Direction
	reason?: string
}
