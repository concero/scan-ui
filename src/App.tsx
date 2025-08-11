import './styles/App.css'
import '@concero/ui-kit/styles/concero/index.css'
import { Navigator } from './Navigator'
import { AppProviders } from './providers/AppProviders'

function App() {
	return (
		<AppProviders>
			<Navigator />
		</AppProviders>
	)
}

export default App
