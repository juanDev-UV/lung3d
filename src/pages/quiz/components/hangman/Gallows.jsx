import { useRef } from "react";

const Gallows = () => {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.5, 2, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[1, 1.8, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
};

export default Gallows;
