import "./PulmonaryFibrosis.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import RespiratorySystem from "./models-3d/RespiratorySystem";
import Bronchioles from "./models-3d/Bronchioles";
import DirectionalLight from "./lights/DirectionalLight";
import PointLight  from "./lights/PointLight";
import { KeyboardControlsWrapper } from "./controls/KeyboadControls";
import Staging from "./staging/Staging"

const PulmonaryFibrosis = () => {
  return (
    <div className="respiratory-system-container">
      {/* Sección 1 */}
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h2 className="title title-intro">Fibrosis Pulmonar</h2>
            <p className="text text-intro">
              La fibrosis pulmonar es una enfermedad caracterizada por la
              formación de tejido cicatricial en los pulmones, lo que los hace
              rígidos y dificulta la respiración y el paso del oxígeno a la
              sangre. Se trata de una condición crónica y progresiva que puede
              ser causada por diversas razones, incluyendo exposiciones
              ambientales, enfermedades subyacentes o, en algunos casos, sin una
              causa clara.
            </p>
          </div>
          <div className="model model-respiratory-system">
            <KeyboardControlsWrapper>
              <Canvas shadows camera={{ position: [0, 0.5, 3.5] }}>
                <OrbitControls />
                <DirectionalLight />
                <Staging/>
                <RespiratorySystem
                  scale={5}
                  position={[0, -1, 0]}
                  castShadow
                  receiveShadow
                />
                {/* Suelo para recibir la sombra */}
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -2.2, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControlsWrapper>
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
              La fibrosis pulmonar se caracteriza principalmente por falta de
              aire, tos seca, cansancio extremo y pérdida de peso involuntaria.
              También puede manifestarse como dolor muscular o articular, y en
              casos avanzados, acropaquia (ensanchamiento de las puntas de los
              dedos). Síntomas más comunes: Falta de aire (disnea): Puede ser
              inicialmente con el esfuerzo, pero progresa hasta la falta de aire
              en reposo. Tos seca: Una tos persistente que no se acompaña de
              flema. Cansancio extremo: A pesar de dormir lo suficiente, la
              persona se siente exhausta y sin energía. Pérdida de peso
              involuntaria: Una pérdida de peso sin explicación aparente. Dolor
              muscular o articular: Dolores en los músculos y articulaciones que
              pueden ser persistentes. Acropaquia: Ensanchamiento y redondeo de
              las puntas de los dedos de las manos y los pies.
            </p>
          </div>
          <div className="model model-brnchioles">
            <Canvas shadows camera={{ position: [0, 0, 7] }}>
              <OrbitControls />
              <PointLight />
              <Bronchioles
                scale={11}
                position={[0, -1, 0]}
                castShadow
                receiveShadow
              />
              {/* Suelo para recibir la sombra */}
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -4, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>
      ;
    </div>
  );
};

export default PulmonaryFibrosis;

