import type { ReactElement } from 'react'
import { Chain, Token, Amount } from '../Items/Items'
import { useTransactionStore } from '@/hooks'
import { InfoRow } from '@/components/common'
import './styles.pcss'

export const To = (): ReactElement | null => {
  const { transaction } = useTransactionStore()

  if (!transaction?.to) return null

  const {
    chain,
    token,
    address,
    hash,
  } = transaction.to

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
    hasChain && chain.selector && {
      label: 'Selector',
      value: chain.selector,
      copyable: true,
      message: 'Selector Copied',
    },
    hasToken && {
      label: 'Token',
      value: <Token name={token.name} />,
      copyable: true,
      message: 'Token Copied',
    },
    hasAmount && {
      label: 'Amount',
      value: <Amount name={token.name} amount={token.amount} />,
      copyable: false,
    },
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
          <InfoRow
            key={label}
            label={label}
            value={value}
            copyable={copyable}
            message={message}
          />
        ))}
      </div>
    </div>
  )
}
