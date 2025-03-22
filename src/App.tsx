import { Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Header />} />
      </Routes>
    </>
  );
}

export default App;