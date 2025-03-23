import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <nav className="nav-head">
      <ul className="nav-item">
        <li className="nav-li">
          <Link to="/" className="nlink">
            Inicio
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/reservar" className="nlink">
            Reservar
          </Link>
        </li>
        <li className="nav-li">
          <Link to="/contacto" className="nlink">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}
