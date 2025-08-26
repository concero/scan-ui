import type { ReactElement } from 'react'
import type { Visual } from '@/components/home/HomeVisuals'
import { Button } from '@concero/ui-kit'
import { useNavigation, useSettingsStore } from '@/hooks'
import { routes } from '@/configuration'
import './styles.pcss'

type NotFoundProps = {
	resource: string
}

const visuals: Visual[] = [
	{ src: 'visual_one.webp', alt: 'Negation', className: 'visual_one' },
	{ src: 'visual_two.webp', alt: 'Location', className: 'visual_two' },
]

export const NotFound = ({ resource }: NotFoundProps): ReactElement => {
	const { to } = useNavigation()
	const { theme } = useSettingsStore()

	const basePath = theme === 'light' ? '/NotFound/Light/' : '/NotFound/Dark/'

	return (
		<div className="not_found" role="alert" aria-live="polite">
			<div className="not_found_visuals">
				{visuals.map(({ src, alt, className, props }) => (
					<img
						key={className}
						src={`${basePath}${src}`}
						alt={alt}
						className={`not_found_visual ${className}`}
						draggable={false}
						loading="lazy"
						{...props}
					/>
				))}
			</div>
			<div className="not_found_content">
				<div className="not_found_description">
					<h2 className="not_found_title">{resource} not found</h2>
					<p className="not_found_subtitle">
						We couldn’t locate this {resource.toLowerCase()}. It may not have been processed yet, or the
						link might be incorrect.
					</p>
				</div>
				<div className="not_found_action">
					<Button variant="secondary_color" onClick={() => to(routes.home())}>
						Go to Main Page
					</Button>
				</div>
			</div>
		</div>
	)
}
