import type { ReactElement } from 'react'
import type { TransactionData } from './types'
import { MessageDetails, TransactionDetails, TransactionTimestamp } from '../common'
import { TransactionSummary } from '../common'
import { TransactionFinality } from '../common'
import { TransactionExecutionInfo } from '../common'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import { Skeleton } from '../common'
import { useNavigation } from '@/hooks'
import './styles.pcss'

type TransactionProps = {
	data: TransactionData
	loading: boolean
}

export const Transaction = ({ data, loading }: TransactionProps): ReactElement => {
	const { back } = useNavigation()
	const { messageId, status, reason, from, to, type, finality, timestamp, duration, payload, gasLimit, fees } = data

	const divider = <span className="transaction_divider" />

	return (
		<div className="transaction">
			<IconButton size="m" variant="secondary" onClick={back} className="back_button">
				<ArrowLeftIcon />
			</IconButton>
			<div className="transaction_content">
				{loading ? <Skeleton width={215} height={36} /> : <span className="transaction_title">{type}</span>}

				<MessageDetails messageId={messageId} status={status} reason={reason} loading={loading} />
				{divider}
				<TransactionSummary sender={from.address} receiver={to.address} type={type} loading={loading} />
				{divider}
				<TransactionFinality finality={finality} loading={loading} />
				{divider}
				<TransactionTimestamp timestamp={timestamp} duration={duration} loading={loading} />
				{divider}
				<TransactionDetails from={from} to={to} loading={loading} />
				{divider}
				<TransactionExecutionInfo
					payload={payload}
					gasLimit={gasLimit}
					fees={fees}
					dstCurrency={to.token.symbol}
					feeCurrency={from.token.symbol}
					loading={loading}
				/>
			</div>
		</div>
	)
}
