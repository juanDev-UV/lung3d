/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import "./Bronchitis.css"
import { Canvas } from "@react-three/fiber";
import Nurse from "./models-3d/Nurse";
import LungRith from "./models-3d/LungRight";
import HealthPack from "./models-3d/HealthPack";
import LungTransparent from "./models-3d/LungTransparent";
import LightsLungRight from "./lights/LightsLungRight";
import Grass from "./models-3d/Grass";
import Floor from "./models-3d/Floor";
import LightsLungTransparent from "./lights/LightsLungTransparent";
import StagingSymptoms from "./staging/StagingSymtoms";
import { useLocation } from "react-router";
import LightsNurse from "./lights/LightsNurse";
import LightsHealthPack from "./lights/LightsHealthPack";
import FloorHealth from "./models-3d/FloorHealth";
import StagingHealth from "./staging/StagingHealth";


const Bronchitis = () => {
  const location = useLocation();


  return (
    <div className="bronquitis-container">
      {/* Sección 1 */}
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h2 className="title title-intro">Bronquitis</h2>
            <p className="text text-intro-bronchitis">
              La bronquitis es la inflamación de los bronquios, los vías
              respiratorias que llevan el aire a los pulmones. Puede ser aguda,
              causada generalmente por infecciones o crónica, vinculada al
              tabaquismo o la exposición prolongada a contaminantes. Su
              principal consecuencia es la dificultad para respirar debido a la
              producción excesiva de moco y la inflamación de los conductos
              bronquiales.
            </p>
          </div>
          <div className="model model-lung-right" >
            <Canvas className={"canvas canvas-lung-right"}
              camera={{ position: [0, 0, 3] }}
              shadows={true}
              key={location.pathname}>
              <LightsLungRight />
              <StagingSymptoms key={location.pathname}/>
              <directionalLight
                position={[5, 2, 10]}
                intensity={2}
                castShadow={true}
              />
              <LungRith scale={11} />
              <Grass />
              <Grass />
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>

      {/* Sección 2 */}
      <section className="section section-symptoms">
        <div className="section-content row-normal">
          <div className="text-content">
            <h3 className="title title-symptoms">Síntomas</h3>
            <p className="text text-symptoms">
              Los síntomas más comunes incluyen tos persistente con flema,
              fatiga, fiebre leve y dificultad para respirar. Su diagnóstico se
              realiza mediante examen físico, radiografías de tórax y análisis
              de esputo para descartar infecciones bacterianas.
            </p>
          </div>
          <div className="model model-lung-transparent" >
            <Canvas className={"canvas canvas-lung-right"} 
            camera={{ position: [-0.5, 0, 2] }} 
            shadows={true}
            key={location.pathname}>
              <OrbitControls enableZoom={false}/>
              <LightsLungTransparent />
              <StagingSymptoms key={location.pathname}/>
              <directionalLight
                position={[5, 2, 10]}
                intensity={2} />
              <LungTransparent
                scale={5} />
              <Floor />
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-symptoms">▼</div>
      </section>

      {/* Sección 3 */}
      <section className="section section-treatment">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h3 className="title title-treatment">Tratamiento</h3>
            <p className="text text-treatment">
              El tratamiento depende del tipo de bronquitis. En la mayoría de
              los casos, se recomiendan hidratación, descanso, y en casos
              graves, broncodilatadores o corticosteroides. Para prevenir, se
              debe evitar el humo del tabaco, mantenerse alejado de
              contaminantes y vacunarse contra la gripe.
            </p>
          </div>
          <div className="model model-nurse" >
            <Canvas className="canvas canvas-nurse"
            camera={{ position: [0, 0, 3] }}
            shadows={true}
            key={location.pathname}>
              <OrbitControls enableZoom={false}/>
              <LightsNurse />
              <directionalLight position={[5, 2, 10]} intensity={2} />
              <StagingSymptoms key={location.pathname}/>
              <Nurse scale={5} />
              <Grass/>
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-treatment">▼</div>
      </section>

      {/* Sección 4 */}
      <section className="section section-cases">
        <div className="section-content row-normal">
          <div className="text-content">
            <h3 className="title title-cases">Prevencion</h3>
            <p className="text text-cases">
              La prevención de la bronquitis se basa en evitar 
              los factores de riesgo que irritan o inflaman las 
              vías respiratorias, como el humo del tabaco, la 
              contaminación del aire y las infecciones respiratorias.
              Evita el humo del tabaco, la contaminación y 
              el contacto con personas enfermas. Lávate las 
              manos con frecuencia, usa mascarilla si es necesario 
              y mantén tu sistema inmune fuerte con buena alimentación, 
              ejercicio y vacunas.
            </p>
          </div>
          <div className="model model-health-pack" >
            <Canvas className="canvas canvas-health-pack"
            camera={{ position: [3, 0, 5] }}
            shadows={true}
            key={location.pathname}>
              <OrbitControls enableZoom={false}/>
              <LightsHealthPack/>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 2, 10]} intensity={2} />
              <StagingHealth/>
              <HealthPack scale={2} />
              <FloorHealth/>
            </Canvas>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bronchitis;
