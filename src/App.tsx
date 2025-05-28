import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Reserve } from './components/Reserve/Reserve';
import { Complexes } from './components/Complexes/Complexes';
import { Home } from './components/Home/Home';
import { Booking } from './components/Booking/booking'

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/';

  const canchaa = 'Monumental';
  const ubicacione = 'Av. Libertador 1234, Buenos Aires';

  return (
    <>
      {showNavBar && <NavBar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prueba' element={<Header />} />
        <Route path='/reserve' element={<Reserve />} />
        <Route path='/complexes' element={<Complexes />} />
        <Route path='/reservar' element={<Booking cancha={canchaa} ubicacion={ubicacione} />} />
      </Routes>
    </>
  );
}

export default App;
