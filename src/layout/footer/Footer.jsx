import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111', color: '#fff', padding: '20px', textAlign: 'center' }}> {/* Estilos en línea para el footer */}
      <ul style={{ listStyle: 'none', padding: 20, margin: 20, display: 'flex', justifyContent: 'center' }}> {/* Estilos en línea para la lista */}
        <li style={{ margin: '0 100px', fontSize: 20}}> {/* Estilos en línea para los items */}
          <Link to="/pulmon/bronquitis" >Bronquitis</Link> {/* Estilos en línea para los links */}
        </li>
        <li style={{ margin: '0 100px' , fontSize: 20}}>
          <Link to="/pulmon/neumonia" >Neumonia</Link>
        </li>
        <li style={{ margin: '0 100px' , fontSize: 20}}>
          <Link to="/pulmon/fibrosis-pulmonar" >Fibrosis Pulmonar</Link>
        </li>
        <li style={{ margin: '0 100px', fontSize: 20 }}>
          <Link to="/pulmon/asma" >Asma</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
