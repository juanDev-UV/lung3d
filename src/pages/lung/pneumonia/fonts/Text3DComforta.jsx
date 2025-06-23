import { Text3D } from "@react-three/drei";

const Text3DComforta = ({
  title = "Texto 3D",
  size = 0.5,
  height = 0.05,
  position = [0, 3, 0],
  color = "#7b6bab" // Violeta pastel medio para contraste y suavidad
}) => {
  return (
    <group position={position}>
      <Text3D
        font="/fonts/Comfortaa_Bold.json"
        size={size}
        height={height}
        curveSegments={16}
        bevelEnabled
        bevelSize={0.025}
        bevelThickness={0.01}
        bevelSegments={8}
      >
        <meshStandardMaterial color={color} />
        {title}
      </Text3D>
    </group>
  );
};

export default Text3DComforta;
