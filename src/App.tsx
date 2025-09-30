import './styles/App.css'
import '@concero/ui-kit/styles/concero/index.css'
import { Navigator } from './Navigator'
import { AppProviders } from './providers/AppProviders'
import { ModalManager, Notifications } from './components/common'

function App() {
	return (
		<AppProviders>
			<ModalManager />
			<Notifications />
			<Navigator />
		</AppProviders>
	)
}

export default App
