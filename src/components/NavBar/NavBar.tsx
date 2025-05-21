import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav-head">
        <Link to="/"> <img className="logo" src="src\img\logo.png" alt="" /></Link>

      <ul className="nav-menu">

        <div className="nav-menu-left"> 

          <li><Link to="/reservar">Reservar</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

        </div>

          <li><Link to="/login" className="auth-btn">Iniciar Sesión</Link></li>
          <li><Link to="/register" className="auth-btn">Registrarse</Link></li>
      </ul>
    </nav>
  );
}
