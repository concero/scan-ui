import type { ReactElement } from 'react'
import type { Direction } from '@/components/transaction'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type TransactionInfoProps = {
	details: Direction
	loading: boolean
}

export const TransactionInfo = ({ details, loading }: TransactionInfoProps): ReactElement => {
	const { chain, token, address, hash, gas } = details

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
						<span className="transaction_info_value">{chain.name}</span>
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
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={70} height={16} /> : 'Token'}
				</span>
				{loading ? (
					<Skeleton width="100%" height={20} />
				) : (
					<div className="transaction_info_chain">
						<img src={token.logo} alt={token.name} className="transaction_info_chain_logo" />
						<span className="transaction_info_value">{token.name}</span>
					</div>
				)}
			</div>
			<div className="transaction_info_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={80} height={16} /> : 'Amount'}
				</span>
				<span className="transaction_info_value">
					{loading ? (
						<Skeleton width={100} height={16} />
					) : (
						<div className="transaction_info_value_container">
							{token.amount}
							<span className="transaction_info_currency">{token.symbol}</span>
						</div>
					)}
				</span>
			</div>
			<div className="transaction_info_row hash_row">
				<span className="transaction_info_label">
					{loading ? <Skeleton width={70} height={16} /> : 'Wallet address'}
				</span>
				<span className="transaction_info_value">
					{loading ? <Skeleton width="100%" height={16} /> : address}
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
						<div className="transaction_info_value_container">
							{gas}
							<span className="transaction_info_currency">{chain.currency}</span>
						</div>
					)}
				</span>
			</div>
		</div>
	)
}
