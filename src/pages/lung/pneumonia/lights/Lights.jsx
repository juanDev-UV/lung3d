import { useHelper } from "@react-three/drei";
import { useRef } from "react";

/* eslint-disable react/no-unknown-property */
const Lights = ({ type }) => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef);

  return (
    <>
      {type === "A" && (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight
            ref={directionalLightRef}
            position={[0, 5, 5]}
            intensity={1.3}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
          />
        </>
      )}

      {type === "B" && (
        <>
          <ambientLight intensity={0.9} />
          <spotLight
            ref={directionalLightRef}
            position={[5, 10, 5]}
            intensity={2}
            angle={0.6}
            penumbra={0.3}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
        </>
      )}
    </>
  );
};

export default Lights;
