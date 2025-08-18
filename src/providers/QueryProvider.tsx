import type { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }): ReactElement => {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
