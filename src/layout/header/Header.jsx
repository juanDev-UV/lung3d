import { NavLink } from "react-router";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/use-auth-store";

const Header = () => {
  const { userLooged } = useAuthStore();

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
        { userLooged && (
        <NavLink to="/quiz" className="nav-item">
          Quiz interactivo
        </NavLink>
        )}
        <NavLink to="/acerca-de-nosotros" className="nav-item">
          Acerca de nosotros
        </NavLink>
      </nav>
      {userLooged ? (
        <NavLink to="/perfil" className="button-login">
          Perfil
        </NavLink>
      ) : (
        <NavLink to="/iniciar-sesion" className="button-login">
          Iniciar Sesión
        </NavLink>
      )}
    </header>
  ); 
};

export default Header;
