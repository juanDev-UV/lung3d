import "./PulmonaryFibrosis.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import RespiratorySystem from "./models-3d/RespiratorySystem";
import Bronchioles from "./models-3d/Bronchioles";
import Medkit from "./models-3d/Medkit";
import DirectionalLight from "./lights/DirectionalLight";
import PointLight from "./lights/PointLight";
import { KeyboardControlsWrapper } from "./controls/KeyboadControls";
import StagingIntro from "./staging/StagingIntro";
import CompleteSystem from "./models-3d/CompleteRespiratorySystem";

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
                <StagingIntro />
                <RespiratorySystem
                  scale={5}
                  position={[0, -1, 0]}
                  castShadow
                  receiveShadow
                />
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
              en reposo. Tos seca persistente. Cansancio extremo. Pérdida de
              peso involuntaria. Dolor muscular o articular. Acropaquia.
            </p>
          </div>
          <div className="model model-bronchioles">
            <KeyboardControlsWrapper
              map={[
                { name: "moveUp", keys: ["w"] },
                { name: "pause", keys: ["p"] },
              ]}
            >
              <Canvas shadows camera={{ position: [0, 0, 9] }}>
                <OrbitControls />
                <PointLight />
                <StagingIntro />
                <Bronchioles
                  scale={11}
                  position={[0, -0.1, 0]}
                  castShadow
                  receiveShadow
                />
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -4, 0]}
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

      {/* Sección 3 */}
      <section className="section section-treatment">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h3 className="title title-treatment">Tratamiento</h3>
            <p className="text text-treatment">
              No existe cura conocida para la FPI. El tratamiento se enfoca en
              aliviar los síntomas y disminuir el avance de la enfermedad.
              Medicamentos como Pirfenidona y Nintedanib pueden ayudar a frenar
              el deterioro pulmonar. El oxígeno suplementario y la
              rehabilitación pulmonar también son comunes.
            </p>
          </div>
          <div className="model model-medkit">
            <KeyboardControlsWrapper>
              <Canvas shadows camera={{ position: [0, 0, 8] }}>
                <OrbitControls />
                <directionalLight
                  castShadow
                  position={[3, 10, 5]}
                  intensity={1.8}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-near={1}
                  shadow-camera-far={20}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <StagingIntro />
                <Medkit
                  scale={11}
                  position={[0, -1, 0]}
                  castShadow
                  receiveShadow
                />
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -5, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
              </Canvas>
            </KeyboardControlsWrapper>
          </div>
        </div>
        <div className="arrow arrow-treatment">▼</div>
      </section>

      {/* Sección 4 */}
      <section className="section section-cases">
        <div className="section-content row-normal">
          <div className="text-content">
            <h3 className="title title-cases">Casos</h3>
            <p className="text text-cases">
              En general, se supone que la mortalidad en la FPI es el resultado
              de una enfermedad pulmonar fibrótica progresiva que conduce a
              insuficiencia respiratoria. Sin embargo, también se reconoce la
              influencia de factores como hipertensión pulmonar o exacerbaciones
              agudas. Aún se requieren más estudios clínicos para comprender
              completamente su impacto.
            </p>
          </div>
          <div className="model model-complete-respiratory-system">
            <KeyboardControlsWrapper
              map={[
                { name: "moveUp", keys: ["w"] },
                { name: "pause", keys: ["p"] },
              ]}
            >
              <Canvas
                className="canvas canvas-complete-respiratory-system"
                camera={{ position: [0, 0.5, 10] }}
                shadows
              >
                <OrbitControls />
                <directionalLight
                  castShadow
                  position={[5, 10, 5]}
                  intensity={2}
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                  shadow-camera-near={1}
                  shadow-camera-far={30}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <ambientLight intensity={0.4} />
                <mesh
                  receiveShadow
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, -4, 0]}
                >
                  <planeGeometry args={[20, 20]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
                <StagingIntro />
                <CompleteSystem
                  scale={12}
                  position={[0, -1, 0]}
                  castShadow
                  receiveShadow
                />
              </Canvas>
            </KeyboardControlsWrapper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PulmonaryFibrosis;
