import { Text3D } from "@react-three/drei";

const Text3DMuli = ({
  title = "Texto 3D",
  size = 0.5,
  height = 0.05, // menor profundidad para más limpieza
  position = [0, 3, 0],
  color = "#7b6bab" // azul petróleo oscuro, más contraste
}) => {
  return (
    <group position={position}>
      <Text3D
        font="/fonts/Muli_Semi-BoldItalic.json"
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

export default Text3DMuli;

