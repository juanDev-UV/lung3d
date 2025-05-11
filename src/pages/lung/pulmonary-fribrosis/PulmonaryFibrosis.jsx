/* eslint-disable react/no-unknown-property */
import "./PulmonaryFibrosis.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import RespiratorySystem from "./models-3d/RespiratorySystem";
import Lights from "./lights/lights";

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
            <Canvas shadows camera={{ position: [0, 0, 5] }}>
              <OrbitControls />
              <Lights />
              <RespiratorySystem
                scale={11}
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default PulmonaryFibrosis;
