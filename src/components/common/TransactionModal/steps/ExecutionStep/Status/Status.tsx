import type { FC, ReactElement } from 'react'
import { Button } from '@concero/ui-kit'
import './Status.pcss'

export enum StatusVariant {
	Idle = 'idle',
	Loading = 'loading',
	Processing = 'processing',
	Success = 'success',
	Failed = 'failed',
}

type StatusProps = {
	variant: StatusVariant
	title: string
	subtitle: string
	onBack?: () => void
	onClose?: () => void
	onRetry?: () => void
}

export const Status: FC<StatusProps> = ({ variant, title, subtitle, onClose, onRetry, onBack }) => {
	const getImage = (): string => {
		switch (variant) {
			case StatusVariant.Idle:
				return '/Transaction/Question.svg'
			case StatusVariant.Loading:
				return '/Transaction/Wallet.svg'
			case StatusVariant.Processing:
				return '/Transaction/Processing.svg'
			case StatusVariant.Success:
				return '/Transaction/Success.svg'
			case StatusVariant.Failed:
				return '/Transaction/Failed.svg'

			default:
				return '/Transaction/Wallet.svg'
		}
	}

	const getActions = (): ReactElement | null => {
		switch (variant) {
			case StatusVariant.Idle:
				return (
					<div className="execution_step_status_actions">
						<Button isFull size="l" variant="secondary" onClick={onBack}>
							Back
						</Button>
						<Button isFull size="l" variant="primary" onClick={onRetry}>
							Retry
						</Button>
					</div>
				)
			case StatusVariant.Failed:
				return (
					<div className="execution_step_status_actions">
						<Button isFull size="l" variant="secondary" onClick={onClose!}>
							Cancel
						</Button>
						<Button isFull size="l" variant="primary" onClick={onRetry!}>
							Try Again
						</Button>
					</div>
				)
			case StatusVariant.Success:
				return (
					<div className="execution_step_status_actions">
						<Button isFull size="l" variant="primary" onClick={onBack || onClose!}>
							Done
						</Button>
					</div>
				)
			case StatusVariant.Loading:
			case StatusVariant.Processing:
			default:
				return null
		}
	}

	return (
		<div className={`execution_step_status execution_step_status_${variant}`}>
			<div className="execution_step_status_img_container">
				<img src={getImage()} alt={`${title} Icon`} className="execution_step_status_img" />
			</div>
			<div className="execution_step_status_description">
				<span className="execution_step_status_title">{title}</span>
				<span className="execution_step_status_subtitle">{subtitle}</span>
			</div>
			{getActions()}
		</div>
	)
}
