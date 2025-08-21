import type { ReactElement, FC, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.pcss';

type MessageDataProps = {
  messageId: string;
};

export const MessageData: FC<MessageDataProps> = ({ messageId }): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/message/${encodeURIComponent(messageId)}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <span
      className="message_data"
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
      aria-label={`Navigate to message ${messageId}`}
    >
      {messageId}
    </span>
  );
};

type TimeDataProps = {
  time: string;
};

export const TimeData: FC<TimeDataProps> = ({ time }): ReactElement => (
  <span className="time_data" role="text">
    {time}
  </span>
);

type DirectionDataProps = {
  chainLogo: string;
  address: string;
};

export const DirectionData: FC<DirectionDataProps> = ({ chainLogo, address }): ReactElement => (
  <div className="direction_data">
    <img src={chainLogo} alt="Chain Logo" className="direction_data_img" />
    <span className="direction_data_address" title={address}>
      {address.slice(0, 8)}...{address.slice(-8)}
    </span>
  </div>
);
