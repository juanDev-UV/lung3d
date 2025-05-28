import "./Pneumonia.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Sky } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import PneumoniaModel from "./models-3d/LungLungPneumonia";
import PnumoniaModel1 from "./models-3d/LungPneumonia";
import Lights from "./lights/Lights";
import Floor from "./models-3d/Floor";

// Modelo con rotación automática
const RotatingModel = ({ scale, position, ModelComponent }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <ModelComponent scale={scale} />
    </group>
  );
};

// Modelo interactivo con eventos y HTML 3D
const InteractiveModel = () => {
  const groupRef = useRef();
  const [color, setColor] = useState("#ffffff");
  const [isRotating, setIsRotating] = useState(false);
  const [initialPosition] = useState([0, 0, 0]); // Posición inicial
  const [rotation, setRotation] = useState([0, 0, 0]); // Rotación inicial

  // Raycaster de react-three
  const { camera, raycaster } = useThree();

  // Rotación automática
  useFrame(() => {
    if (!isRotating && groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Rotación constante
    }
  });

  // Teclado: presiona "r" para girar el modelo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r" && groupRef.current) {
        groupRef.current.rotation.y += 0.5;
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 500); // Duración de la animación
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Mouse: cambiar color del modelo al hacer clic
  const handleClick = (e) => {
    e.stopPropagation(); // Evita que el clic se propague a otros elementos
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  // Función para reiniciar la posición y la rotación
  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.position.set(...initialPosition); // Reiniciar la posición
      setRotation([0, 0, 0]); // Restablecer la rotación
      groupRef.current.rotation.set(...[0, 0, 0]); // Asegurarse que la rotación sea 0 en los tres ejes
    }
  };

  return (
    <group ref={groupRef} onClick={handleClick} position={initialPosition}>
      <PnumoniaModel1 scale={15} color={color} />
      
      {/* HTML en 3D */}
      <Html position={[0, -2, 0]}>
        <button
          onClick={handleReset} // Llama a la función de reinicio
          style={{
            position: "absolute", // Establece la posición estática en relación con la pantalla
            top: "10px", // Distancia desde la parte superior de la ventana
            left: "90%", // Centra el botón horizontalmente
            transform: "translateX(-50%)", // Ajuste para centrar el botón exactamente
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#28a745", // Verde para indicar "Reiniciar"
            color: "white",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
            zIndex: 10, // Asegura que el botón esté por encima de los modelos 3D
            width: "150px",
            height: "50px",
          }}
        >
          Reiniciar
        </button>
      </Html>

      {/* Indicador de rotación */}
      {isRotating && (
        <Html position={[0, 0, 0]} style={{ zIndex: 20 }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.7)",
              padding: "10px 20px",
              borderRadius: "8px",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Rotando...
          </div>
        </Html>
      )}
    </group>
  );
};

const Pneumonia = () => {
  return (
    <div className="pneumonia-container">
      {/* Sección 1: Introducción */}
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
            <Canvas camera={{ position: [0, 0, 3.5] }} shadows={true}>
              <OrbitControls />
              <Sky sunPosition={[100, 20, 100]} />
              <Lights type="A" />
              <RotatingModel scale={15} ModelComponent={PneumoniaModel} />
              <Floor />
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

      {/* Sección 2: Síntomas */}
      <section className="section section-symptoms">
        <div className="section-content row-normal">
          <div className="text-content">
            <h3 className="title title-symptoms">Síntomas</h3>
            <p className="text text-symptoms">
              La neumonía presenta síntomas como fiebre alta, escalofríos, tos con
              flema, dificultad para respirar y dolor en el pecho al respirar o toser.
              Otros signos pueden incluir sudoración excesiva, fatiga, pérdida de
              apetito y confusión (especialmente en adultos mayores).
              <br /><br />
              <strong>Síntomas comunes:</strong><br />
              • Fiebre y escalofríos<br />
              • Tos con flema<br />
              • Dificultad para respirar<br />
              • Dolor en el pecho<br />
              • Fatiga y debilidad<br />
              • Confusión mental
            </p>
          </div>
          <div className="model model-pneumonia-symptoms">
            <Canvas camera={{ position: [1, 0, 3] }} shadows={true}>
              <OrbitControls />
              <Sky sunPosition={[100, 20, 100]} />
              <Lights type="B" />
              <InteractiveModel />
              <mesh
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -3, 0]}
              >
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.3} />
              </mesh>
            </Canvas>
          </div>
        </div>
        <div className="arrow arrow-symptoms">▼</div>
      </section>
    </div>
  );
};

export default Pneumonia;
