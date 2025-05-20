import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Reserve } from './components/Reserve/Reserve';
import { Complexes } from './components/Complexes/Complexes';
import { Home } from './components/Home/Home';

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  return (
    <>
      {showNavBar && <NavBar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prueba' element={<Header />} />
        <Route path='/reserve' element={<Reserve />} />
        <Route path='/complexes' element={<Complexes />} />
      </Routes>
    </>
  );
}

export default App;
