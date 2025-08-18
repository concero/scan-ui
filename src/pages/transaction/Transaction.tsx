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
	TransactionExecutionInfo,
} from '@/components/common'
import './styles.pcss'
import { TransactionDetails } from '@/components/common/TransactionDetails'

export const from = {
	chainLogo: 'https://api.concero.io/static/icons/chains/8453.svg',
	chainName: 'Base',
	chainCurrency: 'ETH',
	chainId: 8453,
	chainSelector: 153432313,
	txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
	gasCost: 0.0021,
}

export const to = {
	chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
	chainName: 'Polygon',
	chainCurrency: 'MATIC',
	chainId: 137,
	chainSelector: 124542634,
	txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
	gasCost: 0.0008,
}

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
				<div className="transaction_information">
					<MessageDetails messageId={message} status="Failed" reason="0xafdfsd" />
					<TransactionDivider />
					<TransactionSummary
						type={TransactionType.IOUBridge}
						sender="0x1234567890abcdef1234567890abcdef12345678"
						receiver="0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
					/>
					<TransactionDivider />
					<TransactionFinality hasFinality={true} />
					<TransactionDivider />
					<TransactionTimestamp date="25 Jul 2025" time="(15:30 UTC)" duration="15 sec." />
					<TransactionDivider />
					<TransactionDetails from={from} to={to} />
					<TransactionDivider />
					<TransactionExecutionInfo
						payload={
							'0x29bb29b90000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000dddd'
						}
						gasLimit={2000000}
						fees={0.000021569012094}
						dstCurrency={'ETH'}
						feeCurrency={'MATIC'}
					/>
				</div>
			</div>
		</section>
	)
}
