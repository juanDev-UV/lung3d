import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className = "footer"> 
      <ul > 
        <li> 
          <Link to="/pulmon/bronquitis" >Bronquitis</Link>
        </li>
        <li >
          <Link to="/pulmon/neumonia" >Neumonia</Link>
        </li>
        <li >
          <Link to="/pulmon/fibrosis-pulmonar" >Fibrosis Pulmonar</Link>
        </li>
        <li >
          <Link to="/pulmon/asma" >Asma</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

{/*style={{ listStyle: 'none', padding: 20, margin: 20, display: 'flex', justifyContent: 'center' }}*/}