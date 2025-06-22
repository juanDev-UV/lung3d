import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const PulmonModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/medkit.glb"); // Suponiendo que estás usando este como pulmón
  const groupRef = useRef();

  // Rotación aleatoria inicial para variedad
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  }, []);

  return (
    <group ref={groupRef} scale={0.3} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Medkit.geometry}
        material={materials.MedkitMaterial}
      />
    </group>
  );
};

useGLTF.preload("/models-3d/medkit.glb");

export default PulmonModel;
