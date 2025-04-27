import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // <-- ¡IMPORTANTE!

const RespiratoryModel = (props) => {
  const { nodes, materials } = useGLTF(
    "/models-3d/complete-respiratory-system.glb"
  );
  const modelRef = useRef(); // <-- Creamos una referencia

  // Función que actualiza la rotación cada frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Controlas qué tan rápido gira
    }
  });

  return (
    <group ref={modelRef} {...props} dispose={null}>
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
  );
};

export default RespiratoryModel;

useGLTF.preload("/models-3d/complete-respiratory-system.glb");
