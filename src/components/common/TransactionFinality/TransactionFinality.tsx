import type { ReactElement } from 'react'
import { Tag } from '@concero/ui-kit'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type TransactionFinalityProps = {
  readonly finality: boolean
  readonly loading: boolean
}

export const TransactionFinality = ({ finality, loading }: TransactionFinalityProps): ReactElement => {
  const status: string = finality ? 'Yes' : 'No'

  return (
    <div className="transaction_finality">
      <div className="transaction_finality_row">
        {loading ? (
          <Skeleton width="100%" height={24} />
        ) : (
          <>
            <span className="transaction_finality_label">Finality Required</span>
            <div>
              <Tag size="s" variant="neutral">
                {status}
              </Tag>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
