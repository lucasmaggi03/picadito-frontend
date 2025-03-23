import { Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Reserve } from './components/Reserve/Reserve';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/reserve' element={<Reserve/>}/>
      </Routes>
    </>
  );
}

export default App;