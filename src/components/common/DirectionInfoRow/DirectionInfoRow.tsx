import { ReactElement, useEffect, useRef, useState, useCallback } from 'react'
import { CopyIcon } from '@/assets'
import { useClipboard } from '@/hooks'
import './styles.pcss'

type DirectionInfoRowProps = {
    readonly label: string
    readonly value: ReactElement | string | number | null | undefined
    readonly copyable?: boolean
    readonly message?: string
}

export const DirectionInfoRow = ({
    label,
    value,
    copyable = true,
    message,
}: DirectionInfoRowProps): ReactElement => {
    const { copy } = useClipboard()
    const valueRef = useRef<HTMLDivElement>(null)
    const [wrapped, setWrapped] = useState(false)
    const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

    const isWrapped = useCallback(() => {
        const el = valueRef.current
        if (!el) return

        const newWrapped = el.offsetHeight > 26
        setWrapped(prev => (prev !== newWrapped ? newWrapped : prev))
    }, [])

    useEffect(() => {
        isWrapped()
    }, [isWrapped, value, windowWidth])

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    const handleCopyClick = useCallback(() => {
        if (copyable && value != null) {
            copy(String(value), message ?? `${label} Copied`)
        }
    }, [copy, copyable, value, message, label])

    return (
        <div className={`dir_info_row ${wrapped ? 'dir_info_row_wrapped' : ''}`} ref={valueRef}>
            <div className="dir_info_label">{label}</div>

            <div
                className={`dir_info_value${copyable ? '' : ' no_copy'}`}
                onClick={handleCopyClick}
                role={copyable ? 'button' : undefined}
                tabIndex={copyable ? 0 : undefined}
                aria-disabled={!copyable}
            >
                <>
                    <span className="dir_info_value_text">{value}</span>
                    {copyable && (
                        <div className="dir_info_copy">
                            <CopyIcon />
                        </div>
                    )}
                </>
            </div>
        </div>
    )
}
