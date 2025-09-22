import { Button } from '@concero/ui-kit'
import { useClipboard } from '@/hooks'
import { useTransactionStore } from '@/hooks'
import './styles.pcss'

export const Payload = () => {
	const { copy, copied } = useClipboard()
	const { transaction } = useTransactionStore()

	if (!transaction?.messagePayload) return null

	return (
		<div className="payload">
			<span className="payload_label">Message Payload</span>
			<div className="payload_content">
				<span className="payload_value">{transaction.messagePayload}</span>
				<div className="payload_action">
					<Button
						size="s"
						variant="secondary"
						onClick={() => copy('Payload Copied!', transaction.messagePayload)}
					>
						{copied ? 'Copied!' : 'Copy'}
					</Button>
				</div>
			</div>
		</div>
	)
}
