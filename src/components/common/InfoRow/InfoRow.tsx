import { ReactElement, useRef, useCallback } from 'react'
import { CopyIcon } from '@/assets'
import { useClipboard } from '@/hooks'
import { useIsWrapped } from '@/hooks/useIsWrapped'
import './styles.pcss'

export type InfoRowProps<TValue = ReactElement | string | number | null | undefined> = {
  readonly label: string
  readonly value: TValue
  readonly copyable?: boolean
  readonly message?: string
}

export const InfoRow = ({
  label,
  value,
  copyable = true,
  message,
}: InfoRowProps): ReactElement => {
  const { copy } = useClipboard()
  const valueRef = useRef<HTMLDivElement>(null)
  const isWrapped = useIsWrapped(valueRef)

  const handleCopy = useCallback(() => {
    if (copyable && value != null) {
      copy(String(value), message ?? `${label} Copied`)
    }
  }, [copy, copyable, value, message, label])

  return (
    <div className={`info_row ${isWrapped ? 'info_row_wrapped' : ''}`} ref={valueRef}>
      <div className="info_row_label">{label}</div>
      <div
        className={`info_row_value${copyable ? '' : ' no_copy'}`}
        onClick={handleCopy}
        tabIndex={copyable ? 0 : undefined}
        aria-disabled={!copyable}
        onKeyDown={e => {
          if (copyable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleCopy()
          }
        }}
      >
        <span className="info_row_value_text">{value}</span>
        {copyable && (
          <div className="info_row_copy" aria-hidden="true">
            <CopyIcon />
          </div>
        )}
      </div>
    </div>
  )
}
