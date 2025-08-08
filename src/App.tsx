import './styles/App.css';
import '@concero/ui-kit/styles/concero/index.css'
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home } from './pages';
import { Message } from './pages';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;