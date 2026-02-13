type Validator = {
	srcHash: boolean
	dstHash: boolean
	id: boolean
	none: boolean
}

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

export const fetchTransaction = async <T = unknown>(
	identifier: string,
	validator: Validator,
	take: number = 10,
	skip: number = 0,
): Promise<TransactionResponse<T>['payload']> => {
	if (!identifier.trim()) {
		throw new Error('Identifier cannot be empty')
	}

	const url = new URL('https://dev.concero.io/api/v1/scan/tx')
	url.searchParams.set('take', take.toString())
	url.searchParams.set('skip', skip.toString())

	switch (true) {
		case validator.srcHash:
			url.searchParams.set('srcHash', identifier)
			break
		case validator.dstHash:
			url.searchParams.set('dstHash', identifier)
			break
		case validator.id:
			url.searchParams.set('messageId', identifier)
			break
		default:
			break
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
