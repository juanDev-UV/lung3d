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
            Las enfermedades pulmonares se pueden clasificar en agudas y crónicas. 
            Las enfermedades pulmonares agudas suelen ser de corta duración y pueden 
            ser causadas por infecciones, mientras que las enfermedades 
            pulmonares crónicas son de larga duración y pueden desarrollarse 
            gradualmente con el tiempo. Ejemplos de enfermedades pulmonares agudas 
            incluyen infecciones como la neumonía, la bronquitis aguda y la influenza. Ejemplos de enfermedades pulmonares crónicas son el asma, la enfermedad pulmonar obstructiva crónica (EPOC) y la fibrosis pulmonar. 
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