/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import "./Asthma.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import LungInflammationModel from "./models-3d/LungAsthma";
import LungSymptomsAsthmaModel from "./models-3d/SymptomsAsthma";
import Lights from "./lights/Lights";
import Floor from "./models-3d/Floor";
import StagingAsthma from "./staging/StagingAsthma";

const RotatingModel = ({
  ModelComponent,
  scale,
  groupRef,
  isRotating,
  rotationSpeed = 0.005,
  position = [0, 1.86, 2], // Nueva prop position con valor por defecto
}) => {
  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <ModelComponent scale={scale} castShadow />
    </group>
  );
};

const Asthma = () => {
  // Posiciones independientes para cada modelo
  const initialPosition1 = [0, 1, 4.5];
  const initialPosition2 = [0, 0.6, 1.5]; // Puedes ajustar esta posición a la que quieras

  const [xPosition, setXPosition] = useState(0); // Movimiento solo para modelo 1 (introducción)

  const [isRotatingSection1, setIsRotatingSection1] = useState(true);
  const groupRef1 = useRef();

  const [isRotatingSection2, setIsRotatingSection2] = useState(true);
  const groupRef2 = useRef();

  // Movimiento con teclado para sección 1
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setXPosition((prev) => prev - 1);
      if (e.key === "ArrowRight") setXPosition((prev) => prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animación suave de reinicio con gsap - Sección 1
  const handleResetSection1 = () => {
    if (groupRef1.current) {
      gsap.to(groupRef1.current.position, {
        x: initialPosition1[0] + xPosition, // Mantener el offset xPosition actual
        y: initialPosition1[1],
        z: initialPosition1[2],
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(groupRef1.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.out",
      });
      // También puedes resetear el xPosition a 0 si quieres que vuelva al centro
      setXPosition(0);
    }
  };

  // Animación suave de reinicio con gsap - Sección 2
  const handleResetSection2 = () => {
    if (groupRef2.current) {
      gsap.to(groupRef2.current.position, {
        x: initialPosition2[0],
        y: initialPosition2[1],
        z: initialPosition2[2],
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(groupRef2.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="asthma-container">
      {/* Sección 1: Introducción al Asma */}
      <section className="section section-intro">
        <div className="section-content row-reverse">
          <div className="text-content">
            <h2 className="title title-intro">Asma</h2>
            <p className="text text-intro">
              El asma es una enfermedad crónica de las vías respiratorias que
              causa inflamación y estrechamiento de los bronquios. Esto provoca
              dificultad para respirar, opresión en el pecho y otros síntomas
              respiratorios, especialmente durante crisis asmáticas.
            </p>
          </div>
          <div className="model model-asthma" style={{ position: "relative" }}>
            <Canvas shadows camera={{ position: [0, 2, 12], fov: 50 }}>
              <OrbitControls />
              <Floor />
              <Lights type="A" />

              <StagingAsthma />

              <Html position={[4, 1, 0]} style={{ pointerEvents: "auto" }}>
                <div className="canvas-html-message">
                  Presiona ← o → para mover el modelo
                </div>
              </Html>

              {/* Aplicamos el movimiento con el grupo externo */}
              <group position={[xPosition, 0, 0]}>
                <RotatingModel
                  ModelComponent={LungInflammationModel}
                  scale={2.5}
                  groupRef={groupRef1}
                  isRotating={isRotatingSection1}
                  position={initialPosition1} // Posición independiente
                />
              </group>

              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
              >
                <circleGeometry args={[10, 64]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>

            <div className="button-container">
              <button
                onClick={() => setIsRotatingSection1(!isRotatingSection1)}
                className={`primary ${isRotatingSection1 ? "active" : ""}`}
              >
                {isRotatingSection1 ? "Parar" : "Reanudar"}
              </button>
              <button onClick={handleResetSection1} className="success">
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>

      {/* Sección 2: Síntomas del Asma */}
      <section className="section section-symptoms">
        <div className="section-content row-normal">
          <div className="text-content">
            <h3 className="title title-symptoms">Síntomas</h3>
            <p className="text text-symptoms">
              El asma se manifiesta por la inflamación y estrechamiento de las
              vías respiratorias, lo que provoca episodios recurrentes de
              dificultad respiratoria. Los síntomas pueden variar en intensidad
              y frecuencia, y a menudo empeoran por la noche o durante la
              actividad física.
              <br />
              <br />
              <strong>Síntomas comunes:</strong>
              <br />
              • Dificultad para respirar
              <br />
              • Tos frecuente, especialmente por la noche
              <br />
              • Silbidos al respirar (sibilancias)
              <br />
              • Opresión en el pecho
              <br />• Fatiga durante el ejercicio
            </p>
          </div>
          <div
            className="model model-symptoms"
            style={{ position: "relative" }}
          >
            <Canvas shadows camera={{ position: [0, 1.5, 10], fov: 45 }}>
              <OrbitControls />
              <Floor />
              <Sky sunPosition={[100, 20, 100]} />
              <Lights type="B" />

              <RotatingModel
                ModelComponent={LungSymptomsAsthmaModel}
                scale={3}
                groupRef={groupRef2}
                isRotating={isRotatingSection2}
                position={initialPosition2} // Posición independiente
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

            <div className="button-container">
              <button
                onClick={() => setIsRotatingSection2(!isRotatingSection2)}
                className={`primary ${isRotatingSection2 ? "active" : ""}`}
              >
                {isRotatingSection2 ? "Parar" : "Reanudar"}
              </button>
              <button onClick={handleResetSection2} className="success">
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        <div className="arrow arrow-symptoms">▼</div>
      </section>
    </div>
  );
};

export default Asthma;
