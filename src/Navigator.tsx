import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { HomePage, Address, Transaction } from './pages'

export const Navigator = (): ReactElement => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/address/:address" element={<Address />} />
				<Route path="/txHash/:txHash" element={<Transaction />} />
				<Route path="/message/:message" element={<Transaction />} />
			</Routes>
		</>
	)
}
