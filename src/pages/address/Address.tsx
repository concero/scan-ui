import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Tag } from '@concero/ui-kit'
import { ButtonGroup, DataTable } from '@/components/common'
import { Status } from '@/components/common'
import { TransactionType } from '../transaction'
import './styles.pcss'

const data = [
	{
		messageId: '0x4e3b2f1a7c8d9e0b6f5a1c2d3e4f567890abcdef1234567890abcdef123456789',
		type: TransactionType.CanonicalBridge,
		time: '1 second ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
		},
		status: 'Success' as Status,
	},
	{
		messageId: '0x1a2b3c4d5e6f7890abcdeffedcba0987654321fedcba1234567890abcdef1234',
		type: TransactionType.IOUBridge,
		time: '5 seconds ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/10.svg',
			address: '0x1111111111111111111111111111111111111111',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/10.svg',
			address: '0x2222222222222222222222222222222222222222',
		},
		status: 'Pending' as Status,
	},
	{
		messageId: '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321',
		type: TransactionType.CanonicalBridge,
		time: '10 seconds ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x3333333333333333333333333333333333333333',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x4444444444444444444444444444444444444444',
		},
		status: 'Success' as Status,
	},
	{
		messageId: '0x2233445566778899aabbccddeeff00112233445566778899aabbccddeeff0011',
		type: TransactionType.Message,
		time: '20 seconds ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/1.svg',
			address: '0x5555555555555555555555555555555555555555',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/1.svg',
			address: '0x6666666666666666666666666666666666666666',
		},
		status: 'Failed' as Status,
	},
	{
		messageId: '0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa',
		type: TransactionType.CanonicalBridge,
		time: '30 seconds ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/56.svg',
			address: '0x7777777777777777777777777777777777777777',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/56.svg',
			address: '0x8888888888888888888888888888888888888888',
		},
		status: 'Success' as Status,
	},
	{
		messageId: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd',
		type: TransactionType.IOUBridge,
		time: '45 seconds ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x9999999999999999999999999999999999999999',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		},
		status: 'Pending' as Status,
	},
	{
		messageId: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
		type: TransactionType.CanonicalBridge,
		time: '1 minute ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/10.svg',
			address: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/10.svg',
			address: '0xcccccccccccccccccccccccccccccccccccccccc',
		},
		status: 'Success' as Status,
	},
	{
		messageId: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
		type: TransactionType.IOUBridge,
		time: '2 minutes ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/1.svg',
			address: '0xdddddddddddddddddddddddddddddddddddddddd',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/1.svg',
			address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		},
		status: 'Failed' as Status,
	},
	{
		messageId: '0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff',
		type: TransactionType.CanonicalBridge,
		time: '5 minutes ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/56.svg',
			address: '0xffffffffffffffffffffffffffffffffffffffff',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/56.svg',
			address: '0x0000000000000000000000000000000000000000',
		},
		status: 'Success' as Status,
	},
	{
		messageId: '0xaabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
		type: TransactionType.Message,
		time: '10 minutes ago',
		from: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x1111111111111111111111111111111111111111',
		},
		to: {
			chainLogo: 'https://api.concero.io/static/icons/chains/137.svg',
			address: '0x2222222222222222222222222222222222222222',
		},
		status: 'Pending' as Status,
	},
]

export const Address = (): ReactElement => {
	const { address } = useParams<{ address: string }>()
	return (
		<section className="address">
			<div className="address_description">
				<div className="address_info">
					<span className="address_subtitle">Address</span>
					<Tag variant="neutral" size="s">
						Mainnet
					</Tag>
				</div>
				<span className="address_title">{address}</span>
			</div>
			<ButtonGroup labels={['Outgoing', 'Incoming']} />
			<DataTable data={data} />
		</section>
	)
}
