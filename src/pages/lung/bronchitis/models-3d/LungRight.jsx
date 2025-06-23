/* eslint-disable react/no-unknown-property */
import { useGLTF, Html, Text, Text3D, OrbitControls, PositionalAudio } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

const LungRith = (props) => {
  const lungRightRef = useRef();
  const { nodes, materials } = useGLTF("/models-3d/lung-right.glb");

  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  const [textColor, setTextColor] = useState("white");
  const soundRef = useRef();
  const { camera } = useThree();
  const keysPressed = useRef({});
  const initialCameraPosition = useRef([0, 0, 3]); // Ajusta según lo necesario

  // Manejo de teclas WASD
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      setIsRotating(false); // Detiene rotación si usuario usa controles
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

  // Animación por frame
  useFrame((state, delta) => {
    const speed = 1.5;
    const move = delta * speed;

    if (keysPressed.current["w"]) camera.position.z -= move;
    if (keysPressed.current["s"]) camera.position.z += move;
    if (keysPressed.current["a"]) camera.position.x -= move;
    if (keysPressed.current["d"]) camera.position.x += move;

    if (isRotatingRef.current && lungRightRef.current) {
      lungRightRef.current.rotation.y += 1 * delta;
    }

    // Animación suave al reiniciar cámara
    if (resettingCamera.current) {
      const [targetX, targetY, targetZ] = initialCameraPosition.current;
      camera.position.lerp({ x: targetX, y: targetY, z: targetZ }, 0.1);
      camera.lookAt(-0.001, -0.1, -0.077);
      const dist = camera.position.distanceTo({ x: targetX, y: targetY, z: targetZ });
      if (dist < 0.01) resettingCamera.current = false;
    }
  });

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 70%, 60%)`);
  };

  const resettingCamera = useRef(false);



  return (
    <group {...props} dispose={null}>
      <group ref={lungRightRef} position={[-0.001, -0.1, -0.077]}>
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
          castShadow
          receiveShadow
          geometry={nodes.RespiratoryLigament.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotis_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyEpiglotisInner_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidCartliage_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyThyroidMembrane_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyVocalFoldLeft_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyVocalFoldRight_1.geometry}
          material={materials.LungRightMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyLungGeoRightMale.geometry}
          material={materials.RespiratoryLungMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.RespiratoyTracheaGeoMale.geometry}
          material={materials.TraqueaMaterial}
        />

        {/* Texto interactivo */}
        <Text
          position={[-0.2, 0.14, 0]}
          fontSize={0.015}
          fontStyle='poppins'
          fontWeight={600}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Pulmón Derecho -
        </Text>
        <Text
          position={[0.16, 0.14, 0]}
          fontSize={0.015}
          fontStyle='poppins'
          fontWeight={600}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          - Bronquios
        </Text>
        <Text
          position={[0.07, 0.23, 0]}
          fontSize={0.015}
          fontStyle='poppins'
          fontWeight={600}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          - Traquea
        </Text>
      </group>
      <group onPointerEnter={handlePointerEnter}>
        <Text3D
          position={[-0.4, 0.15, -0.1]}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.04}
          height={0.02}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.007}
          bevelSize={0.002}
          bevelSegments={2}
        >
          Sus partes
          <meshStandardMaterial color={textColor} />
        </Text3D>
      </group>

      {/* Botón HTML */}
      <Html position={[-0.3, 0, 0]} center>
        <button
          onClick={() => {
            setIsRotating((prev) => !prev);
          soundRef.current?.play(); // 🔊 Reproducir sonido
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: '5px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: "bold",
            fontSize: '12px'
          }}
        >
          {isRotating ? "Pausar rotación" : "Reanudar rotación"}
        </button>
      </Html>
      {/* Botón: Reiniciar cámara */}
      <Html position={[0.3, 0, 0]} center>
        <button
          onClick={() => {
            resettingCamera.current = true;
            setIsRotating(false);
            soundRef.current?.play(); // 🔊 Reproducir sonido
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px'
          }}
        >
          Reiniciar cámara
        </button>
      </Html>
      <Html position={[0, -0.2, 0]} center>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          width: '250px',
          padding: '6px 10px',
          borderRadius: '8px',
          fontSize: '12px',
          textAlign: 'justify'
        }}>
          Usa <b>W, A, S, D</b> para mover la cámara
        </div>
      </Html>
            {/* Sonido posicional */}
            <PositionalAudio
              ref={soundRef}
              url="../sounds/click.mp3"
              distance={5}
              loop={false}
            />
    </group>
  );
};

export default LungRith;

useGLTF.preload("/models-3d/lung-right.glb");
