import { useMemo, type ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
	TransactionSummary,
	MessageDetails,
	TransactionDivider,
	TransactionFinality,
	TransactionTimestamp,
} from '@/components/common'
import './styles.pcss'

export enum TransactionType {
	Message = 'Message',
	LBFBridge = 'LBF Bridge',
	CanonicalBridge = 'Canonical Bridge',
	IOUBridge = 'IOU Bridge',
}

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
					<MessageDetails messageId={message} status="Failed" />
					<TransactionDivider />
					<TransactionSummary
						type={TransactionType.LBFBridge}
						sender="0x1234567890abcdef1234567890abcdef12345678"
						receiver="0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
					/>
					<TransactionDivider />
					<TransactionFinality hasFinality={true} />
					<TransactionDivider />
					<TransactionTimestamp date='25 Jul 2025' time='(15:30 UTC)' duration="15 sec." />
					<TransactionDivider />
				</div>
			</div>
		</section>
	)
}
