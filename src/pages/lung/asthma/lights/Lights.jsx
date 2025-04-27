import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

/* eslint-disable react/no-unknown-property */
const Lights = () => {
  const directionalLightRef = useRef()
  useHelper(directionalLightRef);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        position={[6, 8.5, 10]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />
    </>
  );
}

export default Lights;

