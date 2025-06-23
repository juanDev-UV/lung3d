import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className = "footer"> 
      <ul > 
        <li> 
          <Link to="/acerca-de-nosotros" >Acerca de Nosotros</Link>
        </li>
        <li> 
          <Link to="/mapa-del-sitio" >Mapa del Sitio</Link>
        </li>
      </ul>
      @copyright2025
    </footer>
  );
};

export default Footer;

{/*style={{ listStyle: 'none', padding: 20, margin: 20, display: 'flex', justifyContent: 'center' }}*/}