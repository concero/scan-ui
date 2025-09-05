import type { FC, ReactElement } from 'react'
import { memo } from 'react'
import { RaceBy } from '@uiball/loaders'
import './styles.pcss'

export const ScreenLoader: FC = memo((): ReactElement => {
	return (
		<div className="screen_loader" data-testid="screen-loader">
			<RaceBy color="var(--color-accent-500)" />
		</div>
	)
})