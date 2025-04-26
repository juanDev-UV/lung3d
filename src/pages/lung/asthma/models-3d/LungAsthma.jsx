import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const LungInflammationModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung_inflammation_model.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.AsmaModel.geometry}
        material={materials.AsmaMaterial}
      />
    </group>
  )
}

export default LungInflammationModel;

useGLTF.preload("/models-3d/lung_inflammation_model.glb");
