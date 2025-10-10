import type { ReactElement } from 'react'
import { StatusLabel } from '../../../common/StatusLabel'
import { InfoRow } from '../../../common/InfoRow'
import { useTransactionsStore } from '@/hooks'
import './styles.pcss'

type Row = {
    label: string
    value: ReactElement | string | number
    copyable: boolean
    message?: string
}

export const Message = (): ReactElement | null => {
    const { txs } = useTransactionsStore()
    const transaction = txs && txs.length > 0 ? txs[0] : null

    const rows: Row[] = [
        transaction?.id && {
            label: 'Concero message ID',
            value: transaction.id,
            copyable: true,
            message: 'Message ID Copied',
        },
        transaction?.status && {
            label: 'Status',
            value: <StatusLabel status={transaction.status} size="s" />,
            copyable: false,
        },
    ].filter(Boolean) as Row[]

    if (!rows.length) return null

    return (
        <>
            <div className="message">
                {rows.map(({ label, value, copyable }) => (
                    <InfoRow key={label} label={label} value={value} copyable={copyable} />
                ))}
            </div>
            <span className="divider" />
        </>
    )
}
