import { ReactElement, useEffect, useRef, useState, useCallback } from 'react'
import { Skeleton } from '../Skeleton'
import { CopyIcon } from '@/assets'
import { useClipboard } from '@/hooks'
import './styles.pcss'

type InfoRowProps = {
	readonly label: string
	readonly value: ReactElement | string | number | undefined
	readonly copyable?: boolean
	readonly loading: boolean
}

export const InfoRow = ({ label, value, loading, copyable = true }: InfoRowProps): ReactElement => {
	const { copy } = useClipboard()
	const valueRef = useRef<HTMLDivElement | null>(null)
	const [wrapped, setWrapped] = useState(false)
	const [windowWidth, setWindowWidth] = useState(() => window.innerWidth)

	const isWrapped = useCallback(() => {
		const el = valueRef.current
		if (!el) return

		const newWrapped = el.offsetHeight > 26
		setWrapped(current => (current !== newWrapped ? newWrapped : current))
	}, [])

	useEffect(() => {
		isWrapped()
	}, [isWrapped, value, loading, windowWidth])

	const handleResize = useCallback(() => {
		setWindowWidth(window.innerWidth)
	}, [])

	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	const handleCopyClick = useCallback(() => {
		if (!loading && copyable && value) {
			copy(String(value))
		}
	}, [copy, copyable, loading, value])

	return (
		<div className={`info_row ${wrapped ? 'info_row_wrapped' : ''}`} ref={valueRef}>
			<div className="info_row_label">{loading ? <Skeleton width={120} height={24} /> : label}</div>

			<div
				className={`info_row_value${copyable ? '' : ' no-copy'}`}
				onClick={handleCopyClick}
				role={copyable ? 'button' : undefined}
				tabIndex={copyable ? 0 : undefined}
				aria-disabled={loading || !copyable}
			>
				{loading ? (
					<Skeleton width="100%" height={24} />
				) : (
					<>
						<span className="info_row_value_text">{value}</span>
						{copyable && (
							<div className="info_row_copy">
								<CopyIcon />
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}
