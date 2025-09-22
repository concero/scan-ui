import type { ReactElement } from 'react'
import { InfoRow } from '@/components/common'
import { useTransactionStore } from '@/hooks'

export const GasLimit = (): ReactElement | null => {
	const { transaction } = useTransactionStore()
    const limit: number | null = transaction?.dstChainGasLimit ?? null
    const currency: string | null = transaction?.to.token.symbol ?? null

    const hasGasLimit: boolean = Boolean(limit && currency)

    if (!hasGasLimit) return null

	return (
		<InfoRow
			label="DST Gas Limit"
			value={
				<>
					{limit} <span className="tx_currency">{currency}</span>
				</>
			}
		/>
	)
}
