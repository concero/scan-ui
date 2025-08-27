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
        <span className="transaction_finality_label">
          {loading ? <Skeleton width={120} height={24} /> : 'Finality Required'}
        </span>

        <span className="transaction_finality_value">
          {loading ? <Skeleton width={'100%'} height={24} /> : (
            <Tag size="s" variant="neutral">
              {status}
            </Tag>
          )}
        </span>
      </div>
    </div>
  )
}
