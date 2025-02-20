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
      <nav>
      <NavLink to="/" className="nav-item">
          Inicio
        </NavLink>
        <NavLink to="/enfermedades" className="nav-item">
          Enfermedades
        </NavLink>
        <NavLink to="/quiz" className="nav-item">
          Quiz interactivo
        </NavLink>
        <NavLink to="/about-us" className="nav-item">
          Acerca de nosotros
        </NavLink>
        <NavLink to="/iniciar-sesion" className="nav-item">
          Iniciar seion/Registrarse
        </NavLink>
      </nav>
    </header>
  ); 
};

export default Header;
