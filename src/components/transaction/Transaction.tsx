import type { ReactElement } from 'react'
import type { TransactionData } from '@/types'
import { MessageDetails, TransactionDetails, TransactionTimestamp } from '../common'
import { TransactionSummary } from '../common'
import { TransactionFinality } from '../common'
import { TransactionExecutionInfo } from '../common'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import { useNavigation } from '@/hooks'
import { useMemo, useCallback, memo } from 'react'
import './styles.pcss'

type TransactionProps = {
	data: TransactionData
}

export const Transaction = memo(({ data }: TransactionProps): ReactElement => {
	const { back } = useNavigation()
	const onBack = useCallback(() => back(), [back])
	const { messageId, status, reason, from, to, type, finality, timestamp, duration, payload, gasLimit, fees } = data

	const memoDivider = useMemo(() => <span className="transaction_divider" />, [])

	return (
		<div className="transaction_wrapper">
			<div className="transaction">
				<IconButton size="m" variant="secondary" onClick={onBack} className="back_button">
					<ArrowLeftIcon />
				</IconButton>
				<div className="transaction_content">
					<span className="transaction_title">{type}</span>
					<MessageDetails {...{ messageId, status, reason }} />
					{memoDivider}
					<TransactionSummary {...{ sender: from.address, receiver: to.address, type }} />
					{memoDivider}
					<TransactionFinality {...{ finality }} />
					{memoDivider}
					<TransactionTimestamp {...{ timestamp, duration }} />
					{memoDivider}
					<TransactionDetails {...{ from, to }} />
					{memoDivider}
					<TransactionExecutionInfo
						{...{
							payload,
							gasLimit,
							fees,
							dstCurrency: to.token.symbol,
							feeCurrency: from.token.symbol,
						}}
					/>
				</div>
			</div>
		</div>
	)
})
