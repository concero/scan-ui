import type { ReactElement } from 'react'
import type { Visual } from '../HomeVisuals'
import { useSettingsStore } from '@/hooks'
import './styles.pcss'

const visuals: Visual[] = [
  { src: 'visual_one.webp', alt: 'Flower', className: 'visual_one' },
  { src: 'visual_two.webp', alt: 'Code', className: 'visual_two' },
  { src: 'visual_three.webp', alt: 'Math', className: 'visual_three' },
  { src: 'visual_four.webp', alt: 'File', className: 'visual_four' },
  { src: 'visual_five.webp', alt: 'Disc', className: 'visual_five' },
]

export const DesktopVisuals = (): ReactElement => {
  const { theme } = useSettingsStore()

  const basePath = theme === 'light' ? '/Home/Light/' : '/Home/Dark/'

  return (
    <div className="desktop_visuals" data-theme={theme}>
      {visuals.map(({ src, alt, className, props }) => (
        <img
          key={className}
          src={`${basePath}${src}`}
          alt={alt}
          className={`desktop_visual ${className}`}
          draggable={false}
          loading="lazy"
          {...props}
        />
      ))}
    </div>
  )
}
