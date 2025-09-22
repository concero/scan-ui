import type { ReactElement } from 'react'
import { InfoRow } from '@/components/common'
import { useTransactionStore } from '@/hooks'

export const GasLimit = (): ReactElement | null => {
	const { transaction } = useTransactionStore()
    const limit: number | null = transaction?.dstChainGasLimit ?? null

    const hasGasLimit: boolean = Boolean(limit)

    if (!hasGasLimit) return null

	return (
		<InfoRow
			label="DST Gas Limit"
			value={
				<>
					{limit} <span className="gas_limit_currency">{'ETH'}</span>
				</>
			}
		/>
	)
}
