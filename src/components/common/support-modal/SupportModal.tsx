import { ReactElement, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconButton, Button } from '@concero/ui-kit'
import { CloseIcon, CopyIcon } from '@/assets'
import './styles.pcss'

type SupportModalProps = {
  isOpen: boolean
  onClose: () => void
}

type SupportOptionProps = {
  step: number
  text: string
  buttonLabel: string
  icon?: ReactNode
  onClick: () => void
}

const SupportOption = ({
  step,
  text,
  buttonLabel,
  icon,
  onClick,
}: SupportOptionProps): ReactElement => (
  <div className="support_modal_option">
    <span className="support_modal_option_text">
      {step}. {text}
    </span>
    <Button
      variant="secondary"
      size="l"
      isFull
      leftIcon={icon}
      onClick={onClick}
    >
      {buttonLabel}
    </Button>
  </div>
)

export const SupportModal = ({
  isOpen,
  onClose,
}: SupportModalProps): ReactElement | null => {
  const [copied, setCopied] = useState<boolean>(false)

  const handleCopyDebugInfo = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText('Example debug info text...')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy debug info', err)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className="support_modal_overlay">
      <div className="support_modal">
        {/* Header */}
        <div className="support_modal_header">
          <span className="support_modal_title">Contact Support</span>
          <IconButton
            variant="secondary"
            size="m"
            onClick={onClose}
            aria-label="Close support modal"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Description */}
        <span className="support_modal_description">
          We apologise that you had issues with your transaction. We will do our
          best to resolve the issue.
        </span>

        {/* Options */}
        <SupportOption
          step={1}
          text="Copy debug info"
          buttonLabel={copied ? 'Copied!' : 'Copy debug info'}
          icon={<CopyIcon />}
          onClick={handleCopyDebugInfo}
        />
        <SupportOption
          step={2}
          text="Drop us a message"
          buttonLabel="Open Discord"
          onClick={() =>
            window.open('https://discord.gg/yourserver', '_blank', 'noopener')
          }
        />
      </div>
    </div>,
    document.body
  )
}
