import type { ReactElement } from 'react'
import type { Visual } from '../HomeVisuals'
import './styles.pcss'

const visuals: Visual[] = [
	{ src: '/Home/visual_one.webp', alt: 'Flower', className: 'visual_one' },
	{ src: '/Home/visual_two.webp', alt: 'Code', className: 'visual_two' },
	{ src: '/Home/visual_three.webp', alt: 'Math', className: 'visual_three' },
	{ src: '/Home/visual_four.webp', alt: 'File', className: 'visual_four' },
	{ src: '/Home/visual_five.webp', alt: 'Disc', className: 'visual_five' },
]

export const DesktopVisuals = (): ReactElement => (
	<div className="desktop_visuals">
		{visuals.map(({ src, alt, className, props }) => (
			<img
				key={className}
				src={src}
				alt={alt}
				className={`desktop_visual ${className}`}
				draggable={false}
				loading="lazy"
				{...props}
			/>
		))}
	</div>
)
