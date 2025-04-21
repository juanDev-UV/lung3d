import { useRef } from "react";

const Lights = () => {
  const directionalLightRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} /> {/* Luz general suave */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />
    </>
  );
};

export default Lights;
