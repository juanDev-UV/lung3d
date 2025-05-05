import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BronchiolesModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/bronchioles.glb");
  const modelRef = useRef(); // Creamos la referencia al group

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Aplica la rotación
    }
  });

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesMiddle2.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesMiddle3.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesInferior1.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesInferior3.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesInferior4.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesInferior2.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesMiddle1.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesSuperior2.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BronchiolesSuperior1_.geometry}
        material={materials.BronchiolesBasicMaterial}
      />
    </group>
  );
};

export default BronchiolesModel;

useGLTF.preload("/models-3d/bronchioles.glb");
