import type { ReactElement } from "react"
import type { Visual } from "../HomeVisuals"
import "./styles.pcss"

const visuals: Visual[] = [
    { src: '/Home/visual_one.svg', alt: 'Flower', className: 'visual_one' },
    { src: '/Home/visual_two.svg', alt: 'Code', className: 'visual_two' },
    { src: '/Home/visual_three.svg', alt: 'Math', className: 'visual_three' },
    { src: '/Home/visual_four.svg', alt: 'File', className: 'visual_four' },
    { src: '/Home/visual_five.svg', alt: 'Disc', className: 'visual_five' },
]

export const TabletVisuals = (): ReactElement => {
    return (
        <div className="tablet_visuals">
            {visuals.map(({ src, alt, className, props }) => (
                <img
                    key={className}
                    src={src}
                    alt={alt}
                    className={`tablet_visual ${className}`}
                    draggable={false}
                    loading="lazy"
                    {...props}
                />
            ))}
        </div>
    )
}