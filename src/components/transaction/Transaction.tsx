import type { ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon } from '@/assets'
import { useNavigation } from '@/hooks'
import { Content } from './Content'
import { memo } from 'react'
import './styles.pcss'

export const Transaction = memo((): ReactElement => {
	const { back } = useNavigation()

	return (
		<div className="transaction_wrapper">
			<div className="transaction">
				<IconButton size="m" variant="secondary" onClick={back} className="back_button">
					<ArrowLeftIcon />
				</IconButton>
				<Content />
			</div>
		</div>
	)
})
