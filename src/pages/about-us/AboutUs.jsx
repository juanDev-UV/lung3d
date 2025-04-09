import "./AboutUs.css";

const AboutUs = () => {
    return (
        <section className="about-us" id="about-us">
            <div className="image-about-us">
                <img src="/images/enfermera.svg" alt="Animación" />
            </div>
            <div className="content">
                <h3>
                    Acerca de Nosotros
                </h3>
                <p>
                    En Respira3D, nos apasiona brindar información confiable y actualizada sobre la salud 
                    pulmonar. Nuestra misión es educar y concienciar a las personas sobre la importancia de 
                    cuidar sus pulmones, promoviendo hábitos saludables y proporcionando recursos 
                    basados en evidencia científica.
                    <br/>
                    A través de artículos, guías y noticias, buscamos ser una fuente confiable para quienes desean mejorar su calidad de vida y la de sus seres queridos. Creemos que el conocimiento es la mejor herramienta para la prevención y el bienestar.
                </p>
                <h3>
                    Servicios de Ayuda y Atencion
                </h3>
                <p className="custom-list">
                    <li>Información detallada sobre enfermedades respiratorias y su prevención.</li>
                    <li>Recursos educativos para pacientes y profesionales de la salud.</li>
                    <li>Comunidad de apoyo para compartir experiencias y resolver dudas.</li>
                    <li>Noticias y actualizaciones sobre avances en el campo de la neumología.</li>
                </p>
            </div>
        </section>
    );
}

export default AboutUs