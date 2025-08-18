import { ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import './styles.pcss'

export const ConnectionStep = (): ReactElement => {
  return (
    <section className="connection_step">
      <img
        src="/Transaction/Wallet.svg"
        alt="Wallet Icon"
        className="connection_step_img"
        aria-hidden="true"
        loading="lazy"
      />
      <div className="connection_step_description">
        <span id="connection_step_title" className="connection_step_title">
          Connect Your Wallet
        </span>
        <span className="connection_step_subtitle">
          To retry the transaction, we need to verify it’s really you.
        </span>
      </div>
      <div className="connection_step_action">
        <Button variant="primary" size="l" isFull>
          Connect Wallet
        </Button>
      </div>
    </section>
  )
}
