import { useHelper } from "@react-three/drei";
import { useRef } from "react";

/* eslint-disable react/no-unknown-property */
const LightsLungRight = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef);

    return (
        <>
      <ambientLight color={"#F5F5DC"} intensity={2} castShadow={true}/>
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[5, 5, -5]}
        intensity={0}
        castShadow={true}
      />
      <directionalLight
        ref={directionalLightRef}
        color={"white"}
        position={[0, 5, 5]}
        intensity={7}
        castShadow={true}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={20}
      />
      </>
    )
}

export default LightsLungRight;