import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html, Text, useKeyboardControls, PositionalAudio } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const MedkitModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/medkit.glb");
  const groupRef = useRef();
  const soundRef = useRef();

  const [isMoving, setIsMoving] = useState(true);
  const [textColor, setTextColor] = useState("white");
  const [subscribeKeys] = useKeyboardControls();

  // Movimiento vertical animado
  useFrame(({ clock }) => {
    if (groupRef.current && isMoving) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });

  // Tecla P para pausar/reanudar
  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.pause,
      (pressed) => {
        if (pressed) setIsMoving((prev) => !prev);
      }
    );
    return () => unsubscribe();
  }, [subscribeKeys]);

  // Cambio de color al pasar el mouse
  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Modelo 3D */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Medkit.geometry}
        material={materials.MedkitMaterial}
      />

      {/* Texto 2D */}
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.12}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={handlePointerEnter}
      >
        Opciones de Tratamiento
      </Text>

      {/* Botón HTML 3D */}
      <Html position={[0, -0.3, 0]} center>
        <button
          onClick={() => {
            setIsMoving((prev) => !prev);
            soundRef.current?.play(); // ✅ Reproduce el sonido al hacer clic
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
          {isMoving ? "Pausar Rotación" : "Reanudar rotación"}
        </button>
      </Html>

      <PositionalAudio
        ref={soundRef}
        url="../sounds/click.mp3"
        distance={5}
        loop={false}
      />
    </group>
  );
};

export default MedkitModel;

useGLTF.preload("/models-3d/medkit.glb");
