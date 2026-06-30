import "./AboutUs.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookMedical,
  faUsers,
  faNewspaper,
  faHeartPulse,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

const servicios = [
  {
    icon: faBookMedical,
    title: "Información confiable",
    text: "Detalles sobre enfermedades respiratorias y su prevención, basados en evidencia.",
  },
  {
    icon: faHeartPulse,
    title: "Recursos educativos",
    text: "Material para pacientes y profesionales de la salud.",
  },
  {
    icon: faUsers,
    title: "Comunidad de apoyo",
    text: "Un espacio para compartir experiencias y resolver dudas.",
  },
  {
    icon: faNewspaper,
    title: "Noticias y avances",
    text: "Actualizaciones sobre los avances en neumología.",
  },
];

const AboutUs = () => {
  return (
    <section className="about-us" id="about-us">
      <Link to="/" className="back-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
      </Link>

      {/* HERO */}
      <div className="about__hero">
        <motion.div
          className="about__hero-text"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="about__eyebrow">
            <FontAwesomeIcon icon={faBullseye} /> Nuestra misión
          </span>
          <h3>
            Acerca de <span className="grad">Nosotros</span>
          </h3>
          <p>
            En <strong>Respira3D</strong> nos apasiona brindar información confiable y actualizada
            sobre la salud pulmonar. Educamos y concienciamos sobre la importancia de cuidar los
            pulmones, promoviendo hábitos saludables con recursos basados en evidencia científica.
          </p>
          <p>
            Creemos que el conocimiento es la mejor herramienta para la prevención y el bienestar.
          </p>
        </motion.div>

        <motion.div
          className="about__hero-img"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/images/enfermera.svg" alt="Ilustración de personal de salud" />
        </motion.div>
      </div>

      {/* SERVICIOS */}
      <h2 className="about__services-title">
        Servicios de <span className="grad">ayuda y atención</span>
      </h2>
      <div className="about__services">
        {servicios.map((s, i) => (
          <motion.article
            key={s.title}
            className="service-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <span className="service-card__icon">
              <FontAwesomeIcon icon={s.icon} />
            </span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
