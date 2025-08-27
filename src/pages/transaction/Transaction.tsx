import type { FC, ReactElement } from 'react'
import { Chain, Status, TransactionType } from '@/components'
import { MetaTags } from '@/components/common'
import { useState, useEffect } from 'react'
import { Transaction, Direction, Token } from '@/components'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

const fromChain: Chain = {
	id: 8453,
	name: 'Base',
	selector: 153432313,
	logo: 'https://api.concero.io/static/icons/chains/8453.svg',
	currency: 'ETH',
}

const fromToken: Token = {
	name: 'Ethereum',
	symbol: 'ETH',
	usd: 4000,
	amount: 0.5,
	logo: 'https://api.concero.io/static/icons/chains/1.svg',
}

const toToken: Token = {
	name: 'Ethereum',
	symbol: 'ETH',
	usd: 4000,
	amount: 0.5,
	logo: 'https://api.concero.io/static/icons/chains/1.svg',
}

const toChain: Chain = {
	id: 137,
	name: 'Polygon',
	selector: 124542634,
	logo: 'https://api.concero.io/static/icons/chains/137.svg',
	currency: 'MATIC',
}

const from: Direction = {
	token: fromToken,
	chain: fromChain,
	address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
	hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
	gas: 0.0021,
}

const to: Direction = {
	token: toToken,
	chain: toChain,
	address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
	hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
	gas: 0.0008,
}

const data = {
	messageId: '0x4231f887251b9d0b4923262d55783dafdb6bb63590a2a34243f3c9e038544791',
	status: Status.Success,
	reason: '0x019218x89121',
	type: TransactionType.CanonicalBridge,
	finality: true,
	timestamp: 1696114800,
	from: from,
	to: to,
	duration: 12,
	payload: "0x29bb29b90000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000dddd",
	gasLimit: 2_000_000,
	fees: 0.000021569012094
}

export const TransactionPage: FC = (): ReactElement => {
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Transaction data={data} loading={loading} />
			</main>
		</>
	)
}
