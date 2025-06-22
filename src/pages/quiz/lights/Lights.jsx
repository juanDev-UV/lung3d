import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Lights = () => {
  const spotLightRef = useRef();

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    spotLightRef.current.target.position.x = Math.cos(elapsedTime);
    spotLightRef.current.target.position.z = Math.sin(elapsedTime);
    spotLightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <spotLight
        ref={spotLightRef}
        position={[0, 3, 0]}
        distance={6}
        intensity={15}
        angle={Math.PI / 6}
        penumbra={0.1}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-normalBias={0.05}
      />
    </>
  );
};

export default Lights;
