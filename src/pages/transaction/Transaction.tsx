import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common'
import { useState, useEffect } from 'react'
import { Status, Transaction } from '@/components'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

const data = {
	messageId: '0x4231f887251b9d0b4923262d55783dafdb6bb63590a2a34243f3c9e038544791',
	status: Status.Success,
	reason: '0xf3dte',
	sender: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
	receiver: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
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
