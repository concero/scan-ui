import type { ReactElement } from 'react'
import { TransactionLabel } from '@/components/common'
import { useTransactionsStore } from '@/hooks'
import { TxType } from '@/types'
import { InfoRow } from '@/components/common'
import './styles.pcss'

export const Summary = (): ReactElement | null => {
    const { txs } = useTransactionsStore()
    const transaction = txs && txs.length > 0 ? txs[0] : null

    if (!transaction) return null

    const isMessage: boolean = transaction.type === TxType.Message
    const srcAddress: string | null = transaction.from?.address ?? null
    const dstAddress: string | null = transaction.to?.address ?? null

    if (!transaction.type && !srcAddress && !dstAddress) return null

    return (
        <>
            <div className="summary">
                {transaction.type && (
                    <InfoRow
                        label="Type"
                        value={<TransactionLabel size="s" type={transaction.type as TxType} />}
                        copyable={false}
                    />
                )}
                {!isMessage && (
                    <>
                        {srcAddress && (
                            <InfoRow label="Sender" value={srcAddress} copyable message="Sender Address Copied" />
                        )}
                        {dstAddress && (
                            <InfoRow label="Receiver" value={dstAddress} copyable message="Receiver Address Copied" />
                        )}
                    </>
                )}
            </div>
            <span className="divider" />
        </>
    )
}
