import { useState, useEffect, useMemo } from 'react'

export const breakpoints = {
	mobile: '(max-width: 640px)',
	tablet: '(min-width: 641px) and (max-width: 1024px)',
	desktop: '(min-width: 1025px) and (max-width: 1920px)',
	ultrawide: '(min-width: 1921px)',
}

type BreakpointKey = keyof typeof breakpoints

const getQueryString = (query: string | BreakpointKey) => breakpoints[query as BreakpointKey] || query

const useMediaQuery = (query: string | BreakpointKey): boolean => {
	const queryString = useMemo(() => getQueryString(query), [query])
	const [matches, setMatches] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false
		return window.matchMedia(queryString).matches
	})

	useEffect(() => {
		if (typeof window === 'undefined') return

		const media = window.matchMedia(queryString)
		const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches)

		setMatches(media.matches)
		media.addEventListener('change', updateMatches)

		return () => {
			media.removeEventListener('change', updateMatches)
		}
	}, [queryString])

	return matches
}

export const useIsMobile = () => useMediaQuery('mobile')
export const useIsTablet = () => useMediaQuery('tablet')
export const useIsDesktop = () => useMediaQuery('desktop')
export const useIsUltrawide = () => useMediaQuery('ultawide')

export default useMediaQuery
