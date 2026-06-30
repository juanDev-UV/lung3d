import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faArrowDown,
  faLungs,
  faVirus,
  faHeadSideCough,
  faDisease,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Home = () => {
  const enfermedades = [
    { nombre: "Bronquitis", color: "var(--c-bronquitis)", icon: faLungs, ruta: "pulmon/bronquitis" },
    { nombre: "Neumonía", color: "var(--c-neumonia)", icon: faVirus, ruta: "pulmon/neumonia" },
    { nombre: "Fibrosis Pulmonar", color: "var(--c-fibrosis)", icon: faDisease, ruta: "pulmon/fibrosis-pulmonar" },
    { nombre: "Asma", color: "var(--c-asma)", icon: faHeadSideCough, ruta: "pulmon/asma" },
  ];

  return (
    <>
      <section className="home" id="home">
        <div className="image">
          <motion.img
            src="/images/home-img.svg"
            alt="Ilustración de pulmones saludables"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="content">
          <motion.span
            className="home__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Salud pulmonar en 3D
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span className="home__title-accent">Respira Salud:</span> Descubre las Enfermedades
            Pulmonares y Cómo Prevenirlas
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Bienvenido a nuestra plataforma interactiva sobre salud pulmonar. Explora en{" "}
            <mark>3D</mark> el impacto de diversas enfermedades en los pulmones, conoce sus
            <strong> síntomas, tratamientos y medidas de prevención</strong>. Una experiencia
            educativa innovadora para proteger tu salud respiratoria de manera visual y dinámica.
          </motion.p>

          <Link to="/enfermedades" className="btn">
            Explora Tus Pulmones en 3D
            <span className="icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </Link>
        </div>
      </section>

      <div className="arrow-container">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <FontAwesomeIcon icon={faArrowDown} className="down-arrow" />
        </motion.div>
      </div>

      <div className="card-container">
        {enfermedades.map((enf, index) => (
          <Link to={enf.ruta} key={index} className="card-link">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              style={{ "--card-color": enf.color }}
            >
              <span className="card__icon">
                <FontAwesomeIcon icon={enf.icon} />
              </span>
              <h4>{enf.nombre}</h4>
              <span className="card__cta">
                Ver en 3D <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
