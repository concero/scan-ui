import { useCallback } from 'react'
import { useNavigate, To, NavigateOptions } from 'react-router-dom'

type UseNavigation = {
	back: () => void
	to: (path: To, options?: NavigateOptions) => void
}

export const useNavigation = (): UseNavigation => {
	const navigate = useNavigate()

	const back = useCallback((): void => {
		const hasHistory = window.history.length > 1
		const sameOrigin = Boolean(document.referrer) && document.referrer.startsWith(window.location.origin)

		if (hasHistory && sameOrigin) {
			navigate(-1)
		} else {
			navigate('/', { replace: true })
		}
	}, [navigate])

	const to = useCallback(
		(path: To, options?: NavigateOptions): void => {
			navigate(path, options)
		},
		[navigate],
	)

	return { back, to }
}
