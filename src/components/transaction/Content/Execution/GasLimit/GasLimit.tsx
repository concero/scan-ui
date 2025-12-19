import type { ReactElement } from 'react'
import { InfoRow } from '@/components/common'
import { useTransactionsStore } from '@/hooks'

export const GasLimit = (): ReactElement | null => {
	const { txs } = useTransactionsStore()
	const transaction = txs && txs.length > 0 ? txs[0] : null
	const limit: number | null = transaction?.dstChainGasLimit ?? null

	const hasGasLimit: boolean = Boolean(limit)

	if (!hasGasLimit) return null

	return <InfoRow label="DST Gas Limit" value={<>{limit}</>} />
}
