import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Home = () => {
  const enfermedades = [
    { nombre: "Bronquitis", color: "#1ec4a2" },
    { nombre: "Neumonía", color: "#1ec4a2" },
    { nombre: "Fibrosis Pulmonar", color: "#1ec4a2" },
    { nombre: "Asma", color: "#1ec4a2" },
  ];

  return (
    <>
      <section className="home" id="home">
        <div className="image">
          <img src="/images/home-img.svg" alt="Animación" />
        </div>
        <div className="content">
          <h3>
            Respira Salud: Descubre las Enfermedades Pulmonares y Cómo Prevenirlas
          </h3>
          <p>
            Bienvenido a nuestra plataforma interactiva sobre salud pulmonar. Aquí
            podrás explorar en 3D el impacto de diversas enfermedades en los
            pulmones, conocer sus síntomas, tratamientos y medidas de prevención.
            Sumérgete en una experiencia educativa innovadora y aprende a proteger
            tu salud respiratoria de manera visual y dinámica.
          </p>

          <a href="/enfermedades" className="btn">
            Explora Tus Pulmones en 3D
            <span className="icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </a>
        </div>
      </section>

      <div className="arrow-container">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FontAwesomeIcon icon={faArrowDown} className="down-arrow" />
        </motion.div>
      </div>

      <div className="card-container">
        {enfermedades.map((enf, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{ backgroundColor: enf.color }}
          >
            <h4>{enf.nombre}</h4>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Home;