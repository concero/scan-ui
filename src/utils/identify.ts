export type IdentifyParam = string | undefined

export type IdentifyPayload = {
	srcHash: boolean
	dstHash: boolean
	id: boolean
	none: boolean
}

export type IdentifyResponse = {
	code: string
	payload: IdentifyPayload
}

export const identifyParam = async (hashOrId: IdentifyParam): Promise<IdentifyPayload> => {
	const trimmed = hashOrId?.trim()
	if (!trimmed) {
		throw new Error("The parameter 'hashOrId' is required and cannot be empty.")
	}

	const url = new URL('https://api.v2.concero.io/api/v1/scan/observe')
	url.searchParams.set('hashOrId', trimmed)

	const response = await fetch(url.toString(), {
		headers: { Accept: 'application/json' },
	})

	if (!response.ok) {
		throw new Error(`Failed to fetch identification data: ${response.status} ${response.statusText}`)
	}

	const data: IdentifyResponse = await response.json()

	if (data.code !== 'ok') {
		throw new Error(`API returned error code: ${data.code}`)
	}

	return data.payload
}
