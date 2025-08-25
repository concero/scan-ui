import type { ReactElement } from 'react'
import type { Visual } from '../HomeVisuals'
import { useSettingsStore } from '@/hooks'
import './styles.pcss'

const visuals: Visual[] = [
    { src: 'visual_one.webp', alt: 'Flower', className: 'visual_one' },
    { src: 'visual_three.webp', alt: 'Math', className: 'visual_three' },
    { src: 'visual_five.webp', alt: 'Disc', className: 'visual_five' },
]

export const MobileVisuals = (): ReactElement => {
    const { theme } = useSettingsStore()
    const basePath = theme === 'light' ? '/Home/Light/' : '/Home/Dark/'

    return (
        <div className="mobile_visuals" data-theme={theme}>
            {visuals.map(({ src, alt, className, props }) => (
                <img
                    key={className}
                    src={`${basePath}${src}`}
                    alt={alt}
                    className={`mobile_visual ${className}`}
                    draggable={false}
                    loading="lazy"
                    {...props}
                />
            ))}
        </div>
    )
}
