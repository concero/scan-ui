import './styles/App.css'
import '@concero/ui-kit/styles/concero/index.css'
import { Navigator } from './Navigator'
import { AppProviders } from './providers/AppProviders'
import { ModalManager } from './components/common'
import { NotificationManager } from './components/common'

function App() {
	return (
		<AppProviders>
			<ModalManager />
			<NotificationManager />
			<Navigator />
		</AppProviders>
	)
}

export default App
