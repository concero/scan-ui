import { useState, useEffect } from 'react'

export const useIsWrapped = (valueRef: React.RefObject<HTMLDivElement | null>): boolean => {
	const [isWrapped, setIsWrapped] = useState<boolean>(false)

	useEffect(() => {
		function checkWrapped() {
			if (!valueRef.current) return
			const wrapped = valueRef.current.offsetHeight > 26
			setIsWrapped(wrapped)
		}

		checkWrapped()
		window.addEventListener('resize', checkWrapped)
		return () => window.removeEventListener('resize', checkWrapped)
	}, [valueRef])

	return isWrapped
}
