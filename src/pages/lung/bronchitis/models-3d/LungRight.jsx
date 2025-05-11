/* eslint-disable react/no-unknown-property */
import { useGLTF, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

const LungRith = (props) => {
  const lungRightRef = useRef();
  const [textColor, setTextColor] = useState("black");
  const { nodes, materials } = useGLTF("/models-3d/lung-right.glb");

  useFrame((state, delta) => {
    lungRightRef.current.rotation.y += 1 * delta;
  });

  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };

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

        {/* Texto interactivo encima del modelo */}
        <Text
          position={[-0.2, 0.17, 0]} // Ajustado para estar justo encima del modelo
          fontSize={0.02}
          fontStyle='poppins'
          color={textColor}
          anchorX="center"
          anchorY="middle"
          onPointerEnter={handlePointerEnter}
        >
          Pulmón Derecho
        </Text>
      </group>
    </group>
  )
}

export default LungRith;

useGLTF.preload("/models-3d/lung-right.glb")
