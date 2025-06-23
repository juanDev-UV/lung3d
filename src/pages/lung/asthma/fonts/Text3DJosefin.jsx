import { Text3D } from "@react-three/drei";

const Text3DJosefin = ({
  title = "Texto Josefin",
  size = 0.5,
  height = 0.05,
  position = [0, 3, 0],
  color = "#b66d9c"
}) => {
  return (
    <group position={position}>
      <Text3D
        font="/fonts/Josefin Sans_Italic.json"
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

export default Text3DJosefin;
