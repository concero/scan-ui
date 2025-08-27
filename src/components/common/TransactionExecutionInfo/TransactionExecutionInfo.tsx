import { memo, useCallback, useState, type ReactElement } from 'react'
import { Button, IconButton } from '@concero/ui-kit'
import { useClipboard, useModalsStore } from '@/hooks'
import { PointerUpIcon, WarningIcon } from '@/assets'
import './styles.pcss'

type TransactionExecutionInfoProps = Readonly<{
  payload: string
  gasLimit: number
  fees: number
  dstCurrency: string
  feeCurrency: string
  hasRetry?: boolean
  isExpandable?: boolean
}>

type InfoRowProps = Readonly<{
  label: string
  value: React.ReactNode
  class_name?: string
}>

const InfoRow = memo(function InfoRow({ label, value, class_name = '' }: InfoRowProps) {
  return (
    <div className={`tx_row ${class_name}`}>
      <span className="tx_label">{label}</span>
      <span className="tx_value">{value}</span>
    </div>
  )
})

const PayloadRow = memo(function PayloadRow({
  payload,
  onCopy,
  copied,
}: {
  payload: string
  onCopy: () => void
  copied: boolean
}) {
  return (
    <div className="tx_row payload_row">
      <span className="tx_label">Message Payload</span>
      <div className="tx_payload">
        <span className="tx_payload_value">{payload}</span>
        <div className="tx_payload_action">
          <Button size="s" variant="secondary" onClick={onCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
    </div>
  )
})

const ExecutionWarning = memo(function ExecutionWarning() {
  return (
    <div className="tx_warning">
      <WarningIcon />
      <span className="tx_warning_text">
        Only retry if you’ve updated the contract — otherwise it may fail again and waste gas
      </span>
    </div>
  )
})

export const TransactionExecutionInfo = memo(function TransactionExecutionInfo({
  payload,
  gasLimit,
  fees,
  dstCurrency,
  feeCurrency,
  hasRetry = true,
  isExpandable = true,
}: TransactionExecutionInfoProps): ReactElement {
  const { copy, copied } = useClipboard()
  const { toggleModal } = useModalsStore()
  const [expanded, setExpanded] = useState(!isExpandable)

  const handleCopy = useCallback(() => copy(payload), [copy, payload])
  const toggleDetails = useCallback(() => setExpanded((prev) => !prev), [])

  return (
    <div className="tx_info">
      {isExpandable && (
        <div className="tx_expand" onClick={toggleDetails}>
          <span className="tx_expand_label">{expanded ? 'Less Details' : 'More Details'}</span>
          <IconButton
            size="s"
            variant="secondary"
            className={`tx_expand_icon ${expanded ? 'rotated' : ''}`}
          >
            <PointerUpIcon />
          </IconButton>
        </div>
      )}

      <div className={`tx_content ${expanded ? 'expanded' : ''}`}>
        <PayloadRow payload={payload} onCopy={handleCopy} copied={copied} />
        <InfoRow
          label="DST Gas Limit"
          value={
            <>
              {gasLimit} <span className="tx_currency">{dstCurrency}</span>
            </>
          }
        />
        <InfoRow
          label="Concero Fees"
          value={
            <>
              {fees} <span className="tx_currency">{feeCurrency}</span>
            </>
          }
        />
        <div className="tx_actions">
          {hasRetry && (
            <Button
              size="m"
              variant="secondary_color"
              onClick={() => toggleModal('concero-transaction-modal')}
            >
              Retry Transaction
            </Button>
          )}
          <ExecutionWarning />
        </div>
      </div>
    </div>
  )
})
