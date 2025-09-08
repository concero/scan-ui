import { TransactionType } from '@/components'
import type { AddressResponse } from '@/pages'
import { Status } from '@/components'

const now = Date.now()

const randomSecondsAgo = (maxSeconds: number): number => now - Math.floor(Math.random() * maxSeconds * 1000)

const generateMessageId = (idx: number): string =>
  `0x${'a'.repeat(60)}${idx.toString(16).padStart(4, '0')}`

const fixedAddress = '0x239d5b78680e9AD600Ab41E56508670BA9E78F51'

const otherAddresses = [
  '0x1111111111111111111111111111111111111111',
  '0x2222222222222222222222222222222222222222',
  '0x3333333333333333333333333333333333333333',
  '0x4444444444444444444444444444444444444444',
  '0x5555555555555555555555555555555555555555',
  '0x6666666666666666666666666666666666666666',
  '0x7777777777777777777777777777777777777777',
  '0x8888888888888888888888888888888888888888',
  '0x9999999999999999999999999999999999999999',
  '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
]

const logos = [
  'https://api.concero.io/static/icons/chains/137.svg',
  'https://api.concero.io/static/icons/chains/10.svg',
  'https://api.concero.io/static/icons/chains/1.svg',
  'https://api.concero.io/static/icons/chains/56.svg',
]

export const MOCK_ADDRESS_DATA: AddressResponse = {
  isTestnet: false,
  data: Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1
    const isFromFixed = idx % 2 === 1
    const otherIdx = Math.floor(i / 2) % otherAddresses.length
    return {
      messageId: generateMessageId(idx),
      type: ['Canonical Bridge' as TransactionType, 'IOU Bridge' as TransactionType, 'Message' as TransactionType][
        idx % 3
      ],
      timestamp: randomSecondsAgo(10 + idx * 10),
      from: isFromFixed
        ? {
            logo: logos[idx % logos.length],
            address: fixedAddress,
          }
        : {
            logo: logos[(idx + 1) % logos.length],
            address: otherAddresses[otherIdx],
          },
      to: isFromFixed
        ? {
            logo: logos[(idx + 1) % logos.length],
            address: otherAddresses[otherIdx],
          }
        : {
            logo: logos[idx % logos.length],
            address: fixedAddress,
          },
      status: ['success' as Status, 'pending' as Status, 'canceled' as Status][idx % 3],
    }
  }),
}
