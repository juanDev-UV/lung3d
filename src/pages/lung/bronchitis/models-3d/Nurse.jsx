/* eslint-disable react/no-unknown-property */
import { useGLTF, Html, OrbitControls, Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const Nurse = (props) => {
  const { nodes, materials } = useGLTF("/models-3d/nurse.glb");
  const nurseRef = useRef();
  const isFloatingRef = useRef(true);
  const [isFloating, setIsFloating] = useState(true);
  const { camera } = useThree();
  const keysPressed = useRef({});
  const initialCameraPosition = useRef([0, 0, 3]);
  const resettingCamera = useRef(false);
  const [textColor, setTextColor] = useState('White');

  // Sincronizar estado con referencia
  useEffect(() => {
    isFloatingRef.current = isFloating;
  }, [isFloating]);

  // Teclado: Enter (flotación) + WASD (movimiento)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setIsFloating((prev) => !prev);
      }
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Animación: flotación + movimiento de cámara + reinicio
  useFrame(({ clock }, delta) => {
    const baseZ = -0.2;
    if (isFloatingRef.current && nurseRef.current) {
      nurseRef.current.position.z = baseZ - Math.sin(clock.getElapsedTime()) * 0.1;
    }

    const speed = 1.5;
    const move = delta * speed;

    if (keysPressed.current["w"]) camera.position.z -= move;
    if (keysPressed.current["s"]) camera.position.z += move;
    if (keysPressed.current["a"]) camera.position.x -= move;
    if (keysPressed.current["d"]) camera.position.x += move;

    if (resettingCamera.current) {
      const [x, y, z] = initialCameraPosition.current;
      camera.position.lerp({ x, y, z }, 0.1);
      camera.lookAt(0, 0, 0);
      if (camera.position.distanceTo({ x, y, z }) < 0.01) {
        resettingCamera.current = false;
      }
    }
  });

  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 100%, 50%)`);
  };


  return (
    <group {...props} dispose={null}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          makeDefault
          keys={{
            LEFT: 'ArrowLeft',
            RIGHT: 'ArrowRight',
            UP: 'ArrowUp',
            BOTTOM: 'ArrowDown'
          }}
        />
      <mesh
        ref={nurseRef}
        castShadow
        receiveShadow
        geometry={nodes.Nurse.geometry}
        material={materials.NurseMaterial}
        position={[-0.001, -0.35, 0]}
      />

      {/* Botón: Pausar/Reanudar flotación */}
      <Html position={[-0.6, 0, 0]} center>
        <button
          onClick={() => setIsFloating((prev) => !prev)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: "bold",
            fontSize: '12px'
          }}
        >
          {isFloating ? "Pausar flotacion" : "Reanudar flotación"}
        </button>
      </Html>
      {/* Texto interactivo */}
      <Text
        position={[-0.4, 0.2, 0]}
        fontSize={0.04}
        fontStyle='poppins'
        fontWeight={600}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={handlePointerEnter}
      >
        Cuida tu salud
      </Text>

      {/* Botón: Reiniciar cámara */}
      <Html position={[0.6, 0, 0]} center>
        <button
          onClick={() => resettingCamera.current = true}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: "bold",
            fontSize: '12px'
          }}
        >
          Reiniciar cámara
        </button>
      </Html>

      {/* Indicador de interacción */}
      <Html position={[0, -0.4, 0]} center>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          width: '250px',
          padding: '6px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Usa <b>W, A, S, D</b> para mover la cámara
        </div>
      </Html>
    </group>
  );
};

export default Nurse;

useGLTF.preload("/models-3d/nurse.glb");
