import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { HomePage, AddressPage, TransactionPage } from './pages'

export const Navigator = (): ReactElement => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/address/:address" element={<AddressPage />} />
				<Route path="/transaction/:identifier" element={<TransactionPage />} />
			</Routes>
		</>
	)
}
