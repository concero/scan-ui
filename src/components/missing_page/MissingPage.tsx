import type { ReactElement } from 'react'
import type { Visual } from '@/components/home/HomeVisuals'
import { Button } from '@concero/ui-kit'
import { useNavigation, useSettingsStore } from '@/hooks'
import { routes } from '@/configuration'
import './styles.pcss'

type NotFoundProps = {
	resource: string
	description: string
}

const visuals: Visual[] = [
	{ src: 'visual_three.webp', alt: 'Location', className: 'visual_missing_one' },
	{ src: 'visual_one.webp', alt: 'Negation', className: 'visual_missing_two' },
	{ src: 'visual_three.webp', alt: 'Location', className: 'visual_missing_three' },
]

export const MissingPage = ({ resource, description }: NotFoundProps): ReactElement => {
	const { to } = useNavigation()
	const { theme } = useSettingsStore()

	const basePath = theme === 'light' ? '/NotFound/Light/' : '/NotFound/Dark/'

	return (
		<div className="missing_page" role="alert" aria-live="polite">
			<div className="missing_page_visuals">
				{visuals.map(({ src, alt, className, props }) => (
					<img
						key={className}
						src={`${basePath}${src}`}
						alt={alt}
						className={`missing_page_visual ${className}`}
						draggable={false}
						loading="lazy"
						{...props}
					/>
				))}
			</div>
			<div className="missing_page_content">
				<div className="missing_page_description">
					<h2 className="missing_page_title">{resource} not found</h2>
					<p className="missing_page_subtitle">{description}</p>
				</div>
				<div className="missing_page_action">
					<Button variant="secondary_color" onClick={() => to(routes.home())}>
						Go to Main Page
					</Button>
				</div>
			</div>
		</div>
	)
}
