import type { ReactElement } from 'react'
import type { Direction } from '@/components/transaction'
import { DirectionInfoRow } from '../DirectionInfoRow'
import './styles.pcss'

type TransactionInfoProps = {
	details: Direction
	loading: boolean
}

export const TransactionInfo = ({ details, loading }: TransactionInfoProps): ReactElement => {
	const { chain, token, address, hash, gas } = details

	const rows = [
		{
			label: 'Chain',
			value: (
				<div className="transaction_info_chain">
					<img src={chain.logo} alt={chain.name} className="transaction_info_chain_logo" />
					<span className="transaction_info_value">{chain.name}</span>
				</div>
			),
			copyable: false,
		},
		{ label: 'Chain ID', value: chain.id, copyable: true, message: 'Chain ID Copied' },
		{ label: 'Selector', value: chain.selector, copyable: true, message: 'Selector Copied' },
		{
			label: 'Token',
			value: (
				<div className="transaction_info_token">
					<img src={token.logo} alt={token.name} className="transaction_info_token_logo" />
					<span className="transaction_info_value">{token.name}</span>
				</div>
			),
			copyable: true,
			message: 'Token Copied',
		},
		{
			label: 'Amount',
			value: (
				<div className="transaction_info_value_container">
					{token.amount}
					<span className="transaction_info_currency">{token.symbol}</span>
				</div>
			),
			copyable: false,
		},
		{ label: 'Wallet address', value: address, copyable: true, message: 'Wallet Address Copied' },
		{ label: 'Tx Hash', value: hash, copyable: true, message: 'Tx Hash Copied' },
		{
			label: 'Gas Fee',
			value: (
				<div className="transaction_info_value_container">
					{gas}
					<span className="transaction_info_currency">{chain.currency}</span>
				</div>
			),
			copyable: false,
		},
	]

	return (
		<div className="transaction_info">
			{rows.map(({ label, value, copyable, message }) => (
				<DirectionInfoRow key={label} label={label} value={value} loading={loading} copyable={copyable} message={message}/>
			))}
		</div>
	)
}
