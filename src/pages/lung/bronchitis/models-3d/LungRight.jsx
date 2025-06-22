/* eslint-disable react/no-unknown-property */
import { useGLTF, Html, Text, Text3D } from '@react-three/drei';import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

const LungRith = (props) => {
  const lungRightRef = useRef();
  const { nodes, materials } = useGLTF("/models-3d/lung-right.glb");

  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating); // sincronizar con useFrame

  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    isRotatingRef.current = isRotating; // actualizar ref cuando cambia el estado
  }, [isRotating]);

  useFrame((state, delta) => {
    if (isRotatingRef.current && lungRightRef.current) {
      lungRightRef.current.rotation.y += 1 * delta;
    }
  });

  const handlePointerEnter = () => {
    const hue = Math.random() * 360;
    setTextColor(`hsl(${hue}, 10%, 50%)`);
  };

  return (
    <group {...props} dispose={null}>
      <group ref={lungRightRef} position={[-0.001, -0.1, -0.077]}>
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
      <Html position={[0.3, 0, 0]} center>
        <button
          onClick={() => setIsRotating((prev) => !prev)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#00b39f',
            color: 'white',
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
    </group>
  );
};

export default LungRith;

useGLTF.preload("/models-3d/lung-right.glb");
