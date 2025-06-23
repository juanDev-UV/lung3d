import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const LungPreventionAsthmaModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/prevention-asthma.glb")
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Asma4Model.geometry}
        material={materials.Asma4Material}
      />
    </group>
  )
}

export default LungPreventionAsthmaModel;

useGLTF.preload("/models-3d/prevention-asthma.glb")