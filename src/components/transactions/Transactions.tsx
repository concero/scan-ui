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
    const { txs, dataLoading, pagination, setPagination } = useTransactionsStore()
    const content = useMemo(() => <PageHeading value={txHash} type="TxHash" />, [txHash])
    const table = useMemo(
        () => (
            <DataTable
                txs={txs}
                dataLoading={dataLoading}
                pagination={pagination}
                setPagination={setPagination}
            />
        ),
        [txs, dataLoading, pagination, setPagination]
    )

    return (
        <div className="transactions">
            {content}
            {table}
        </div>
    )
}
