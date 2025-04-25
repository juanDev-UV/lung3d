import { useHelper } from "@react-three/drei";
import { useRef } from "react";

/* eslint-disable react/no-unknown-property */
const Lights = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef);

    return (
      <>
        <ambientLight intensity={0.5} /> {/* Luz general suave */}
        <directionalLight
          ref={directionalLightRef}
          position={[0, 5, 5]}
          intensity={1.2}
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