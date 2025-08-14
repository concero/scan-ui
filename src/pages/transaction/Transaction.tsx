import { useMemo, type ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Tag } from '@concero/ui-kit'
import './styles.pcss'

const BackNavigation = (): ReactElement => {
	const navigate = useNavigate()
	const handleBack = (): void => {
		if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
			navigate(-1)
		} else {
			navigate('/')
		}
	}

	return (
		<IconButton size="m" variant="secondary" onClick={handleBack} className="back_button">
			<ArrowLeftIcon />
		</IconButton>
	)
}

export const Transaction = (): ReactElement => {
	const { message } = useParams()
	const backButton = useMemo(() => <BackNavigation />, [])

	return (
		<section className="transaction">
			{backButton}
			<div className="transaction_content">
				<span className="transaction_title">Canonical Bridge</span>
				<div className="transaction_info">
					<div className="transaction_info_section">
						<div className="transaction_info_row">
							<span className="transaction_info_label">Concero message ID</span>
							<span className="transaction_info_value">{message}</span>
						</div>
						<div className="transaction_info_row">
							<span className="transaction_info_label">Status</span>
							<div>
								<Tag size="s" variant="positive">
									Success
								</Tag>
							</div>
						</div>
					</div>
					<div className="transaction_info_divider" />
					<div className="transaction_info_section">
						<div className="transaction_info_row">
							<span className="transaction_info_label">Type</span>
							<div>
								<Tag size="s" variant="neutral">
									Canonical Bridge
								</Tag>
							</div>
						</div>
						<div className="transaction_info_row">
							<span className="transaction_info_label">Sender</span>
							<span className="transaction_info_value">0x1234567890abcdef1234567890abcdef12345678</span>
						</div>
						<div className="transaction_info_row">
							<span className="transaction_info_label">Receiver</span>
							<span className="transaction_info_value">0xabcdefabcdefabcdefabcdefabcdefabcdefabcd</span>
						</div>
					</div>
					<div className="transaction_info_divider" />
				</div>
			</div>
		</section>
	)
}
