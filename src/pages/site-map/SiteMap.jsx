import { Link } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faHouse,
  faUser,
  faRightToBracket,
  faGamepad,
  faVirus,
  faLungs,
  faHeadSideCough,
  faDisease,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import "./SiteMap.css";

const grupos = [
  {
    titulo: "Navegación",
    items: [
      { nombre: "Inicio", ruta: "/", icon: faHouse },
      { nombre: "Enfermedades", ruta: "/enfermedades", icon: faVirus },
      { nombre: "Quiz interactivo", ruta: "/quiz", icon: faGamepad },
    ],
  },
  {
    titulo: "Cuenta",
    items: [
      { nombre: "Perfil", ruta: "/perfil", icon: faUser },
      { nombre: "Iniciar Sesión", ruta: "/iniciar-sesion", icon: faRightToBracket },
    ],
  },
  {
    titulo: "Modelos 3D",
    items: [
      { nombre: "Asma", ruta: "/pulmon/asma", icon: faHeadSideCough, color: "var(--c-asma)" },
      { nombre: "Bronquitis", ruta: "/pulmon/bronquitis", icon: faLungs, color: "var(--c-bronquitis)" },
      { nombre: "Neumonía", ruta: "/pulmon/neumonia", icon: faVirus, color: "var(--c-neumonia)" },
      {
        nombre: "Fibrosis Pulmonar",
        ruta: "/pulmon/fibrosis-pulmonar",
        icon: faDisease,
        color: "var(--c-fibrosis)",
      },
    ],
  },
];

const SiteMap = () => {
  return (
    <section className="site-map">
      <Link to="/" className="back-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
      </Link>

      <div className="site-map__head">
        <span className="site-map__eyebrow">
          <FontAwesomeIcon icon={faSitemap} /> Navega con facilidad
        </span>
        <h3>
          Mapa del <span className="grad">Sitio</span>
        </h3>
        <p>Explora todas las secciones disponibles en nuestra plataforma educativa.</p>
      </div>

      <div className="site-map__groups">
        {grupos.map((g, gi) => (
          <motion.div
            key={g.titulo}
            className="sitemap-group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.08, duration: 0.5 }}
          >
            <h4 className="sitemap-group__title">{g.titulo}</h4>
            <ul className="sitemap-list">
              {g.items.map((it) => (
                <li key={it.nombre}>
                  <Link
                    to={it.ruta}
                    className="sitemap-item"
                    style={{ "--card-color": it.color || "var(--green)" }}
                  >
                    <span className="sitemap-item__icon">
                      <FontAwesomeIcon icon={it.icon} />
                    </span>
                    <span className="sitemap-item__name">{it.nombre}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="sitemap-item__arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SiteMap;
