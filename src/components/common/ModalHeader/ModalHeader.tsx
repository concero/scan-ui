import type { ReactElement, MouseEventHandler } from 'react'
import { IconButton } from '@concero/ui-kit'
import { CloseIcon } from '@/assets'
import './styles.pcss'

type ModalHeaderProps = {
    readonly title: string
    readonly onClose: MouseEventHandler<HTMLButtonElement>
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps): ReactElement => (
    <div className="modal_header">
        <span className="modal_title">{title}</span>
        <IconButton variant="secondary" size="m" onClick={onClose} aria-label="Close support modal">
            <CloseIcon />
        </IconButton>
    </div>
)
