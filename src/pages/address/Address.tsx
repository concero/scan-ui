import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'
import { useAddressStore, useLoadAddress } from '@/hooks'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const AddressPage: FC = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	useLoadAddress()
	const { txs, loading } = useAddressStore()

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Address address={address} data={txs ?? []} isTestnet={false} loading={loading} />
			</main>
		</>
	)
}
