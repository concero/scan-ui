import { useRef, useCallback, useEffect } from 'react'
import { useDebounce } from './useDebounce'

type InfiniteScrollOptions = {
	disabled?: boolean
	threshold?: number
	debounceDelayMs?: number
	containerRef?: React.RefObject<HTMLElement | Window>
	enabled?: boolean
	onLoadMore: () => void
	onScroll?: (event: Event) => void
}

export const useInfiniteScroll = ({
	disabled = false,
	threshold = 50,
	debounceDelayMs = 100,
	containerRef,
	enabled = true,
	onScroll,
	onLoadMore,
}: InfiniteScrollOptions) => {
	const elementRef = useRef<HTMLDivElement>(null)

	const debouncedDisabled = useDebounce(disabled, debounceDelayMs)
	const debouncedEnabled = useDebounce(enabled, debounceDelayMs)

	const checkScroll = useCallback(() => {
		if (debouncedDisabled || !debouncedEnabled) return

		const scrollContainer = containerRef?.current ?? elementRef.current
		if (!scrollContainer) return

		let scrollTop: number
		let scrollHeight: number
		let clientHeight: number

		if (scrollContainer instanceof Window) {
			scrollTop = window.scrollY || window.pageYOffset
			scrollHeight = document.documentElement.scrollHeight
			clientHeight = window.innerHeight
		} else {
			scrollTop = scrollContainer.scrollTop
			scrollHeight = scrollContainer.scrollHeight
			clientHeight = scrollContainer.clientHeight
		}

		onScroll?.(new Event('scroll'))

		const distanceToBottom = scrollHeight - scrollTop - clientHeight
		if (distanceToBottom <= threshold) {
			onLoadMore()
		}
	}, [debouncedDisabled, debouncedEnabled, onLoadMore, onScroll, containerRef, threshold])

	const debouncedCheckScroll = useDebounce(checkScroll, debounceDelayMs)

	useEffect(() => {
		const scrollElement = containerRef?.current ?? elementRef.current ?? window
		if (!scrollElement) return

		scrollElement.addEventListener('scroll', debouncedCheckScroll)
		return () => {
			scrollElement.removeEventListener('scroll', debouncedCheckScroll)
		}
	}, [containerRef, debouncedCheckScroll])

	return { ref: elementRef }
}
