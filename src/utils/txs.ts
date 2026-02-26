import { Filters } from '@/stores'

type Pagination = {
	count: number
	skip: number
	take: number
}

type TransactionResponse<T = unknown> = {
	code: string
	payload: {
		transactions: T[]
		pagination: Pagination
	}
}

export type SenderOrReceiver = {
	take: number
	skip: number
	filters: Filters
	sender?: string
	receiver?: string
}

export const fetchTransactions = async <T = unknown>({
	take,
	skip,
	filters,
	sender,
	receiver,
}: SenderOrReceiver): Promise<TransactionResponse<T>['payload']> => {
	const url = new URL('https://api.v2.concero.io/api/v1/scan/tx')

	url.searchParams.set('take', String(take))
	url.searchParams.set('skip', String(skip))

	if (sender && receiver) {
		throw new Error('Only one of sender or receiver must be provided.')
	}

	if (sender) {
		url.searchParams.set('sender', sender)
	} else if (receiver) {
		url.searchParams.set('receiver', receiver)
	} else {
		throw new Error('Either sender or receiver must be provided.')
	}
	if (filters.fromChainIds) {
		url.searchParams.set('fromChainId', filters.fromChainIds.join(','))
	}
	if (filters.toChainIds) {
		url.searchParams.set('toChainId', filters.toChainIds.join(','))
	}
	if (filters.status) {
		url.searchParams.set('status', filters.status)
	}
	if (filters.type === 'v2') { 
		url.searchParams.set('type', 'message')
	} else if (filters.type) {
		url.searchParams.set('type', filters.type)
	}

	const response = await fetch(url.toString(), {
		headers: {
			Accept: 'application/json',
		},
	})

	if (!response.ok) {
		throw new Error(`Failed to fetch transaction: ${response.status} ${response.statusText}`)
	}

	const data: TransactionResponse<T> = await response.json()

	if (data.code !== 'ok') {
		throw new Error(`API returned error code: ${data.code}`)
	}

	return data.payload
}
