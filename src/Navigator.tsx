import { Suspense, type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { HomePage, AddressPage, TransactionPage, MissingPage } from './pages'
import { ScreenLoader } from './components/common/ScreenLoader'

export const Navigator = (): ReactElement => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/address/:address"
					element={
						<Suspense fallback={<ScreenLoader />}>
							<AddressPage />
						</Suspense>
					}
				/>
				<Route path="/transaction/:identifier" element={<TransactionPage />} />
				<Route path="*" element={<MissingPage />} />
			</Routes>
		</>
	)
}
