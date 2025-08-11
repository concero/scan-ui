import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Address } from './pages'

export const Navigator = (): ReactElement => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/address/:address" element={<Address />} />
				<Route path="/txHash/:txHash" element={<Address />} />
				<Route path="/message/:message" element={<Address />} />
			</Routes>
		</>
	)
}
