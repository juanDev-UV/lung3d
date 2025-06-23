/* eslint-disable react/no-unknown-property */
import { useGLTF, Html, OrbitControls, useAnimations, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const HealthPack = (props) => {
  const healthPackRef = useRef();
  const isFloatingRef = useRef(true);
  const [isFloating, setIsFloating] = useState(true);
  const [textColor, setTextColor] = useState('white');
  const { nodes, materials, animations } = useGLTF("/models-3d/health-pack.glb");
  const { actions } = useAnimations(animations, healthPackRef);

  const { camera } = useThree();
  const keysPressed = useRef({});
  const initialCameraPosition = useRef([3, 0, 5]);
  const resettingCamera = useRef(false);

  useEffect(() => {
    isFloatingRef.current = isFloating;
  }, [isFloating]);

  // Teclado: Enter para flotación, WASD para cámara
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        setIsFloating(prev => !prev);
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

    if (isFloatingRef.current && healthPackRef.current) {
      const t = clock.getElapsedTime();
      const floatY = Math.sin(t * 2) * 0.05;
      healthPackRef.current.position.y = floatY;
    }
  });

  useEffect(() => {
    if (actions && actions['Take 001']) {
      actions['Take 001'].play();
    }
  }, [actions]);

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

      <group ref={healthPackRef}>
        <group name="Scene">
          <group name="HealthPack" position={[0.101, -1.928, 0.047]}>
            <group name="MedicalKit">
              <mesh
                name="MedicalKit_1"
                castShadow
                receiveShadow
                geometry={nodes.MedicalKit_1.geometry}
                material={materials.MedicalKitMaterial}
              />
            </group>
            <group name="PillBottle">
              <group name="CylinderPillBottle">
                <mesh
                  name="CylinderPillBottle_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.CylinderPillBottle_1.geometry}
                  material={materials.CylinderPillBottleMaterial}
                />
              </group>
              <group name="PillBottleCap"
                position={[0.057, 1.504, -0.423]}
                rotation={[2.445, 0, -Math.PI]}>
                <mesh
                  name="PillBottleCap_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.PillBottleCap_1.geometry}
                  material={materials.PillBottleCapMaterial}
                  position={[3.347, 0.646, 2.334]}
                  rotation={[-0.679, -0.081, 0.158]}
                />
              </group>
              <group name="PillBottleLabel">
                <mesh
                  name="PillBottleLabel_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.PillBottleLabel_1.geometry}
                  material={materials.PillBottleCapMaterial}
                />
              </group>
            </group>
            <group name="Syringe" rotation={[0.019, -0.048, 0.014]}>
              <group name="SyringeBarrel" position={[0, 1.087, 0]}>
                <mesh
                  name="SyringeBarrel_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.SyringeBarrel_1.geometry}
                  material={materials.SyringeBarrelMaterial}
                  position={[-0.91, 0.23, 0.286]}
                />
                <group name="SyringeNeedle">
                  <mesh
                    name="SyringeNeedle_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.SyringeNeedle_1.geometry}
                    material={materials.MedicalKitMaterial}
                    position={[-0.91, 0.23, 0.286]}
                  />
                </group>
              </group>
              <group name="SyringePlunger">
                <mesh
                  name="SyringePlunger_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.SyringePlunger_1.geometry}
                  material={materials.SyringeNeedleMaterial}
                  position={[-0.91, 0.23, 0.286]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Botón: Pausar flotación */}
      <Html position={[-7, 0, 0]} center>
        <button
          onClick={() => setIsFloating(prev => !prev)}
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
          {isFloating ? "Pausar flotación" : "Reanudar flotación"}
        </button>
      </Html>

      {/* Botón: Reiniciar cámara */}
      <Html position={[2.1, 0, 0]} center>
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
      {/* Texto interactivo */}
      <Text
        position={[1.5, 0.14, 2]}
        fontSize={0.02}
        fontStyle='poppins'
        fontWeight={600}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={handlePointerEnter}
      >
        Nunca es tarde
      </Text>

      {/* Indicador de controles */}
      <Html position={[0, -2, 0]} center>
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          width: '250px',
          padding: '6px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Usa <b>W, A, S, D</b> para mover la cámara<br />
          Usa el <b>ratón</b> para rotar el modelo
        </div>
      </Html>
    </group>
  );
};

export default HealthPack;

useGLTF.preload("/models-3d/health-pack.glb");
