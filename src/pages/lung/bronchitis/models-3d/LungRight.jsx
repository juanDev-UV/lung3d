/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const LungRith = (props) => {

  const lungRightRef = useRef();

  useFrame((state, delta) => {
    lungRightRef.current.rotation.y +=1 * delta;
  })
  const { nodes, materials } = useGLTF("/models-3d/lung-right.glb");
  return (
    <group {...props} dispose={null}>
      <group ref={lungRightRef} position={[-0.001, -0.1, -0.077]} >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoryLigament.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotis_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotisInner_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidCartliage_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidMembrane_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyVocalFoldLeft_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyVocalFoldRight_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyLungGeoRightMale.geometry}
          material={materials.RespiratoryLungMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyTracheaGeoMale.geometry}
          material={materials.TraqueaMaterial}
        />

      </group>
    </group>
  )
}

export default LungRith;

useGLTF.preload("/models-3d/lung-right.glb")