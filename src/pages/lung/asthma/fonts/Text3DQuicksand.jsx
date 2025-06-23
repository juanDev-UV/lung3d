import { Text3D } from "@react-three/drei";

const Text3DQuicksand = ({
  title = "Texto Quicksand",
  size = 0.5,
  height = 0.05,
  position = [0, 3, 0],
  color = "#4a90e2"
}) => {
  return (
    <group position={position}>
      <Text3D
        font="/fonts/Quicksand_Bold Italic.json"
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

export default Text3DQuicksand;
