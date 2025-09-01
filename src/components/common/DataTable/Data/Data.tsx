import type { ReactElement, FC } from 'react'
import { useNavigation } from '@/hooks'
import './styles.pcss'

// MESSAGE DATA COMPONENT

type MessageDataProps = {
	messageId: string
}

export const MessageData: FC<MessageDataProps> = ({ messageId }): ReactElement => {
	const { to } = useNavigation()

	return (
		<span
			className="message_data"
			role="link"
			tabIndex={0}
			onClick={() => to(`/message/${encodeURIComponent(messageId)}`)}
			style={{ cursor: 'pointer' }}
			aria-label={`Navigate to message ${messageId}`}
		>
			{messageId}
		</span>
	)
}

// TIME DATA COMPONENT

export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  if (diff < 0) return 'just now';

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  switch (true) {
    case seconds < 60:
      return `${seconds === 1 ? '1 sec' : `${seconds} secs`} ago`;
    case minutes < 60:
      return `${minutes === 1 ? '1 min' : `${minutes} mins`} ago`;
    case hours < 24:
      return `${hours === 1 ? '1 hr' : `${hours} hrs`} ago`;
    default:
      return `${days === 1 ? '1 day' : `${days} days`} ago`;
  }
};

type TimeDataProps = {
	timestamp: number
}

export const TimeData: FC<TimeDataProps> = ({ timestamp }): ReactElement => {
  const time: string = getRelativeTime(timestamp);
  return (
    <span className="time_data" role="text">
      {time}
    </span>
  );
};

// DIRECTION DATA COMPONENT	

type DirectionDataProps = {
	logo: string
	address: string
}

export const DirectionData: FC<DirectionDataProps> = ({ logo, address }): ReactElement => (
	<div className="direction_data">
		<img src={logo} alt="Chain Logo" className="direction_data_img" />
		<span className="direction_data_address" title={address}>
			{address.slice(0, 8)}...{address.slice(-8)}
		</span>
	</div>
)
