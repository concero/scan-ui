import type { ReactElement } from 'react'
import type { Column } from '../TableRow'
import { Table } from '../Table'
import { TimeData, DirectionData, MessageData } from './Data/Data'
import './styles.pcss'
import { TransactionLabel } from '../TransactionLabel'
import { TransactionType } from '@/pages'
import { StatusLabel } from '../StatusLabel'

type MessageRow = {
	messageId: ReactElement
	type: ReactElement
	age: ReactElement
	from: ReactElement
	to: ReactElement
	status: ReactElement
}

const columns: Column<MessageRow>[] = [
	{ header: 'Message ID', accessor: 'messageId' },
	{ header: 'Type', accessor: 'type' },
	{ header: 'Age', accessor: 'age' },
	{ header: 'From', accessor: 'from' },
	{ header: 'To', accessor: 'to' },
	{ header: 'Status', accessor: 'status' },
]

const rows: MessageRow[] = [
  {
    messageId: <MessageData messageId="0x4e3b2f1a7c8d9e0b6f5a1c2d3e4f567890abcdef1234567890abcdef123456789" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="1 second ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x239d5b78680e9AD600Ab41E56508670BA9E78F51" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x239d5b78680e9AD600Ab41E56508670BA9E78F51" />,
    status: <StatusLabel status="Success" size="m" />,
  },
  {
    messageId: <MessageData messageId="0x1a2b3c4d5e6f7890abcdeffedcba0987654321fedcba1234567890abcdef1234" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="5 seconds ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/10.svg" address="0x1111111111111111111111111111111111111111" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/10.svg" address="0x2222222222222222222222222222222222222222" />,
    status: <StatusLabel status="Pending" size="m" />,
  },
  {
    messageId: <MessageData messageId="0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="10 seconds ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x3333333333333333333333333333333333333333" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x4444444444444444444444444444444444444444" />,
    status: <StatusLabel status="Success" size="m" />,
  },
  {
    messageId: <MessageData messageId="0x2233445566778899aabbccddeeff00112233445566778899aabbccddeeff0011" />,
    type: <TransactionLabel size="s" type={TransactionType.Message} />,
    age: <TimeData time="20 seconds ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/1.svg" address="0x5555555555555555555555555555555555555555" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/1.svg" address="0x6666666666666666666666666666666666666666" />,
    status: <StatusLabel status="Failed" size="m" />,
  },
  {
    messageId: <MessageData messageId="0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="30 seconds ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/56.svg" address="0x7777777777777777777777777777777777777777" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/56.svg" address="0x8888888888888888888888888888888888888888" />,
    status: <StatusLabel status="Success" size="m" />,
  },
  {
    messageId: <MessageData messageId="0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd" />,
    type: <TransactionLabel size="s" type={TransactionType.IOUBridge} />,
    age: <TimeData time="45 seconds ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x9999999999999999999999999999999999999999" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />,
    status: <StatusLabel status="Pending" size="m" />,
  },
  {
    messageId: <MessageData messageId="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="1 minute ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/10.svg" address="0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/10.svg" address="0xcccccccccccccccccccccccccccccccccccccccc" />,
    status: <StatusLabel status="Success" size="m" />,
  },
  {
    messageId: <MessageData messageId="0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210" />,
    type: <TransactionLabel size="s" type={TransactionType.IOUBridge} />,
    age: <TimeData time="2 minutes ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/1.svg" address="0xdddddddddddddddddddddddddddddddddddddddd" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/1.svg" address="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" />,
    status: <StatusLabel status="Failed" size="m" />,
  },
  {
    messageId: <MessageData messageId="0x00112233445566778899aabbccddeeff00112233445566778899aabbccddeeff" />,
    type: <TransactionLabel size="s" type={TransactionType.CanonicalBridge} />,
    age: <TimeData time="5 minutes ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/56.svg" address="0xffffffffffffffffffffffffffffffffffffffff" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/56.svg" address="0x0000000000000000000000000000000000000000" />,
    status: <StatusLabel status="Success" size="m" />,
  },
  {
    messageId: <MessageData messageId="0xaabbccddeeff00112233445566778899aabbccddeeff00112233445566778899" />,
    type: <TransactionLabel size="s" type={TransactionType.Message} />,
    age: <TimeData time="10 minutes ago" />,
    from: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x1111111111111111111111111111111111111111" />,
    to: <DirectionData chainLogo="https://api.concero.io/static/icons/chains/137.svg" address="0x2222222222222222222222222222222222222222" />,
    status: <StatusLabel status="Pending" size="m" />,
  },
];


export const DataTable = (): ReactElement => {
	return <Table columns={columns} data={rows} />
}
