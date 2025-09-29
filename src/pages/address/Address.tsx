import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'
import { useAddressStore, useLoadAddress } from '@/hooks'
import { NotFound } from '@/components/common'
import { ScreenLoader } from '@/components/common/ScreenLoader'
import { useSyncParams } from '@/hooks/useSyncParams'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const AddressPage: FC = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	useSyncParams()
	useLoadAddress()
	const { txs, initialLoading, dataLoading } = useAddressStore()

	const renderContent = (): ReactElement => {
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
				return <Address address={address} data={txs ?? []} isTestnet={false} loading={dataLoading} />
		}
	}

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>{renderContent()}</main>
		</>
	)
}
