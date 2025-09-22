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
    sender?: string  
    receiver?: string
}

export const fetchTransactions = async <T = unknown>({
    take,
    skip,
    sender,
    receiver,
}: SenderOrReceiver): Promise<TransactionResponse<T>['payload']> => {
    const url = new URL('https://dev.concero.io/api/v1/scan/tx')

    url.searchParams.set('take', String(take))
    url.searchParams.set('skip', String(skip))

    if (sender && receiver) {
        throw new Error('Only one of sender or receiver must be provided.')
    }

    if (sender) {
        url.searchParams.set('sender', sender)
        url.searchParams.set('receiver', '')
    } else if (receiver) {
        url.searchParams.set('sender', '')
        url.searchParams.set('receiver', receiver)
    } else {
        url.searchParams.set('sender', '')
        url.searchParams.set('receiver', '')
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
