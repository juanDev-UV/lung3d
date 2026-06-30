import "./Diseaes.css";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLungs,
  faVirus,
  faHeadSideCough,
  faDisease,
  faArrowRight,
  faArrowLeft,
  faClock,
  faHourglassHalf,
  faCheck,
  faCube,
} from "@fortawesome/free-solid-svg-icons";

const cronicas = [
  "Asma",
  "Bronquitis",
  "Enfermedad pulmonar obstructiva crónica (EPOC)",
  "Sarcoidosis",
  "Hipertensión pulmonar",
  "Síndrome de apnea del sueño",
];

const agudas = ["Neumonía", "Gripe", "Faringitis", "Amigdalitis", "Laringitis", "Traqueítis"];

const explorables = [
  {
    nombre: "Bronquitis",
    color: "var(--c-bronquitis)",
    icon: faLungs,
    ruta: "/pulmon/bronquitis",
    desc: "Inflamación de los bronquios que dificulta el paso del aire a los pulmones.",
  },
  {
    nombre: "Neumonía",
    color: "var(--c-neumonia)",
    icon: faVirus,
    ruta: "/pulmon/neumonia",
    desc: "Infección que inflama los sacos de aire de uno o ambos pulmones.",
  },
  {
    nombre: "Fibrosis Pulmonar",
    color: "var(--c-fibrosis)",
    icon: faDisease,
    ruta: "/pulmon/fibrosis-pulmonar",
    desc: "Cicatrización progresiva del tejido pulmonar que reduce su elasticidad.",
  },
  {
    nombre: "Asma",
    color: "var(--c-asma)",
    icon: faHeadSideCough,
    ruta: "/pulmon/asma",
    desc: "Vías respiratorias inflamadas que se estrechan y dificultan respirar.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Diseases = () => {
  return (
    <section className="diseases" id="diseases">
      <Link to="/" className="back-btn">
        <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
      </Link>

      {/* HERO */}
      <div className="diseases__hero">
        <motion.div
          className="diseases__hero-text"
          variants={fade}
          initial="hidden"
          animate="show"
        >
          <span className="diseases__eyebrow">
            <FontAwesomeIcon icon={faCube} /> Conoce tus pulmones
          </span>
          <h3>
            Enfermedades <span className="grad">Pulmonares</span>
          </h3>
          <p>
            Se clasifican en <strong>agudas</strong> y <strong>crónicas</strong>. Aquí puedes
            conocerlas y explorar las principales en modelos <mark>3D</mark> interactivos.
          </p>
          <div className="diseases__chips">
            <span className="chip">
              <FontAwesomeIcon icon={faCube} /> 4 modelos 3D
            </span>
            <span className="chip">
              <FontAwesomeIcon icon={faHourglassHalf} /> Crónicas
            </span>
            <span className="chip">
              <FontAwesomeIcon icon={faClock} /> Agudas
            </span>
          </div>
        </motion.div>

        <motion.div
          className="diseases__hero-img"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/images/pulmon.svg" alt="Ilustración de pulmones" />
        </motion.div>
      </div>

      {/* TIPOS */}
      <div className="diseases__lists">
        <motion.article
          className="disease-card disease-card--cronicas"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="disease-card__head">
            <span className="disease-card__icon">
              <FontAwesomeIcon icon={faHourglassHalf} />
            </span>
            <div>
              <h2>Crónicas</h2>
              <p>De larga duración, se desarrollan de forma gradual.</p>
            </div>
          </div>
          <ul>
            {cronicas.map((d) => (
              <li key={d}>
                <FontAwesomeIcon icon={faCheck} /> {d}
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          className="disease-card disease-card--agudas"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          <div className="disease-card__head">
            <span className="disease-card__icon">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <div>
              <h2>Agudas</h2>
              <p>De corta duración, frecuentemente causadas por infecciones.</p>
            </div>
          </div>
          <ul>
            {agudas.map((d) => (
              <li key={d}>
                <FontAwesomeIcon icon={faCheck} /> {d}
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      {/* EXPLORA EN 3D */}
      <div className="diseases__explore-header">
        <h2 className="diseases__explore-title">
          Explora en <span className="grad">3D</span>
        </h2>
        <p>Entra a cada enfermedad y manipula su modelo interactivo.</p>
      </div>

      <div className="diseases__explore">
        {explorables.map((e, i) => (
          <motion.div
            key={e.nombre}
            variants={fade}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link to={e.ruta} className="explore-card" style={{ "--card-color": e.color }}>
              <span className="explore-card__icon">
                <FontAwesomeIcon icon={e.icon} />
              </span>
              <div className="explore-card__body">
                <span className="explore-card__name">{e.nombre}</span>
                <span className="explore-card__desc">{e.desc}</span>
              </div>
              <span className="explore-card__cta">
                Ver modelo <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Diseases;
