import { useModalsStore } from '@/hooks'
import { SupportModal } from '../SupportModal'
import { TransactionModal } from '@/components/common'

export const ModalManager = () => {
	const { isModalOpen, toggleModal } = useModalsStore()

	return (
		<>
			<SupportModal
				isOpen={isModalOpen('concero-support-modal')}
				onClose={() => toggleModal('concero-support-modal')}
			/>
			<TransactionModal
				isOpen={isModalOpen('concero-transaction-modal')}
				onClose={() => toggleModal('concero-transaction-modal')}
			/>
		</>
	)
}
