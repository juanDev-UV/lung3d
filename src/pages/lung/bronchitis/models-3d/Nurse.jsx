/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";

const Nurse = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/nurse.glb");

    return (
    <group {...props} dispose={null}>
      <mesh 
        castShadow
        receiveShadow
        geometry={nodes.Nurse.geometry}
        material={materials.NurseMaterial}
        position={[-0.001, -0.450, -0.077]}
      />
    </group>
  );
};

export default Nurse;

useGLTF.preload("/models-3d/nurse.glb")