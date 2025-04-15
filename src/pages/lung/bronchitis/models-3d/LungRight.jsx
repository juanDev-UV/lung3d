/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

const LungRith = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/lung-right.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoryLigament.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyEpiglotis_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyEpiglotisInner_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyThyroidCartliage_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyThyroidMembrane_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyVocalFoldLeft_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyVocalFoldRight_1.geometry}
        material={materials.LungRightMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyLungGeoRightMale.geometry}
        material={materials.RespiratoryLungMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RespiratoyTracheaGeoMale.geometry}
        material={materials.TraqueaMaterial}
        position={[-0.001, -0.1, -0.077]}
      />
    </group>
  )
}

export default LungRith;

useGLTF.preload("/models-3d/lung-right.glb")