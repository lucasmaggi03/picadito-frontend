import header from '../../img/header.jpg';
import './Header.css'

export function Header() {
  return (
    <header className='header'>
      <img className='img-header' src={header} alt="Header" />
      <div className="search-match">
        <h1>Buscar partido</h1>
        <form className='search-game' action="">
            <div className="search-text">
                <label htmlFor="">Buscar por localidad</label>
                <input type="text" name="" id="" />
            </div>
            <div className="search-text">
                <label htmlFor="">Buscar por predio</label>
                <input type="text" name="" id="" />
            </div>
        </form>
      </div>
    </header>
  );
}