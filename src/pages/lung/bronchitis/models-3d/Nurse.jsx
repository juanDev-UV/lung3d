/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Nurse = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/nurse.glb");
  const nurseRef = useRef();

  useFrame(({ clock }) => {
    const baseZ = -0.2
    if (nurseRef.current) {
      nurseRef.current.position.z = baseZ - Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={nurseRef}
        castShadow
        receiveShadow
        // eslint-disable-next-line react/no-unknown-property
        geometry={nodes.Nurse.geometry}
        material={materials.NurseMaterial}
        position={[-0.001, -0.35, 0]} // posición base
      />
    </group>
  );
};

export default Nurse;
useGLTF.preload("/models-3d/nurse.glb");