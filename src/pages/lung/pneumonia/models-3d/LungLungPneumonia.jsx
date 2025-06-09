import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const LungLungPneumoniaModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung-lung-pneumonia.glb")
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

export default LungLungPneumoniaModel

useGLTF.preload("/models-3d/lung-lung-pneumonia.glb");