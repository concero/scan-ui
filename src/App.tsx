import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Message } from './pages/Message';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </>
  );
}

export default App;