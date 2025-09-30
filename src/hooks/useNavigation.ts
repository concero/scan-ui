import { useCallback } from 'react'
import { routes } from '@/configuration'
import { useNavigate, To, NavigateOptions } from 'react-router-dom'

type UseNavigation = {
	back: () => void
	to: (path: To, options?: NavigateOptions) => void
}

export const useNavigation = (): UseNavigation => {
	const navigate = useNavigate()

	const back = useCallback((): void => {
		if (window.history.length > 1) {
			try {
				navigate(-1)
			} catch (error) {
				navigate(routes.home(), { replace: true })
			}
		} else {
			navigate(routes.home(), { replace: true })
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
