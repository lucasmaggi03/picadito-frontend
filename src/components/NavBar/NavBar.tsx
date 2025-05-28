import { Link } from "react-router-dom";
import "./NavBar.css";
import img from '../../img/logo2.webp';

export function NavBar() {
  return (
    <nav className="nav-head">
      <div className="nav-logo">
        <img className="logo-circle" src={img} alt="" />
      </div>

      <ul className="nav-menu">
        <li><Link to="/reservar">Reservar</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/login" className="auth-btn">Iniciar Sesión</Link></li>
        <li><Link to="/register" className="auth-btn">Registrarse</Link></li>
      </ul>
    </nav>
  );
}
