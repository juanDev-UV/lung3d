import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const LungPneumoniaModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung-pneunomia.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lung.geometry}
        material={materials.LungMaterial_0}
      />
    </group>
  )
}

export default LungPneumoniaModel;

useGLTF.preload("/models-3d/lung-pneunomia.glb");
