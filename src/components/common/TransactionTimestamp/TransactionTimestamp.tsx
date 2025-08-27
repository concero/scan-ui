import type { ReactElement } from 'react'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type TransactionTimestampProps = {
  timestamp: number
  duration: number
  loading: boolean
}

export const TransactionTimestamp = ({ timestamp, duration, loading }: TransactionTimestampProps): ReactElement => {
  const date = new Date(timestamp * 1000)

  const day = date.getUTCDate()
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  const year = date.getUTCFullYear()

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const formattedDate: string = `${day} ${month} ${year},`
  const formattedTime: string = `(${hours}:${minutes} UTC)`
  const formattedDuration: string = `${duration} sec.`

  return (
    <div className="transaction_timestamp">
      <div className="transaction_timestamp_row">
        {loading ? (
          <Skeleton width="100%" height={24} />
        ) : (
          <>
            <span className="transaction_timestamp_label">Timestamp</span>
            <span className="transaction_timestamp_value">
              {formattedDate} <span className="transaction_timestamp_time">{formattedTime}</span>
            </span>
          </>
        )}
      </div>
      <div className="transaction_timestamp_row">
        {loading ? (
          <Skeleton width="100%" height={24} />
        ) : (
          <>
            <span className="transaction_timestamp_label">Duration</span>
            <span className="transaction_timestamp_value">{formattedDuration}</span>
          </>
        )}
      </div>
    </div>
  )
}
