import { useHelper } from "@react-three/drei";
import { useRef } from "react";

/* eslint-disable react/no-unknown-property */
const Lights = ({ type }) => {
  const lightRef = useRef();
  useHelper(lightRef);

  return (
    <>
      {type === "A" && (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight
            ref={lightRef}
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
            ref={lightRef}
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

      {type === "C" && (
        <>
          {/* Luz ambiental tenue y fría */}
          <ambientLight intensity={2.5} color="#aaccff" />

          {/* Luz direccional como luna llena */}
          <directionalLight
            ref={lightRef}
            position={[4, 10, -4]} // posición elevada y lateral
            intensity={1.2}
            color="#cce6ff"
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
      )}

    </>
  );
};

export default Lights;

