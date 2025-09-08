import type { FC, ReactElement } from 'react'
import { MetaTags, NotFound } from '@/components/common'
import { useLoadTransaction, useTransactionStore } from '@/hooks'
import { Transaction } from '@/components'
import { ScreenLoader } from '@/components/common/ScreenLoader'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const TransactionPage: FC = (): ReactElement => {
	useLoadTransaction()
	const { transaction, loading } = useTransactionStore()

	const renderContent = (): ReactElement => {
		switch (true) {
			case loading:
				return <ScreenLoader />
			case !transaction:
				return <NotFound resource="Transaction" />
			default:
				return <Transaction data={transaction} />
		}
	}

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>{renderContent()}</main>
		</>
	)
}
