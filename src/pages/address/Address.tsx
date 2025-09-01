import type { FC, ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { MetaTags } from '@/components/common'
import { Status, TransactionType } from '@/components'
import { Address } from '@/components'
import { useParams } from 'react-router-dom'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

const now = Date.now();

const randomSecondsAgo = (maxSeconds: number): number =>
  now - Math.floor(Math.random() * maxSeconds * 1000);

const data = [
  {
    messageId: '0x4e3b2f1a7c8d9e0b6f5a1c2d3e4f567890abcdef1234567890abcdef123456789',
    type: TransactionType.CanonicalBridge,
    timestamp: randomSecondsAgo(10),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
    },
    status: Status.Success,
  },
  {
    messageId: '0x1a2b3c4d5e6f7890abcdeffedcba0987654321fedcba1234567890abcdef1234',
    type: TransactionType.IOUBridge,
    timestamp: randomSecondsAgo(20),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/10.svg',
      address: '0x1111111111111111111111111111111111111111',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/10.svg',
      address: '0x2222222222222222222222222222222222222222',
    },
    status: Status.Pending,
  },
  {
    messageId: '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321',
    type: TransactionType.CanonicalBridge,
    timestamp: randomSecondsAgo(30),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x3333333333333333333333333333333333333333',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x4444444444444444444444444444444444444444',
    },
    status: Status.Success,
  },
  {
    messageId: '0x2233445566778899aabbccddeeff00112233445566778899aabbccddeeff0011',
    type: TransactionType.Message,
    timestamp: randomSecondsAgo(60),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
      address: '0x5555555555555555555555555555555555555555',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
      address: '0x6666666666666666666666666666666666666666',
    },
    status: Status.Canceled,
  },
  {
    messageId: '0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
    type: TransactionType.CanonicalBridge,
    timestamp: randomSecondsAgo(90),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/56.svg',
      address: '0x7777777777777777777777777777777777777777',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/56.svg',
      address: '0x8888888888888888888888888888888888888888',
    },
    status: Status.Success,
  },
  {
    messageId: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    type: TransactionType.IOUBridge,
    timestamp: randomSecondsAgo(120),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x9999999999999999999999999999999999999999',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    status: Status.Pending,
  },
  {
    messageId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    type: TransactionType.CanonicalBridge,
    timestamp: randomSecondsAgo(180),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/10.svg',
      address: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/10.svg',
      address: '0xcccccccccccccccccccccccccccccccccccccccc',
    },
    status: Status.Success,
  },
  {
    messageId: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    type: TransactionType.IOUBridge,
    timestamp: randomSecondsAgo(300),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
      address: '0xdddddddddddddddddddddddddddddddddddddddd',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    },
    status: Status.Canceled,
  },
  {
    messageId: '0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff',
    type: TransactionType.CanonicalBridge,
    timestamp: randomSecondsAgo(600),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/56.svg',
      address: '0xffffffffffffffffffffffffffffffffffffffff',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/56.svg',
      address: '0x0000000000000000000000000000000000000000',
    },
    status: Status.Success,
  },
  {
    messageId: '0xaabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
    type: TransactionType.Message,
    timestamp: randomSecondsAgo(900),
    from: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x1111111111111111111111111111111111111111',
    },
    to: {
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      address: '0x2222222222222222222222222222222222222222',
    },
    status: Status.Pending,
  },
];


type AddressDirection = {
	logo: string
	address: string
}

export type AddressData = {
	messageId: string
	type: TransactionType
	timestamp: number
	status: Status
	from: AddressDirection
	to: AddressDirection
}

export const AddressPage: FC = (): ReactElement => {
    const { address } = useParams<{ address: string }>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Address address={address} data={data} loading={loading} />
			</main>
		</>
	)
}
