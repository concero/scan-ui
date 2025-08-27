import type { ReactElement } from 'react'
import { Status } from '@/components/transaction'
import { StatusLabel } from '../StatusLabel'
import { Skeleton } from '../Skeleton'
import './styles.pcss'

type MessageDetailsProps = {
  readonly messageId: string | undefined
  readonly status: Status
  readonly loading: boolean
  readonly reason?: string
}

export const MessageDetails = ({
  loading,
  messageId,
  status,
  reason,
}: MessageDetailsProps): ReactElement | null => {
  return (
    <div className="message_details">
      <div className="message_details_row">
        <span className="message_details_label">
          {loading ? <Skeleton width={120} height={24} /> : 'Concero message ID'}
        </span>

        <span className="message_details_value">
          {loading ? <Skeleton width={'100%'} height={24} /> : messageId}
        </span>
      </div>

      <div className="message_details_row">
        <span className="message_details_label">
          {loading ? <Skeleton width={120} height={24} /> : 'Status'}
        </span>

        <span className="message_details_value">
          {loading ? <Skeleton width={'100%'} height={24} /> : <StatusLabel status={status} size="s" />}
        </span>
      </div>
      {reason && (
        <div className="message_details_row">
          <span className="message_details_label">
            {loading ? <Skeleton width={120} height={24} /> : 'Reason'}
          </span>

          <span className="message_details_value">
            {loading ? <Skeleton width={'100%'} height={24} /> : reason}
          </span>
        </div>
      )}
    </div>
  )
}
