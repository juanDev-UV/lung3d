import "./Pneumonia.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PneumoniaModel from "./models-3d/LungPneumonia";
import { Light } from "three";
import Lights from "./lights/Lights";

const Pneumonia = () => {
  return (
    <div className="pneumonia-container">
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h2 className="title title-intro">Neumonía</h2>
            <p className="text text-intro">
              La neumonía es una infección pulmonar que causa inflamación en los
              sacos de aire, llenándolos de líquido o pus. Afecta la respiración,
              produce fiebre, tos y fatiga, y puede ser potencialmente grave sin el
              tratamiento adecuado. Es causada por bacterias, virus o incluso
              hongos, y afecta especialmente a personas con sistemas inmunitarios
              debilitados.
            </p>
          </div>
          <div className="model model-pneumonia">
            <Canvas shadows={true} camera={{ position: [0, 0, 3] }}>
              <OrbitControls />
              <Lights></Lights>
              <PneumoniaModel
                scale={15}
              />
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>
    </div>
  );
};

export default Pneumonia;


