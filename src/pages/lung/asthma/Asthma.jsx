import "./Asthma.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LungInflammationModel from "./models-3d/LungAsthma"; // 👈 tu modelo
import { Light } from "three";
import Lights from "./lights/Lights"; // 👈 tus luces

const Asthma = () => {
  return (
    <div className="asthma-container">
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h2 className="title title-intro">Asma</h2>
            <p className="text text-intro">
              El asma es una enfermedad crónica de las vías respiratorias que causa inflamación y
              estrechamiento de los bronquios. Sus síntomas incluyen dificultad para respirar, tos,
              silbidos y opresión en el pecho. Puede desencadenarse por alérgenos, ejercicio o estrés,
              y requiere un manejo adecuado para controlar los brotes y mejorar la calidad de vida.
            </p>
          </div>
          <div className="model model-asthma">
            <Canvas shadows={true} camera={{ position: [0, 2, 10], fov: 50 }}>
              <OrbitControls />
              <Lights></Lights>
              <LungInflammationModel scale={4} castShadow />
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -3.9, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.5} />
              </mesh>
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>
    </div>
  );
};

export default Asthma;

