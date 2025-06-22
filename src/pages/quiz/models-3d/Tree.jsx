import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Tree(props) {
  const { nodes, materials } = useGLTF("models-3d/tree.glb");
  const treeRef = useRef();

  return (
    <RigidBody name="treeRB" type="fixed" colliders="cuboid">
      <group ref={treeRef} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_1.geometry}
          material={materials.Leaf}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_2.geometry}
          material={materials.Root}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("models-3d/tree.glb");
export default Tree;