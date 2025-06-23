import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const LungLungLungLungPneumoniaModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung-lung-lung-lung-pneumonia.glb")
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Infection.geometry}
        material={materials.InfectionMaterial_0}
      />
    </group>
  )
}

export default LungLungLungLungPneumoniaModel

useGLTF.preload("/models-3d/lung-lung-lung-lung-pneumonia.glb");