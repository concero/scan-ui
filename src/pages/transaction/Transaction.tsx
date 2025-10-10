import type { FC, ReactElement } from 'react'
import { MetaTags, NotFound } from '@/components/common'
import { useLoadTransaction, useTransactionsStore } from '@/hooks'
import { Transaction } from '@/components'
import { useParams } from 'react-router-dom'
import { ScreenLoader } from '@/components/common/ScreenLoader'
import { Transactions } from '@/components/transactions/Transactions'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
    'Check the status, timestamp, and key on-chain details of any Concero transaction — a clear, reliable view built for quick validation and developer debugging'

export const TransactionPage: FC = (): ReactElement => {
    const { identifier } = useParams<{ identifier: string }>()
    useLoadTransaction()
    const { txs, initialLoading, dataLoading } = useTransactionsStore()

    const loading = initialLoading || dataLoading

    const renderContent = (): ReactElement => {
        if (loading) {
            return <ScreenLoader />
        }

        if (!txs || txs.length === 0) {
            return (
                <NotFound
                    resource="Transaction"
                    description="We couldn’t locate this transaction. It may not have been processed yet, or the link might be incorrect."
                />
            )
        }

        if (txs.length > 1) {
            return <Transactions txHash={identifier} />;
        }

        return <Transaction />
    }

    return (
        <>
            <MetaTags title={META_TITLE} description={META_DESCRIPTION} />
            <main>{renderContent()}</main>
        </>
    )
}
