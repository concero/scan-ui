import type { ReactElement } from 'react'
import type { Direction } from '@/components/transaction'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type TransactionInfoProps = {
	details: Direction
	loading: boolean
}

export const TransactionInfo = ({ details, loading }: TransactionInfoProps): ReactElement => {
	const { chain, hash, gas } = details

	return (
		<div className="transaction_info">
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={70} height={16} /> : 'Chain'}
				</span>
				{loading ? (
					<Skeleton width="100%" height={20} />
				) : (
					<div className="transaction_info_chain">
						<img src={chain.logo} alt={chain.name} className="transaction_info_chain_logo" />
						<span className="transaction_info_value">{chain.currency}</span>
					</div>
				)}
			</div>
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={90} height={16} /> : 'Chain ID'}
				</span>
				<span className="transaction_info_value">
					{loading ? <Skeleton width={60} height={16} /> : chain.id}
				</span>
			</div>
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={80} height={16} /> : 'Selector'}
				</span>
				<span className="transaction_info_value">
					{loading ? <Skeleton width={80} height={16} /> : chain.selector}
				</span>
			</div>
			<div className="transaction_info_row hash_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={70} height={16} /> : 'TX Hash'}
				</span>
				<span className="transaction_info_value">{loading ? <Skeleton width="100%" height={16} /> : hash}</span>
			</div>
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={80} height={16} /> : 'Gas Fee'}
				</span>
				<span className="transaction_info_value">
					{loading ? (
						<Skeleton width={100} height={16} />
					) : (
						<>
							{gas}
							<span className="transaction_info_currency">{` ${chain.currency}`}</span>
						</>
					)}
				</span>
			</div>
		</div>
	)
}
