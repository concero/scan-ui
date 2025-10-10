import type { ReactElement } from 'react'
import { DataTable } from '../common'
import { PageHeading } from '../common'
import { useTransactionsStore } from '@/hooks'
import { useMemo } from 'react'
import './styles.pcss'

type AddressProps = {
    txHash?: string
}

export const Transactions = ({ txHash }: AddressProps): ReactElement => {
    const { txs, dataLoading } = useTransactionsStore()
    const content = useMemo(() => <PageHeading value={txHash} type="TxHash" />, [txHash])
    const table = useMemo(() => <DataTable txs={txs} dataLoading={dataLoading} />, [txs, dataLoading])

    return (
        <div className="transactions">
            {content}
            {table}
        </div>
    )
}
