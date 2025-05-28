import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Reserve } from './components/Reserve/Reserve';
import { Complexes } from './components/Complexes/Complexes';
import { SingIn } from './components/SingIn/SingIn';
import { Home } from './components/Home/Home';
import { Register } from './components/Register/Register';

function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showNavBar && <NavBar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prueba' element={<Header />} />
        <Route path='/reserve' element={<Reserve />} />
        <Route path='/complexes' element={<Complexes />} />
        <Route path='/login' element={<SingIn />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
