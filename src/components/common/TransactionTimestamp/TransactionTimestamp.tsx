import type { ReactElement } from 'react'
import { InfoRow } from '../InfoRow'
import './styles.pcss'

type TransactionTimestampProps = {
  timestamp: number
  duration: number
  loading: boolean
}

export const TransactionTimestamp = ({
  timestamp,
  duration,
  loading,
}: TransactionTimestampProps): ReactElement => {
  const date = new Date(timestamp * 1000)

  const day = date.getUTCDate()
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  const year = date.getUTCFullYear()
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  const formattedDate = `${day} ${month} ${year}`
  const formattedTime = `(${hours}:${minutes} UTC)`
  const formattedDuration = `${duration} sec.`

  return (
    <div className="transaction_timestamp">
      <InfoRow
        label="Timestamp"
        value={
          <>
            {formattedDate} <span className="transaction_timestamp_time">{formattedTime}</span>
          </>
        }
        loading={loading}
        copyable={false}
      />
      <InfoRow label="Duration" value={formattedDuration} loading={loading} copyable={false} />
    </div>
  )
}
