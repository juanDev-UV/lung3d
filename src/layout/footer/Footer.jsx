import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLungs } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <FontAwesomeIcon icon={faLungs} /> Respira3D
        </div>
        <ul className="footer__links">
          <li>
            <Link to="/enfermedades">Enfermedades</Link>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li>
            <Link to="/acerca-de-nosotros">Acerca de Nosotros</Link>
          </li>
          <li>
            <Link to="/mapa-del-sitio">Mapa del Sitio</Link>
          </li>
        </ul>
      </div>
      <p className="footer__copy">
        © {year} <strong>Respira3D</strong> · Educación interactiva sobre salud pulmonar
      </p>
    </footer>
  );
};

export default Footer;
