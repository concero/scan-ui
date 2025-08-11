import './styles/App.css'
import '@concero/ui-kit/styles/concero/index.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Address } from './pages'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/address/:address" element={<Address/>} />
			</Routes>
		</>
	)
}

export default App
