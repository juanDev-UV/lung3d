/* eslint-disable react/no-unknown-property */
import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { RepeatWrapping } from "three";

const Grass = () => {
  const PATH = useMemo(() => "/textures/grass/", []);
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
      <mesh rotation-x={-Math.PI / 2} position-y={-2} position-z={-3} receiveShadow={true}>
        <circleGeometry args={[3.3, 4096]} />
        <meshStandardMaterial {...grassTexture} />
      </mesh>
  );
};

export default Grass;
