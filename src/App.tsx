import './styles/App.css'
import '@concero/ui-kit/styles/concero/index.css'
import { Navigator } from './Navigator'
import { AppProviders } from './providers/AppProviders'
import { ModalManager } from './components/common/ModalManager/ModalManager'

function App() {
	return (
		<AppProviders>
			<ModalManager />
			<Navigator />
		</AppProviders>
	)
}

export default App
