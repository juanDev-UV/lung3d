import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

/* eslint-disable react/no-unknown-property */
const Lights = ({ type = "A", showHelper = false }) => {
  const directionalLightRef = useRef();

  if (showHelper) {
    useHelper(directionalLightRef, DirectionalLightHelper, 1, "red");
  }

  const lightConfigs = {
    A: {
      position: [6, 8.5, 7],
      intensity: 2.5,
      shadowMapSize: { width: 4096, height: 4096 },
      camera: {
        left: -10,
        right: 10,
        top: 10,
        bottom: -10,
        near: 0.1,
        far: 50,
      },
    },
    B: {
      position: [4, 6, 8],
      intensity: 1.8,
      shadowMapSize: { width: 2048, height: 2048 },
      camera: {
        left: -7,
        right: 7,
        top: 7,
        bottom: -7,
        near: 0.5,
        far: 40,
      },
    },
    C: {
      position: [2, 4, 6], // Fuente lateral baja
      intensity: 0.8, // Luz tenue para noche
      shadowMapSize: { width: 1024, height: 1024 },
      camera: {
        left: -5,
        right: 5,
        top: 5,
        bottom: -5,
        near: 0.5,
        far: 30,
      },
    },
  };

  const config = lightConfigs[type] || lightConfigs["A"];

  return (
    <>
      <ambientLight intensity={0.2} /> {/* Luz ambiental tenue */}
      <hemisphereLight
        skyColor={"#445566"}
        groundColor={"#222222"}
        intensity={0.3}
      />
      <directionalLight
        ref={directionalLightRef}
        position={config.position}
        intensity={config.intensity}
        castShadow
        shadow-mapSize-width={config.shadowMapSize.width}
        shadow-mapSize-height={config.shadowMapSize.height}
        shadow-camera-left={config.camera.left}
        shadow-camera-right={config.camera.right}
        shadow-camera-top={config.camera.top}
        shadow-camera-bottom={config.camera.bottom}
        shadow-camera-near={config.camera.near}
        shadow-camera-far={config.camera.far}
      />
    </>
  );
};

export default Lights;
