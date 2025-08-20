import { useState, useEffect } from 'react'

export function useDebounce<T>(input: T, delayMs: number): T {
	const [debouncedValue, setDebouncedValue] = useState(input)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(input)
		}, delayMs)

		return () => {
			clearTimeout(handler)
		}
	}, [input, delayMs])

	return debouncedValue
}
