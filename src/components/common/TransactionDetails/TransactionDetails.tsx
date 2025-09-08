import type { ReactElement } from 'react'
import type { Direction } from '@/types'
import { TransactionInfo } from '../TransactionInfo'
import './styles.pcss'

type TransactionDetailsProps = {
    from: Direction
    to: Direction
}

export const TransactionDetails = ({ from, to }: TransactionDetailsProps): ReactElement => (
    <div className="transaction_details">
        <div className="transaction_details_row">
            <span className="transaction_details_label">From</span>
            <TransactionInfo details={from} />
        </div>

        <div className="transaction_details_row">
            <span className="transaction_details_label">To</span>
            <TransactionInfo details={to} />
        </div>
    </div>
)
