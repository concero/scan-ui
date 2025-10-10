import type { ReactElement } from 'react'
import { useTransactionsStore } from '@/hooks'
import { TxTypeLabels } from '@/utils/labels'
import './styles.pcss'

export const Title = (): ReactElement => {
    const { txs } = useTransactionsStore()
    const transaction = txs && txs.length > 0 ? txs[0] : null
    const type = transaction?.type

    return (
        <span className="tx_title">
            {type !== undefined && type in TxTypeLabels ? TxTypeLabels[type as keyof typeof TxTypeLabels] : 'Unknown'}
        </span>
    )
}
