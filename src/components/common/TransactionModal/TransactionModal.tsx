import type { ReactElement, MouseEvent } from 'react'
import { useSteps } from '@/hooks'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalHeader } from '../ModalHeader'
import { ConnectionStep } from './steps'
import { VerificationStep } from './steps'
import './styles.pcss'

type TransactionModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
}

const StepEnterGasLimit = ({
  gasLimit,
  onChange,
  onSubmit,
}: {
  gasLimit: string
  onChange: (val: string) => void
  onSubmit: () => void
}) => (
  <div>
    <label>
      DST Gas Limit (optional):
      <input
        type="text"
        value={gasLimit}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter gas limit"
      />
    </label>
    <button onClick={onSubmit}>Retry</button>
  </div>
)

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps): ReactElement | null => {
  const [gasLimit, setGasLimit] = useState<string>('')

  const stepApi = useSteps([
    {
      component: (
        <ConnectionStep
          onConnected={() => {
              stepApi.next()
          }}
        />
      ),
    },
    {
      component: (
        <VerificationStep
          onVerified={() => stepApi.next()}
          onDisconnected={() => stepApi.back()}
        />
      ),
    },
    {
      component: (
        <StepEnterGasLimit
          gasLimit={gasLimit}
          onChange={setGasLimit}
          onSubmit={() => {
            handleClose()
          }}
        />
      ),
    },
  ])

  const handleDialogClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  const handleClose = (): void => {
    onClose()
    stepApi.reset()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="tx_modal_overlay" onClick={handleClose} role="presentation">
      <div className="tx_modal" onClick={handleDialogClick} role="dialog" aria-modal="true">
        <ModalHeader title="Retry Transaction" onClose={handleClose} />
        <div className="tx_modal_step_container">{stepApi.currentStep.component}</div>
      </div>
    </div>,
    document.body,
  )
}
