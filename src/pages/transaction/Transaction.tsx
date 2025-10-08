import type { FC, ReactElement } from 'react'
import { MetaTags, NotFound } from '@/components/common'
import { useLoadTransaction, useTransactionStore } from '@/hooks'
import { Transaction } from '@/components'
import { ScreenLoader } from '@/components/common/ScreenLoader'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Check the status, timestamp, and key on-chain details of any Concero transaction — a clear, reliable view built for quick validation and developer debugging'

export const TransactionPage: FC = (): ReactElement => {
	useLoadTransaction()
	const { transaction, loading } = useTransactionStore()

	const renderContent = (): ReactElement => {
		switch (true) {
			case loading:
				return <ScreenLoader />
			case !transaction:
				return (
					<NotFound
						resource="Transaction"
						description="We couldn’t locate this transaction. It may not have been processed yet, or thelink might be incorrect."
					/>
				)
			default:
				return <Transaction />
		}
	}
	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>{renderContent()}</main>
		</>
	)
}
