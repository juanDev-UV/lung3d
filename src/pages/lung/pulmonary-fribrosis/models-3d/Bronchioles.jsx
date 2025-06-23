import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html, Text3D, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BronchiolesModel = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/bronchioles.glb");
  const modelRef = useRef();

  const [isRotating, setIsRotating] = useState(true);
  const [textColor, setTextColor] = useState("#ffffff");
  const [positionY, setPositionY] = useState(0);

  const [subscribeKeys] = useKeyboardControls();

  // Movimiento con tecla W y pausa con tecla P
  useEffect(() => {
    const unsubMove = subscribeKeys(
      (state) => state.moveUp,
      (pressed) => {
        if (pressed) {
          setPositionY((prev) => prev + 0.1);
        }
      }
    );

    const unsubPause = subscribeKeys(
      (state) => state.pause,
      (pressed) => {
        if (pressed) {
          setIsRotating((prev) => !prev);
        }
      }
    );

    return () => {
      unsubMove();
      unsubPause();
    };
  }, [subscribeKeys]);

  // Animación de rotación
  useFrame(() => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  // Cambiar color aleatorio al pasar el mouse por el texto
  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };

  return (
    <group {...props} dispose={null}>
      <group ref={modelRef} position={[0, positionY, 0]}>
        {/* Meshes del modelo */}
        {Object.values(nodes).map((mesh, i) =>
          mesh.geometry ? (
            <mesh
              key={i}
              castShadow
              receiveShadow
              geometry={mesh.geometry}
              material={materials.BronchiolesBasicMaterial}
            />
          ) : null
        )}
      </group>

      {/* Texto 3D interactivo */}
      <Text3D
        font="/fonts/Alice_Regular.json"
        size={0.1}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.02}
        bevelSegments={5}
        position={[-0.3, 0.3, 0]}
        onPointerEnter={handlePointerEnter}
      >
        Bronquiolos
        <meshStandardMaterial color={textColor} />
      </Text3D>

      {/* Botón HTML 3D */}
      <Html position={[0, -0.4, 0]} center>
        <button
          onClick={() => setIsRotating((prev) => !prev)}
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
    </group>
  );
};

export default BronchiolesModel;

useGLTF.preload("/models-3d/bronchioles.glb");
