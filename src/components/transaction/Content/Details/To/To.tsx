import type { ReactElement } from 'react'
import { Chain, Token, Amount } from '../Items/Items'
import { useTransactionsStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import { TxType } from '@/types'
import './styles.pcss'

export const To = (): ReactElement | null => {
	const { txs } = useTransactionsStore()
	const transaction = txs && txs.length > 0 ? txs[0] : null

	if (!transaction?.to) return null

	const { chain, token, address, hash } = transaction.to
	const isMessage = transaction.type === TxType.Message

	const hasChain = chain && chain.name && chain.id != null
	const hasToken = token && token.name
	const hasAmount = token && token.amount != null && token.name
	const hasAddress = Boolean(address)
	const hasHash = Boolean(hash)

	const rows = [
		hasChain && {
			label: 'Chain',
			value: <Chain name={chain.name} id={chain.id} />,
			copyable: false,
		},
		hasChain && {
			label: 'Chain ID',
			value: chain.id,
			copyable: true,
			message: 'Chain ID Copied',
		},
		hasChain &&
			chain.selector && {
				label: 'Selector',
				value: chain.selector,
				copyable: true,
				message: 'Selector Copied',
			},
		!isMessage &&
			hasToken && {
				label: 'Token',
				value: <Token name={token.name} />,
				copyable: true,
				message: 'Token Copied',
			},
		!isMessage &&
			hasAmount && {
				label: 'Amount',
				value: <Amount symbol={token.symbol} amount={token.amount} priceUSD={token.priceUSD} />,
				copyable: false,
			},
		!isMessage &&
			hasAddress && {
				label: 'Wallet address',
				value: address,
				copyable: true,
				message: 'Wallet Address Copied',
			},
		hasHash && {
			label: 'Tx Hash',
			value: hash,
			copyable: true,
			message: 'Tx Hash Copied',
		},
	].filter(Boolean) as Array<{
		label: string
		value: ReactElement | string | number
		copyable: boolean
		message?: string
	}>

	if (rows.length === 0) {
		return null
	}

	return (
		<div className="to">
			<span className="to_label">To</span>
			<div className="to_content">
				{rows.map(({ label, value, copyable, message }) => (
					<InfoRow key={label} label={label} value={value} copyable={copyable} message={message} />
				))}
			</div>
		</div>
	)
}
