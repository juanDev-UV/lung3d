import { NavLink } from "react-router";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className="logo" >
        <FontAwesomeIcon icon={faLungs} /> Respira3D
      </div>
      <nav className="content-nav">
      <NavLink to="/" className="nav-item">
          Inicio
        </NavLink>
        <NavLink to="/enfermedades" className="nav-item">
          Enfermedades
        </NavLink>
        <NavLink to="/quiz" className="nav-item">
          Quiz interactivo
        </NavLink>
        <NavLink to="/acerca-de-nosotros" className="nav-item">
          Acerca de nosotros
        </NavLink>
      </nav>
      <a href="/iniciar-sesion" className="button-login">
        Iniciar Sesion
      </a>
    </header>
  ); 
};

export default Header;
