import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MedkitModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/medkit.glb");
  const groupRef = useRef();

  // Animación: movimiento vertical suave
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5; // Amplitud de 0.2
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Medkit.geometry}
        material={materials.MedkitMaterial}
      />
    </group>
  );
};

export default MedkitModel;

useGLTF.preload("/models-3d/medkit.glb"); // corregido el path
