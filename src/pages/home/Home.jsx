import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const Home = () => {

  return (

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
  
          <a href="/" className="btn">
            Explora Tus Pulmones en 3D
            <span className="icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </a>
        </div>
      </section>
  );
};


export default Home;
