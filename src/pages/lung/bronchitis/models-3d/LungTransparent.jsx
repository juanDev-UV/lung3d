/* eslint-disable react/no-unknown-property */
import { useGLTF, Text } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const LungTransparent = (props) => {
  const lungTransparentRef = useRef()
  const [isFloating, setIsFloating] = useState(true)
  const [textColor, setTextColor] = useState('black')
  const { nodes, materials } = useGLTF("/models-3d/lung-transparent.glb")

  // Tecla Enter para pausar/activar animación
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setIsFloating(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Movimiento de flotación
  useFrame(({ clock }) => {
    if (!isFloating) return

    const t = clock.getElapsedTime()
    const baseY = 309.990
    const amplitude = 0.02
    lungTransparentRef.current.position.y = baseY + Math.sin(t * 2) * amplitude
  })

  // Cambio de color del texto al pasar el mouse
  const handlePointerEnter = () => {
    const hue = Math.random() * 360
    setTextColor(`hsl(${hue}, 100%, 50%)`)
  }

  return (
    <group {...props} dispose={null}>
      <group ref={lungTransparentRef} position={[-223.17, 309.980, -182.778]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Bronchi_1.geometry}
          material={materials.BronchiMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.HyoidBone_1.geometry}
          material={materials.HyoidBoneMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Linkerlong_1.geometry}
          material={materials.LinkerlongMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ThyroidGland_1.geometry}
          material={materials.ThyroidGlandMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TracheaKraakbeen_1.geometry}
          material={materials.TracheaKraakbeenMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TussenHyoidThyroid_1.geometry}
          material={materials.TussenHyoidThyroidMaterial}
        />

        {/* Texto interactivo sobre el modelo */}
        <Text
          position={[0, 0, 0]} // Posición ajustada para que quede encima del modelo
          fontSize={10}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          onPointerEnter={handlePointerEnter}
        >
          Sistema Respiratorio
        </Text>
      </group>
    </group>
  )
}

export default LungTransparent

useGLTF.preload("/models-3d/lung-transparent.glb")
