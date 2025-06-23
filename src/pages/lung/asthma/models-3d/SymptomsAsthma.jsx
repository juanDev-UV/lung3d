import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const LungSymptomsAsthmaModel = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/symptoms-asthma.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.asma2Model.geometry}
        material={materials.asma2Material}
      />
    </group>
  )
}

export default LungSymptomsAsthmaModel;

useGLTF.preload("/models-3d/symptoms-asthma.glb");
