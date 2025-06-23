import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./SiteMap.css"; // opcional, si decides mover estilos ahí

const SiteMap = () => {
    return (
        <section className="site-map">
            <div className="content">
                <h3>Mapa del Sitio</h3>
                <p>
                    Explora fácilmente todas las secciones disponibles en nuestra plataforma educativa.
                </p>

                <ul className="sitemap-list">
                    <li className="btn">
                        <Link to="/">Inicio</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>
                    <li className="btn">
                        <Link to="/perfil">Perfil</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>
                    <li className="btn">
                        <Link to="/quiz">Quiz</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>
                    <li className="btn">
                        <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>
                    <li className="btn">
                        <Link to="/enfermedades">Enfermedades</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>
                    <li className="btn">
                        <Link to="/acerca-de-nosotros">Acerca de Nosotros</Link>
                        <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </li>

                    <li className="btn">
                        <span>Pulmón</span>
                    </li>
                    <ul className="sub-list">
                        <li className="btn">
                            <Link to="/pulmon/asma">Asma</Link>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </li>
                        <li className="btn">
                            <Link to="/pulmon/bronquitis">Bronquitis</Link>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </li>
                        <li className="btn">
                            <Link to="/pulmon/neumonia">Neumonía</Link>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </li>
                        <li className="btn">
                            <Link to="/pulmon/fibrosis-pulmonar">Fibrosis Pulmonar</Link>
                            <span><FontAwesomeIcon icon={faChevronRight} /></span>
                        </li>
                    </ul>
                </ul>
            </div>
        </section>
    );
};

export default SiteMap;
