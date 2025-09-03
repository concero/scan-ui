import type { AddressResponse } from './Address'
import { Status } from '@/components'
import { TransactionType } from '@/components'

const now = Date.now()

const randomSecondsAgo = (maxSeconds: number): number => now - Math.floor(Math.random() * maxSeconds * 1000)

export const dataResponse: AddressResponse = {
	isTestnet: false,
	data: [
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
				address: '0x1111111111111111111111111111111111111111',
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
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Pending,
		},
		{
			messageId: '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321',
			type: TransactionType.CanonicalBridge,
			timestamp: randomSecondsAgo(30),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
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
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
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
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
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
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Success,
		},
		{
			messageId: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
			type: TransactionType.IOUBridge,
			timestamp: randomSecondsAgo(300),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/1.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
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
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Success,
		},
		{
			messageId: '0xaabbccddeeff00112233445566778899aabbccddeeff00112233445566778899',
			type: TransactionType.Message,
			timestamp: randomSecondsAgo(900),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x2222222222222222222222222222222222222222',
			},
			status: Status.Pending,
		},
		{
			messageId: '0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1',
			type: TransactionType.Message,
			timestamp: randomSecondsAgo(1500),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0xf1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Success,
		},
		{
			messageId: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
			type: TransactionType.IOUBridge,
			timestamp: randomSecondsAgo(1600),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/10.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/10.svg',
				address: '0xb2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2',
			},
			status: Status.Pending,
		},
		{
			messageId: '0xfaceb00cfaceb00cfaceb00cfaceb00cfaceb00cfaceb00cfaceb00cfaceb00c',
			type: TransactionType.CanonicalBridge,
			timestamp: randomSecondsAgo(1700),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0xc3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Canceled,
		},
		{
			messageId: '0x1111111122222222333333334444444455555555666666667777777788888888',
			type: TransactionType.Message,
			timestamp: randomSecondsAgo(1800),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/1.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/1.svg',
				address: '0x2468024680246802468024680246802468024680',
			},
			status: Status.Pending,
		},
		{
			messageId: '0x999888777666555444333222111000aaaabbbbccccddddeeeeffff0000111122',
			type: TransactionType.CanonicalBridge,
			timestamp: randomSecondsAgo(2000),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0x1a2b3c4d5e6f7081928374655647382910293847',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Success,
		},
		{
			messageId: '0x1234abcd5678efgh91011ijk12131415lmnopqrstu1617181920212223242526',
			type: TransactionType.IOUBridge,
			timestamp: randomSecondsAgo(2200),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x1234567890123456789012345678901234567890',
			},
			status: Status.Canceled,
		},
		{
			messageId: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdab',
			type: TransactionType.Message,
			timestamp: randomSecondsAgo(2600),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/1.svg',
				address: '0x8765432187654321876543218765432187654321',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/1.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Pending,
		},
		{
			messageId: '0xaaa1aaa2aaa3aaa4aaa5aaa6aaa7aaa8aaa9aaabaaaacaaadaaaeaaafaaagaaa',
			type: TransactionType.CanonicalBridge,
			timestamp: randomSecondsAgo(3000),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/10.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/10.svg',
				address: '0x99887766554433221100ffeeddccbbaa99887766',
			},
			status: Status.Success,
		},
		{
			messageId: '0xbbbbccccddddeeeeffffgggghhhhiiiijjjjkkkllmmmmnnnnooooppppqqqqrrrr',
			type: TransactionType.IOUBridge,
			timestamp: randomSecondsAgo(3600),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x556677889900aabbccddeeff1122334455667788',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/137.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			status: Status.Pending,
		},
		{
			messageId: '0xccccdddddeeeeffffgggghhhhiijjkkkllmmnnooppqqrrss',
			type: TransactionType.Message,
			timestamp: randomSecondsAgo(4000),
			from: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
			},
			to: {
				logo: 'https://api.concero.io/static/icons/chains/56.svg',
				address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
			},
			status: Status.Success,
		},
	],
}
