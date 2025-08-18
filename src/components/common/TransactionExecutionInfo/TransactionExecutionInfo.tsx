import { memo, useCallback, useState, type ReactElement } from 'react'
import { Button, IconButton } from '@concero/ui-kit'
import { useClipboard, useModalsStore } from '@/hooks'
import { PointerUpIcon, WarningIcon } from '@/assets'
import './styles.pcss'

type TransactionExecutionInfoProps = Readonly<{
	payload: string
	gasLimit: number
	fees: number
	dstCurrency: string
	feeCurrency: string
	hasRetry?: boolean
	isExpandable?: boolean
}>

type InfoRowProps = Readonly<{
	label: string
	value: React.ReactNode
	className?: string
}>

const InfoRow = memo(function InfoRow({ label, value, className = '' }: InfoRowProps) {
	return (
		<div className={`tx-row ${className}`}>
			<span className="tx-label">{label}</span>
			<span className="tx-value">{value}</span>
		</div>
	)
})

const PayloadRow = memo(function PayloadRow({
	payload,
	onCopy,
	copied,
}: {
	payload: string
	onCopy: () => void
	copied: boolean
}) {
	return (
		<div className="tx-row payload-row">
			<span className="tx-label">Message Payload</span>
			<div className="tx-payload">
				<span className="tx-payload-value">{payload}</span>
				<div className="tx-payload-action">
					<Button size="s" variant="secondary" onClick={onCopy}>
						{copied ? 'Copied!' : 'Copy'}
					</Button>
				</div>
			</div>
		</div>
	)
})

const ExecutionWarning = memo(function ExecutionWarning() {
	return (
		<div className="tx-warning">
			<WarningIcon />
			<span className="tx-warning-text">
				Only retry if you’ve updated the contract — otherwise it may fail again and waste gas
			</span>
		</div>
	)
})

export const TransactionExecutionInfo = memo(function TransactionExecutionInfo({
	payload,
	gasLimit,
	fees,
	dstCurrency,
	feeCurrency,
	hasRetry = true,
	isExpandable = true,
}: TransactionExecutionInfoProps): ReactElement {
	const { copy, copied } = useClipboard()
  const { toggleModal } = useModalsStore()
	const [expanded, setExpanded] = useState<boolean>(!isExpandable)

	const handleCopy = useCallback(() => copy(payload), [copy, payload])
	const toggleDetails = useCallback(() => setExpanded(prev => !prev), [])

	return (
		<div className="tx-info">
			{isExpandable && (
				<div className="tx-expand" onClick={toggleDetails}>
					<span className="tx-expand-label">{expanded ? 'Less Details' : 'More Details'}</span>
					<IconButton size="s" variant="secondary" className={`tx-expand-icon ${expanded ? 'rotated' : ''}`}>
						<PointerUpIcon />
					</IconButton>
				</div>
			)}

			<div className={`tx-content ${expanded ? 'expanded' : ''}`}>
				<PayloadRow payload={payload} onCopy={handleCopy} copied={copied} />
				<InfoRow
					label="DST Gas Limit"
					value={
						<>
							{gasLimit} <span className="tx-currency">{dstCurrency}</span>
						</>
					}
				/>
				<InfoRow
					label="Concero Fees"
					value={
						<>
							{fees} <span className="tx-currency">{feeCurrency}</span>
						</>
					}
				/>
				<div className="tx-actions">
					{hasRetry && (
						<Button size="m" variant="secondary_color" onClick={() => toggleModal('concero-transaction-modal')}>
							Retry Transaction
						</Button>
					)}
					<ExecutionWarning />
				</div>
			</div>
		</div>
	)
})
