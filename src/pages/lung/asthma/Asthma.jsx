// Asthma.jsx
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import "./Asthma.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Html, Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// MODELOS 3D
import LungInflammationModel from "./models-3d/LungAsthma";
import LungSymptomsAsthmaModel from "./models-3d/SymptomsAsthma";
import LungTreatmentsAsthmaModel from "./models-3d/TreatmentsAsthma";

// ESCENARIO Y LUCES
import Lights from "./lights/Lights";
import Floor from "./models-3d/Floor";
import StagingAsthma from "./staging/StagingAsthma";
import Staging2Asthma from "./staging/Staging2Asthma";

/* ----------------------------- COMPONENTE QUE ROTA ----------------------------- */
// Este componente envuelve un modelo 3D y lo rota automáticamente si `isRotating` es true

const RotatingModel = ({
  ModelComponent,
  scale,
  groupRef,
  isRotating,
  setIsRotating,
  rotationSpeed = 0.005,
  position = [0, 1.86, 2],
  modelName = "",
}) => {
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (isRotating && groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  const handlePointerEnter = () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <ModelComponent scale={scale} castShadow />
      {hovered && (
        <Html distanceFactor={10} position={[2, 1.5, 0]}>
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
              fontFamily: 'Segoe UI, sans-serif',
              border: '1px solid rgba(255,255,255,0.3)',
              transform: 'translateX(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            🫁 {modelName}
          </div>
        </Html>
      )}
    </group>
  );
};

/* ----------------------------- RESET REUTILIZABLE ----------------------------- */
const resetModel = (groupRef, position) => {
  if (groupRef.current) {
    gsap.to(groupRef.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(groupRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      ease: "power2.out",
    });
  }
};

/* ----------------------------- COMPONENTE PRINCIPAL ----------------------------- */

const Asthma = () => {
  // Posiciones iniciales de cada modelo 3D
  const initialPosition1 = [0, 1, 4.5];   // Modelo de introducción
  const initialPosition2 = [0, 0.6, 1.5]; // Modelo de síntomas
  const initialPosition3 = [0, -0.3, 2];     // Modelo de tratamiento

  // Movimiento horizontal para sección 1
  const [xPosition, setXPosition] = useState(0);

  // Control de rotación y referencias para cada modelo
  const [isRotatingSection1, setIsRotatingSection1] = useState(true);
  const groupRef1 = useRef();

  const [isRotatingSection2, setIsRotatingSection2] = useState(true);
  const groupRef2 = useRef();

  const [isRotatingSection3, setIsRotatingSection3] = useState(true);
  const groupRef3 = useRef();

  /* ----------------------------- CONTROL DE TECLADO ----------------------------- */
  // Mueve el modelo de la sección 1 con las flechas izquierda y derecha
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setXPosition((prev) => prev - 1);
      if (e.key === "ArrowRight") setXPosition((prev) => prev + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ----------------------------- RESET CON GSAP ----------------------------- */
  const handleResetSection1 = () => {
    resetModel(groupRef1, [initialPosition1[0] + xPosition, initialPosition1[1], initialPosition1[2]]);
    setXPosition(0);
  };
  const handleResetSection2 = () => resetModel(groupRef2, initialPosition2);
  const handleResetSection3 = () => resetModel(groupRef3, initialPosition3);

  return (
    <div className="asthma-container">

      {/* ---------------------- SECCIÓN 1: INTRODUCCIÓN AL ASMA ---------------------- */}
      <section className="section section-intro">
        <div className="section-content row-reverse">
          {/* Texto de la sección */}
          <div className="text-content">
            <h2 className="title title-intro">Asma</h2>
            <p className="text text-intro">
              El asma es una enfermedad crónica de las vías respiratorias que
              causa inflamación y estrechamiento de los bronquios. Esto provoca
              dificultad para respirar, opresión en el pecho y otros síntomas
              respiratorios, especialmente durante crisis asmáticas.
            </p>
          </div>

          {/* Modelo interactivo con controles de rotación y movimiento horizontal */}
          <div className="model model-asthma" style={{ position: "relative" }}>
            <Canvas shadows camera={{ position: [0, 2, 12], fov: 50 }}>
              <OrbitControls />
              <Floor />
              <Lights type="A" />
              <StagingAsthma />

              {/* Indicador en HTML dentro del Canvas */}
              <Html position={[4, 1, 0]} style={{ pointerEvents: "auto" }}>
                <div className="canvas-html-message">
                  Presiona ← o → para mover el modelo
                </div>
              </Html>

              {/* Movimiento horizontal aplicado a un grupo externo */}
              <group position={[xPosition, 0, 0]}>
                <RotatingModel
                  ModelComponent={LungInflammationModel}
                  scale={2.5}
                  groupRef={groupRef1}
                  isRotating={isRotatingSection1}
                  setIsRotating={setIsRotatingSection1}
                  position={initialPosition1}
                  modelName="Modelo de Asma"
                />
              </group>

              {/* Sombra circular bajo el modelo */}
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
              >
                <circleGeometry args={[10, 64]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>

            {/* Botones para controlar rotación y reinicio */}
            <div className="button-container" role="group" aria-label="Controles sección introducción">
              <button
                onClick={() => setIsRotatingSection1(!isRotatingSection1)}
                className={`primary ${isRotatingSection1 ? "active" : ""}`}
                aria-pressed={isRotatingSection1}
                aria-label="Controlar rotación del modelo de introducción"
              >
                {isRotatingSection1 ? "Parar" : "Reanudar"}
              </button>
              <button
                onClick={handleResetSection1}
                className="success"
                aria-label="Reiniciar modelo de introducción"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        <div className="arrow arrow-intro">▼</div>
      </section>

      {/* ---------------------- SECCIÓN 2: SÍNTOMAS DEL ASMA ---------------------- */}
      <section className="section section-symptoms">
        <div className="section-content row-normal">
          {/* Texto explicativo de síntomas */}
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

          {/* Modelo 3D con rotación y botón de reinicio */}
          <div className="model model-symptoms" style={{ position: "relative" }}>
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
                setIsRotating={setIsRotatingSection2}
                position={initialPosition2}
                modelName="Modelo de Síntomas del Asma"
              />


              {/* Texto adicional en HTML dentro del canvas (nuevo) */}
              <Html position={[-3.5, 1.2, 0]} style={{ pointerEvents: "auto" }}>
                <div className="canvas-html-tooltip">Síntomas visualizados</div>
              </Html>

              {/* Piso con sombra plana */}
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>

            {/* Botones para rotación y reinicio del modelo */}
            <div className="button-container" role="group" aria-label="Controles sección síntomas">
              <button
                onClick={() => setIsRotatingSection2(!isRotatingSection2)}
                className={`primary ${isRotatingSection2 ? "active" : ""}`}
                aria-pressed={isRotatingSection2}
                aria-label="Controlar rotación del modelo de síntomas"
              >
                {isRotatingSection2 ? "Parar" : "Reanudar"}
              </button>
              <button
                onClick={handleResetSection2}
                className="success"
                aria-label="Reiniciar modelo de síntomas"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
        <div className="arrow arrow-symptoms">▼</div>
      </section>

      {/* ---------------------- SECCIÓN 3: TRATAMIENTO ---------------------- */}
      <section className="section section-treatment">
        <div className="section-content row-reverse">
          {/* Texto con información del tratamiento */}
          <div className="text-content">
            <h3 className="title title-treatment">Tratamiento</h3>
            <p className="text text-treatment">
              El tratamiento del asma se centra en controlar la inflamación y prevenir las crisis.
              Es clave evitar desencadenantes y mantener un seguimiento médico regular.
              <br />
              <br />
              <strong>Tratamientos médicos convencionales:</strong>
              <br />
              • Broncodilatadores para aliviar los síntomas
              <br />
              • Corticoides inhalados para reducir la inflamación
              <br />
              • Medicación de control a largo plazo
              <br />
              • Inmunoterapia en casos alérgicos
              <br />
              <br />
              <strong>Tratamientos alternativos y complementarios:</strong>
              <br />
              • Evitar alérgenos y contaminantes
              <br />
              • Ejercicio moderado y técnicas de respiración
              <br />
              • Ambiente limpio y libre de humo
              <br />
              • Alimentación con antioxidantes y omega-3
            </p>

          </div>

          {/* Modelo 3D de tratamiento */}
          <div className="model model-treatment" style={{ position: "relative" }}>
            <Canvas shadows camera={{ position: [0, 1.8, 10], fov: 45 }}>
              <OrbitControls />
              <Floor />
              
              <Lights type="C" />

              <Staging2Asthma /> 

              <Text
                position={[0, 3, 0]}
                fontSize={0.5}
                color="#00f2fe"
                anchorX="center"
                anchorY="middle"
                bevelEnabled
                bevelThickness={0.05}
                bevelSize={0.05}
                bevelSegments={3}
                castShadow
              >
                Tratamiento del Asma
                <meshStandardMaterial
                  color="#00f2fe"
                  emissive="white"
                  emissiveIntensity={0.3}
                  metalness={0.7}
                  roughness={0.2}
                />
              </Text>


              <RotatingModel
                ModelComponent={LungTreatmentsAsthmaModel}
                scale={2}
                groupRef={groupRef3}
                isRotating={isRotatingSection3}
                setIsRotating={setIsRotatingSection3}
                position={initialPosition3}
                modelName="Modelo de Tratamiento del Asma"  
              />

              {/* Sombra bajo el modelo */}
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>

            {/* Botones para controlar rotación y reiniciar */}
            <div className="button-container" role="group" aria-label="Controles sección tratamiento">
              <button
                onClick={() => setIsRotatingSection3(!isRotatingSection3)}
                className={`primary ${isRotatingSection3 ? "active" : ""}`}
                aria-pressed={isRotatingSection3}
                aria-label="Controlar rotación del modelo de tratamiento"
              >
                {isRotatingSection3 ? "Parar" : "Reanudar"}
              </button>
              <button
                onClick={handleResetSection3}
                className="success"
                aria-label="Reiniciar modelo de tratamiento"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Asthma;
