import { useCallback } from 'react'
import { useNavigate, To, NavigateOptions } from 'react-router-dom'

type UseNavigation = {
    back: () => void
    to: (path: To, options?: NavigateOptions) => void
}

export const useNavigation = (): UseNavigation => {
    const navigate = useNavigate()

    const canGoBack = (): boolean => window.history.length > 1;

    const isSameOriginReferrer = (): boolean => {
        try {
            const referrerUrl = new URL(document.referrer);
            return referrerUrl.origin === window.location.origin;
        } catch {
            return false;
        }
    };

    const back = useCallback((): void => {
        if (canGoBack() && isSameOriginReferrer()) {
            try {
                navigate(-1);
            } catch {
                navigate('/', { replace: true });
            }
        } else {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const to = useCallback(
        (path: To, options?: NavigateOptions): void => {
            navigate(path, options);
        },
        [navigate],
    );

    return { back, to };
}
