import { memo, type ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import { useClipboard } from '@/hooks'
import { WarningIcon } from '@/assets'
import './styles.pcss'

type TransactionExecutionInfoProps = {
	readonly payload: string
	readonly gasLimit: number
	readonly fees: number
	readonly dstCurrency: string
	readonly feeCurrency: string
	readonly hasRetry?: boolean
}

type InfoRowProps = {
	label: string
	value: React.ReactNode
	className?: string
}

const InfoRow = ({ label, value, className = '' }: InfoRowProps) => (
	<div className={`transaction_execution_row ${className}`}>
		<span className="transaction_execution_label">{label}</span>
		<span className="transaction_execution_value">{value}</span>
	</div>
)

export const TransactionExecutionInfo = memo(function TransactionExecutionInfo({
	payload,
	gasLimit,
	fees,
	dstCurrency,
	feeCurrency,
	hasRetry = true,
}: TransactionExecutionInfoProps): ReactElement {
	const { copy, copied } = useClipboard()

	return (
		<div className="transaction_execution_info">
			<div className="transaction_execution_content">
				<div className="transaction_execution_row payload_row">
					<span className="transaction_execution_label">Message Payload</span>
					<div className="transaction_execution_payload">
						<span className="transaction_execution_value_payload">{payload}</span>
						<div className="transaction_execution_action">
							<Button size="s" variant="secondary" onClick={() => copy(payload)}>
								{copied ? 'Copied!' : 'Copy'}
							</Button>
						</div>
					</div>
				</div>
				<InfoRow
					label="DST Gas Limit"
					value={
						<>
							{gasLimit}
							<span className="transaction_execution_currency">{dstCurrency}</span>
						</>
					}
				/>
				<InfoRow
					label="Concero Fees"
					value={
						<>
							{fees}
							<span className="transaction_execution_currency">{feeCurrency}</span>
						</>
					}
				/>
			</div>

			<div className="transaction_execution_actions">
				{hasRetry && (
					<Button size="m" variant="secondary_color" onClick={() => {}}>
						Retry Transaction
					</Button>
				)}
				<div className="transaction_execution_warning">
					<WarningIcon />
					<span className="transaction_execution_warning_text">
						Only retry if you’ve updated the contract — otherwise it may fail again and waste gas
					</span>
				</div>
			</div>
		</div>
	)
})
