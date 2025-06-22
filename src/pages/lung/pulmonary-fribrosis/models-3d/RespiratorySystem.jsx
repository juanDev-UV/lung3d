import React, { useRef, useState, useEffect } from "react";
import {
  useGLTF,
  Text,
  Html,
  PositionalAudio,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const RespiratoryModel = (props) => {
  const { nodes, materials } = useGLTF(
    "/models-3d/complete-respiratory-system.glb"
  );
  const modelRef = useRef();
  const soundRef = useRef();
  const [isRotating, setIsRotating] = useState(true);
  const [textColor, setTextColor] = useState("black");
  const [sub] = useKeyboardControls();
  const { raycaster, mouse } = useThree();

  // Tecla P para pausar/reanudar
  useEffect(() => {
    return sub(
      (state) => state.pause,
      (pressed) => {
        if (pressed) {
          setIsRotating((prev) => !prev);
          soundRef.current?.play(); // ▶️ sonido al pausar con tecla también
        }
      }
    );
  }, [sub]);

  // Animación de rotación
  useFrame(() => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  // Efecto de color al pasar el cursor por el texto
  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };

  return (
    <group {...props} dispose={null}>
      {/* Modelo 3D */}
      <group ref={modelRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.UpRespiratorySystem.geometry}
          material={materials.DownBasicSystem}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.DownRespiratorySystem.geometry}
          material={materials.UpBasicMaterial}
        />
      </group>

      {/* Texto 3D */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.1}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={handlePointerEnter}
      >
        Sistema Respiratorio
      </Text>

      {/* Botón HTML */}
      <Html position={[0, -0.25, 0]} center>
        <button
          onClick={() => {
            setIsRotating((prev) => !prev);
            soundRef.current?.play(); // ▶️ sonido al hacer clic
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#00b39f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isRotating ? "Pausar rotación" : "Reanudar rotación"}
        </button>
      </Html>

      {/* Audio */}
      <PositionalAudio
        ref={soundRef}
        url="../sounds/click.mp3"
        distance={5}
        loop={false}
      />
    </group>
  );
};

export default RespiratoryModel;

useGLTF.preload("/models-3d/complete-respiratory-system.glb");
