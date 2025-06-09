import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const LungTreatmentsAsthmaModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/treatments-asthma.glb")
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Asma3Model.geometry}
        material={materials.Asma3Material}
      />
    </group>
  )
}

export default LungTreatmentsAsthmaModel;

useGLTF.preload("/models-3d/treatments-asthma.glb");
