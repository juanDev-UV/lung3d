// models-3d/RespiratorySystem.js
import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

const RespiratoryModel = (props) => {
  const { nodes, materials } = useGLTF(
    "/models-3d/complete-respiratory-system.glb"
  );
  const modelRef = useRef();
  const [isRotating, setIsRotating] = useState(true);
  const [textColor, setTextColor] = useState("black");
  const [sub] = useKeyboardControls();
  const { raycaster, mouse } = useThree();

  // Control de teclado para pausar/reanudar rotación
  useEffect(() => {
    return sub(
      (state) => state.pause,
      (pressed) => {
        if (pressed) {
          setIsRotating((prev) => !prev);
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

  // Manejador de eventos de mouse
  const handlePointerEnter = () => {
    // Cambiar color del texto a un color aleatorio en HSL
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

      {/* Texto 3D con interacción de mouse */}
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
    </group>
  );
};

export default RespiratoryModel;

useGLTF.preload("/models-3d/complete-respiratory-system.glb");
