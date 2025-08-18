import type { ReactElement, MouseEvent } from 'react'
import type { Step } from '@/hooks'
import { useSteps } from '@/hooks'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ModalHeader } from '../ModalHeader'
import './styles.pcss'

type TransactionModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
}

const StepConnectWallet = ({ onConnect }: { onConnect: () => void }) => (
  <div>
    <p>Connect your wallet to continue.</p>
    <button onClick={onConnect}>Connect Wallet</button>
  </div>
)

const StepConfirmConnection = ({ onContinue }: { onContinue: () => void }) => (
  <div>
    <p>Wallet connected!</p>
    <button onClick={onContinue}>Continue</button>
  </div>
)

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

  const steps: Step[] = [
    {
      component: <StepConnectWallet onConnect={() => stepApi.next()} />,
    },
    {
      component: <StepConfirmConnection onContinue={() => stepApi.next()} />,
    },
    {
      component: (
        <StepEnterGasLimit
          gasLimit={gasLimit}
          onChange={setGasLimit}
          onSubmit={() => {
            console.log('Retry with gasLimit:', gasLimit)
            onClose()
          }}
        />
      ),
    },
  ]

  const stepApi = useSteps(steps)

  const handleDialogClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation()
  }

  if (!isOpen) return null

  return createPortal(
    <div className="tx_modal_overlay" onClick={onClose} role="presentation">
      <div className="tx_modal" onClick={handleDialogClick} role="dialog" aria-modal="true">
        <ModalHeader title="Retry Transaction" onClose={onClose} />
        <div className="tx_modal_step_container">{stepApi.currentStep.component}</div>
        <div className="tx_modal_nav">
          <button onClick={stepApi.back} disabled={stepApi.isFirst}>
            Back
          </button>
          {!stepApi.isLast && (
            <button onClick={stepApi.next} disabled={false /* add validations as needed */}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
