/* eslint-disable react/no-unknown-property */
import { useGLTF, Text, Html } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const LungTransparent = (props) => {
  const lungTransparentRef = useRef();
  const isFloatingRef = useRef(true);
  const [isFloating, setIsFloating] = useState(true);
  const [textColor, setTextColor] = useState('black');
  const { nodes, materials } = useGLTF("/models-3d/lung-transparent.glb");

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
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Movimiento de flotación
  useFrame(({ clock }) => {
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
      <group ref={lungTransparentRef} position={[-223.17, 309.980, -182.778]}>
        {/* Modelo 3D */}
        <mesh 
        geometry={nodes.Bronchi_1.geometry}           
        castShadow
        receiveShadow
        material={materials.BronchiMaterial} />
        <mesh geometry={nodes.HyoidBone_1.geometry} 
        castShadow
        receiveShadow
        material={materials.HyoidBoneMaterial} />
        <mesh geometry={nodes.Linkerlong_1.geometry} 
        castShadow
        receiveShadow
        material={materials.LinkerlongMaterial} />
        <mesh 
        geometry={nodes.ThyroidGland_1.geometry} 
        castShadow
        receiveShadow
        material={materials.ThyroidGlandMaterial} />
        <mesh geometry={nodes.TracheaKraakbeen_1.geometry} 
        castShadow
        receiveShadow
        material={materials.TracheaKraakbeenMaterial} />
        <mesh geometry={nodes.TussenHyoidThyroid_1.geometry}
        castShadow
        receiveShadow 
        material={materials.TussenHyoidThyroidMaterial} />
      </group>
            {/* Texto interactivo */}
      <Text
        position={[-0.2, 0.14, 0]}
        fontSize={0.02}
        fontStyle='poppins'
        fontWeight={600}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        onPointerEnter={handlePointerEnter}
      >
        Explora tus pulmones
      </Text>
        {/* Botón alineado debajo del modelo */}
        <Html position={[-0.35, 0, 0]} center>
          <button
            onClick={() => setIsFloating((prev) => !prev)}
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
            {isFloating ? 'Pausar flotación' : 'Reanudar flotación'}
          </button>
        </Html>
        {/* Botón alineado debajo del modelo */}
        <Html position={[0.5, 0, 0]} style={{              padding: '8px 16px',
              color: 'white',
              border: '5px',
              textAlign: 'center',
              borderRadius: '10px',
              fontSize: '15px'}} center>
        Utilice el 
        <br/>- Raton - 
        <br/>para Interactuar
        </Html>
    </group>
  );
};

export default LungTransparent;

useGLTF.preload("/models-3d/lung-transparent.glb");
