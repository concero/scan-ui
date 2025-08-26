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

export const MessageDetails = ({ loading, messageId, status, reason }: MessageDetailsProps): ReactElement | null => {
  return (
    <div className="message_details">
      <div className="message_details_row">
        {loading ? (
          <Skeleton width="100%" height={24} />
        ) : (
          <>
            <span className="message_details_label">Concero message ID</span>
            <span className="message_details_value">{messageId}</span>
          </>
        )}
      </div>

      <div className="message_details_row">
        {loading ? (
          <Skeleton width="100%" height={24} />
        ) : (
          <>
            <span className="message_details_label">Status</span>
            <span className="message_details_value">
              <StatusLabel status={status} size="s" />
            </span>
          </>
        )}
      </div>

      {reason && (
        <div className="message_details_row">
          {loading ? (
            <Skeleton width="100%" height={24} />
          ) : (
            <>
              <span className="message_details_label">Reason</span>
              <span className="message_details_value">{reason}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
