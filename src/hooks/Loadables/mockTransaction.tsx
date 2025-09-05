import type { Transaction } from "@/stores"
import { TransactionType } from "@/components"
import { Status } from "@/components"

export const MOCK_TRANSACTION: Transaction = {
  messageId: '0x4231f887251b9d0b4923262d55783dafdb6bb63590a2a34243f3c9e038544791',
  status: 'success' as Status,
  reason: '0x019218x89121',
  type: 'Canonical Bridge' as TransactionType,
  finality: true,
  timestamp: 1696114800,
  from: {
    token: {
      name: 'Ethereum',
      symbol: 'ETH',
      usd: 4000,
      amount: 0.5,
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
    },
    chain: {
      id: 8453,
      name: 'Base',
      selector: 153432313,
      logo: 'https://api.concero.io/static/icons/chains/8453.svg',
      currency: 'ETH',
    },
    address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    gas: 0.0021,
  },
  to: {
    token: {
      name: 'Ethereum',
      symbol: 'ETH',
      usd: 4000,
      amount: 0.5,
      logo: 'https://api.concero.io/static/icons/chains/1.svg',
    },
    chain: {
      id: 137,
      name: 'Polygon',
      selector: 124542634,
      logo: 'https://api.concero.io/static/icons/chains/137.svg',
      currency: 'MATIC',
    },
    address: '0x239d5b78680e9AD600Ab41E56508670BA9E78F51',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    gas: 0.0008,
  },
  duration: 12,
  payload: '0x29bb29b90000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e5831000000000000000000000000dddd',
  gasLimit: 2_000_000,
  fees: 0.000021569012094,
}