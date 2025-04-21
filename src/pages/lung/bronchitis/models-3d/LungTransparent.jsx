/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

const LungTransparent = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung-transparent.glb")
  return (
    <group {...props} dispose={null}>
      <group position={[-223.17, 309.980, -182.778]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bronchi_1.geometry}
          material={materials.BronchiMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HyoidBone_1.geometry}
          material={materials.HyoidBoneMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Linkerlong_1.geometry}
          material={materials.LinkerlongMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ThyroidGland_1.geometry}
          material={materials.ThyroidGlandMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TracheaKraakbeen_1.geometry}
          material={materials.TracheaKraakbeenMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TussenHyoidThyroid_1.geometry}
          material={materials.TussenHyoidThyroidMaterial}
        />
      </group>
    </group>
  )
}

export default LungTransparent;

useGLTF.preload("/models-3d/lung-transparent.glb")