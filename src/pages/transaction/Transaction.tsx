import type { FC, ReactElement } from 'react'
import { MetaTags, NotFound } from '@/components/common'
import { useLoadTransaction, useTransactionsStore } from '@/hooks'
import { Transaction } from '@/components'
import { useParams } from 'react-router-dom'
import { ScreenLoader } from '@/components/common/ScreenLoader'
import { Transactions } from '@/components/transactions/Transactions'
import { useMemo } from 'react'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
    'Check the status, timestamp, and key on-chain details of any Concero transaction — a clear, reliable view built for quick validation and developer debugging'

export const TransactionPage: FC = (): ReactElement => {
    const { identifier } = useParams<{ identifier: string }>()
    useLoadTransaction()
    const { txs, initialLoading } = useTransactionsStore()

    const content = useMemo((): ReactElement => {
        switch (true) {
            case initialLoading:
                return <ScreenLoader />

            case !txs || txs.length === 0:
                return (
                    <NotFound
                        resource="Transaction"
                        description="We couldn’t locate this transaction. It may not have been processed yet, or the link might be incorrect."
                    />
                )

            case (txs?.length ?? 0) > 1:
                return <Transactions txHash={identifier} />

            default:
                return <Transaction />
        }
    }, [txs, initialLoading, identifier])

    return (
        <>
            <MetaTags title={META_TITLE} description={META_DESCRIPTION} />
            <main>{content}</main>
        </>
    )
}
