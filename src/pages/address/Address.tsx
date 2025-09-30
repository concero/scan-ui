import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'
import { useAddressStore, useLoadAddressData } from '@/hooks'
import { NotFound } from '@/components/common'
import { ScreenLoader } from '@/components/common/ScreenLoader'
import { useSyncParams } from '@/hooks/useSyncParams'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const AddressPage: FC = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	const { txs, initialLoading } = useAddressStore()
	useSyncParams()
	useLoadAddressData()

	const render = (): ReactElement => {
		switch (true) {
			case initialLoading:
				return <ScreenLoader />
			case !txs:
				return (
					<NotFound
						resource="Address"
						description="We couldn’t find this address. It may be incorrect or doesn’t have any transactions yet."
					/>
				)
			default:
				return <Address address={address} />
		}
	}

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>{render()}</main>
		</>
	)
}
