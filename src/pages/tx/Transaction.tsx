import { useParams } from 'react-router-dom'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import {
	TransactionSummary,
	MessageDetails,
	TransactionDivider,
	TransactionFinality,
	TransactionTimestamp,
	TransactionExecutionInfo,
	TransactionDetails,
} from '@/components/common'
import './styles.pcss'
import { useNavigation } from '@/hooks'
import { NotFound } from '@/components/common'
import { Status } from '@/components'

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

const TransactionContent = ({ message }: { message?: string }) => (
	<div className="transaction_content">
		<span className="transaction_title">Canonical Bridge</span>
		<div className="transaction_information">
			<MessageDetails
				loading={false}
				messageId={'0x4231f887251b9d0b4923262d55783dafdb6bb63590a2a34243f3c9e038544791'}
				status={Status.Pending}
				reason="0xafdfsd"
			/>

			<TransactionDivider />
			<TransactionSummary
				type={TransactionType.CanonicalBridge}
				sender="0x1234567890abcdef1234567890abcdef12345678"
				receiver="0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
			/>

			<TransactionDivider />
			<TransactionFinality hasFinality={false} />

			<TransactionDivider />
			<TransactionTimestamp date="25 Jul 2025" time="(15:30 UTC)" duration="15 sec." />

			<TransactionDivider />
			<TransactionDetails from={from} to={to} />

			<TransactionDivider />
			<TransactionExecutionInfo
				payload="0x29bb29b90000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000dddd"
				gasLimit={2_000_000}
				fees={0.000021569012094}
				dstCurrency="ETH"
				feeCurrency="MATIC"
			/>
		</div>
	</div>
)

export const Transaction = () => {
	const { message } = useParams<{ message?: string }>()
	const { back } = useNavigation()

	const notFound = false

	if (notFound) {
		return <NotFound resource="Transaction" />
	}

	return (
		<section className="transaction">
			<IconButton size="m" variant="secondary" onClick={back} className="back_button">
				<ArrowLeftIcon />
			</IconButton>
			<TransactionContent message={message} />
		</section>
	)
}
