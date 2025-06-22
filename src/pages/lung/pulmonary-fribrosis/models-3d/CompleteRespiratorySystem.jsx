import React, { useRef, useState, useEffect } from "react";
import {
  useGLTF,
  Html,
  Text3D,
  useKeyboardControls,
  PositionalAudio,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const { nodes, materials } = useGLTF("/models-3d/respiratory-system.glb");
  const modelRef = useRef();
  const soundRef = useRef();

  const [isRotating, setIsRotating] = useState(true);
  const [textColor, setTextColor] = useState("#ffffff");
  const [positionY, setPositionY] = useState(0);
  const [subscribeKeys] = useKeyboardControls();

  useEffect(() => {
    const unsubMove = subscribeKeys(
      (state) => state.moveUp,
      (pressed) => {
        if (pressed) setPositionY((prev) => prev + 0.1);
      }
    );
    const unsubPause = subscribeKeys(
      (state) => state.pause,
      (pressed) => {
        if (pressed) setIsRotating((prev) => !prev);
      }
    );
    return () => {
      unsubMove();
      unsubPause();
    };
  }, [subscribeKeys]);

  useFrame(() => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };

  return (
    <group {...props} dispose={null}>
      <group ref={modelRef} position={[0, positionY, 0]} scale={0.01}>
        {/* Tu modelo 3D */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoryCricothyroidLigament.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotis.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotisInner.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidCartliage.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidMembrane.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyTrueVocalFoldLeft.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyTrueVocalFoldRight.geometry}
          material={materials.LungNormalColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyLung.geometry}
          material={materials.LungBaseColor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyTrachea.geometry}
          material={materials.LungTrachealColor}
        />
      </group>

      {/* Texto 3D */}
      <Text3D
        font="/fonts/Roboto_Regular.json"
        size={0.1}
        height={0.05}
        curveSegments={8}
        bevelEnabled={false}
        position={[-0.45, 0.2, 0]}
        onPointerEnter={handlePointerEnter}
      >
        Casos Clínicos
        <meshStandardMaterial color={textColor} />
      </Text3D>

      {/* Botón con sonido */}
      <Html position={[0, -0.3, 0]} center>
        <button
          onClick={() => {
            setIsRotating((prev) => !prev);
            soundRef.current?.play(); // ✅ Reproduce el sonido
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#00b39f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isRotating ? "Pausar rotación" : "Reanudar rotación"}
        </button>
      </Html>

      {/* Audio posicional */}
      <PositionalAudio
        ref={soundRef}
        url="../sounds/click.mp3"
        distance={5}
        loop={false}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/respiratory-system.glb");
export default Model;
