import type { ReactElement } from 'react'
import { TransactionLabel } from '@/components/common'
import { useTransactionStore } from '@/hooks'
import { TxType } from '@/types'
import { InfoRow } from '@/components/common'
import './styles.pcss'

export const Summary = (): ReactElement | null => {
	const { transaction } = useTransactionStore()

	if (!transaction) return null

	const type: TxType | null = transaction.type ?? null
	const srcAddress: string | null = transaction.from?.address ?? null
	const dstAddress: string | null = transaction.to?.address ?? null

	if (!type && !srcAddress && !dstAddress) return null

	return (
		<div className="summary">
			{type && (
				<InfoRow label="Type" value={<TransactionLabel size="s" type={type as TxType} />} copyable={false} />
			)}
			{srcAddress && <InfoRow label="Sender" value={srcAddress} copyable message="Sender Address Copied" />}
			{dstAddress && <InfoRow label="Receiver" value={dstAddress} copyable message="Receiver Address Copied" />}
		</div>
	)
}
