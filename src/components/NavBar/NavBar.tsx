import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav-head">
      <div className="nav-logo">
        <img className="logo-circle" src="../../../public/logo.webp" alt="" />
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
