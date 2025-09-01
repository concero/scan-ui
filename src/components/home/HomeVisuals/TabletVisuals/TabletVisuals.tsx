import type { ReactElement } from 'react'
import type { Visual } from '../HomeVisuals'
import { motion } from 'framer-motion'
import { useSettingsStore } from '@/hooks'
import './styles.pcss'

const visuals: Visual[] = [
  { src: 'visual_one.webp', alt: 'Flower', className: 'visual_one' },
  { src: 'visual_two.webp', alt: 'Code', className: 'visual_two' },
  { src: 'visual_three.webp', alt: 'Math', className: 'visual_three' },
  { src: 'visual_four.webp', alt: 'File', className: 'visual_four' },
  { src: 'visual_five.webp', alt: 'Disc', className: 'visual_five' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 60, rotate: 'var(--illustration-rotate)' },
  show: {
    opacity: 1,
    y: 0,
    rotate: 'var(--illustration-rotate)',
    transition: { type: "spring" as const, stiffness: 600, damping: 15, mass: 1 },
  },
}

export const TabletVisuals = (): ReactElement => {
  const { theme } = useSettingsStore()
  const basePath = theme === 'light' ? '/Home/Light/' : '/Home/Dark/'

  return (
    <motion.div
      className="tablet_visuals"
      data-theme={theme}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {visuals.map(({ src, alt, className }) => (
        <motion.img
          key={className}
          src={`${basePath}${src}`}
          alt={alt}
          className={`tablet_visual ${className}`}
          draggable={false}
          loading="lazy"
          variants={item}
          whileHover={
            className === 'visual_three'
              ? { y: -24, transition: { type: 'spring', stiffness: 600, damping: 15, mass: 1, delay: 0 } }
              : { rotate: 0, transition: { type: 'spring', stiffness: 600, damping: 15, mass: 1, delay: 0 } }
          }
        />
      ))}
    </motion.div>
  )
}
