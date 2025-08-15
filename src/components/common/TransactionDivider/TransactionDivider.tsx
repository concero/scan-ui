import { ReactElement, useMemo } from 'react'
import './styles.pcss'

export const TransactionDivider = (): ReactElement => {
	return useMemo(() => {
		return <div className="transaction_divider" />
	}, [])
}
