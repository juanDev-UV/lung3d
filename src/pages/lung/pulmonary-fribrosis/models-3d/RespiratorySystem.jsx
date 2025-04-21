import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const RespiratoryModel = (props) =>  {
  const { nodes, materials } = useGLTF("/models-3d/complete-respiratory-system.glb");
  return (
    <group {...props} dispose={null}>
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
}

export default RespiratoryModel;

useGLTF.preload("/models-3d/complete-respiratory-system.glb");
