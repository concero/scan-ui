import type { FC, ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { MetaTags } from '@/components/common'
import { Status, TransactionType } from '@/components'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'
import { MOCK_ADDRESS_DATA } from './mockData'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

type AddressDirection = {
	logo: string
	address: string
}

export type AddressData = {
	messageId: string
	type: TransactionType
	timestamp: number
	status: Status
	from: AddressDirection
	to: AddressDirection
}

export type AddressResponse = {
	isTestnet: boolean
	data: AddressData[]
}

export const AddressPage: FC = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	const [response, setResponse] = useState<AddressResponse | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setResponse(MOCK_ADDRESS_DATA)
			setLoading(false)
		}, 2000)
		return () => clearTimeout(timer)
	}, [])

	if (loading || !response) {
		return <div>Loading...</div>
	}

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Address address={address} data={response.data} isTestnet={response.isTestnet} loading={loading} />
			</main>
		</>
	)
}
