/* eslint-disable react/no-unknown-property */
import { useGLTF, Html, OrbitControls, Text3D } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const LungTransparent = (props) => {
  const lungTransparentRef = useRef();
  const isFloatingRef = useRef(true);
  const [isFloating, setIsFloating] = useState(true);
  const [textColor, setTextColor] = useState('white');
  const { nodes, materials } = useGLTF("/models-3d/lung-transparent.glb");

  const { camera } = useThree();
  const keysPressed = useRef({});
  const initialCameraPosition = useRef([-0.5, 0, 2]);
  const resettingCamera = useRef(false);

  // Sincronizar ref con estado
  useEffect(() => {
    isFloatingRef.current = isFloating;
  }, [isFloating]);

  // Tecla Enter para pausar/activar animación
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setIsFloating((prev) => !prev);
      }

      // Movimiento cámara
      keysPressed.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Movimiento + flotación
  useFrame(({ clock }, delta) => {
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

    if (!isFloatingRef.current || !lungTransparentRef.current) return;
    const t = clock.getElapsedTime();
    const baseY = 309.990;
    const amplitude = 0.02;
    lungTransparentRef.current.position.y = baseY + Math.sin(t * 2) * amplitude;
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

      <group ref={lungTransparentRef} position={[-223.17, 309.980, -182.778]}>
        <mesh geometry={nodes.Bronchi_1.geometry} castShadow receiveShadow material={materials.BronchiMaterial} />
        <mesh geometry={nodes.HyoidBone_1.geometry} castShadow receiveShadow material={materials.HyoidBoneMaterial} />
        <mesh geometry={nodes.Linkerlong_1.geometry} castShadow receiveShadow material={materials.LinkerlongMaterial} />
        <mesh geometry={nodes.ThyroidGland_1.geometry} castShadow receiveShadow material={materials.ThyroidGlandMaterial} />
        <mesh geometry={nodes.TracheaKraakbeen_1.geometry} castShadow receiveShadow material={materials.TracheaKraakbeenMaterial} />
        <mesh geometry={nodes.TussenHyoidThyroid_1.geometry} castShadow receiveShadow material={materials.TussenHyoidThyroidMaterial} />
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
          Explora
          <meshStandardMaterial color={textColor} />
        </Text3D>
      </group>

      {/* Botón: Pausar flotación */}
      <Html position={[-0.35, 0, 0]} center>
        <button
          onClick={() => setIsFloating((prev) => !prev)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: "bold",
            fontSize: '12px'
          }}
        >
          {isFloating ? 'Pausar flotación' : 'Reanudar flotación'}
        </button>
      </Html>

      {/* Botón: Reiniciar cámara */}
      <Html position={[0.35, 0, 0]} center>
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
      <Html position={[0, -0.3, 0]} style={{
        padding: '8px 16px',
        color: 'white',
        width: '295px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        textAlign: 'justify',
        borderRadius: '10px',
        fontSize: '13px'
      }} center>
        Utiliza <b>W, A, S, D</b> para mover la cámara
      </Html>
    </group>
  );
};

export default LungTransparent;

useGLTF.preload("/models-3d/lung-transparent.glb");
