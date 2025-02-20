import "./Diseaes.css"

const Diseases = () => {
  return (
        <section className="diseases" id="diseases">
        <div className="image">
          <img src="/images/pulmon.svg" alt="Animación" />
        </div>

        <div className="content">
        <h3>
            Enfermedades Pulmonares
          </h3>
          <p>
            Las enfermedades pulmonares son afecciones que 
            afectan el funcionamiento de los pulmones. 
            Pueden ser agudas o crónicas.
          <br/>
        <div className= "text1">
            <h1>
                Enfermedades pulmonares crónicas
            </h1>
                    -Asma
                <br/>
                    -Bronquitis
                <br/>
                    -Enfermedad pulmonar obstructiva cronica(EPOC)
                <br/>
                    -Sarcoidosis
                <br/>
                    -Hipertension pulmonar
                <br/>
                    -Sindrome apnea del sueño
                <br/>
        </div>
        <div className ="text2">
            <h1>
                Enfermedades pulmonares agudas
            </h1>
                    -Neumonia
                <br/>
                    -Gripe
                <br/>
                    -Faringitis
                <br/>
                    -Amigdalitis
                <br/>
                    -Laringitis
                <br/>
                    -Traqueitis
            </div>
          </p>
        </div>
      </section>
  );
};

export default Diseases