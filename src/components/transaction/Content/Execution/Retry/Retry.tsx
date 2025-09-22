import { WarningIcon } from '@/assets'
import { Button } from '@concero/ui-kit'
import { useModalsStore, useTransactionStore } from '@/hooks'
import { Status } from '@/types'
import './styles.pcss'

export const Retry = () => {
	const { toggleModal } = useModalsStore()
	const { transaction } = useTransactionStore()

	const isCanceled = transaction?.status === Status.Canceled

	if (!isCanceled) return null

	return (
		<div className="retry">
			<Button size="m" variant="secondary_color" onClick={() => toggleModal('concero-transaction-modal')}>
				Retry Transaction
			</Button>
			<div className="retry_warning" aria-label="Retry warning">
				<WarningIcon />
				<span className="retry_warning_text">
					Only retry if you’ve updated the contract — otherwise it may fail again and waste gas
				</span>
			</div>
		</div>
	)
}
