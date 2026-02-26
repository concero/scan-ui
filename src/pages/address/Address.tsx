import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'
import { useAddressStore, useLoadAddressData } from '@/hooks'
import { NotFound } from '@/components/common'
import { ScreenLoader } from '@/components/common/ScreenLoader'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Explore any address to see its activity across Concero — recent transactions and interactions in one clear, unified view'

const AddressPage: FC = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	const { txs, initialLoading } = useAddressStore()

	useLoadAddressData()

	const render = (): ReactElement => {
		switch (true) {
			case initialLoading:
				return <ScreenLoader />
			case !txs || txs.length === 0:
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
export default AddressPage
