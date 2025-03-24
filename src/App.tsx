import { Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Reserve } from './components/Reserve/Reserve';
import { Complexes } from './components/Complexes/Complexes';
import {Footer} from './components/Footer/Footer'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/reserve' element={<Reserve/>}/>
        <Route path='/complexes' element={<Complexes/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;