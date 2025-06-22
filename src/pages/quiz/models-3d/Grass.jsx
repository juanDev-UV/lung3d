import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import { RepeatWrapping } from "three";

const Grass = () => {
  const PATH = useMemo(() => "textures/grass/", []);
  const grassTexture = useTexture({
    map: PATH + "grassColor.jpg",
    normalMap: PATH + "grassNormal.jpg",
    roughnessMap: PATH + "grassRoughness.jpg",
    aoMap: PATH + "grassAO.jpg",
    //displacementMap: PATH + "grassDisplacement.jpg",
  });

  Object.values(grassTexture).forEach((texture) => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(32, 32);
  });

  return (
    <RigidBody name="grassRB" type="fixed" colliders={"cuboid"} friction={0}>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[32, 4096]} />
        <meshStandardMaterial {...grassTexture} />
      </mesh>
    </RigidBody>
  );
};

export default Grass;
