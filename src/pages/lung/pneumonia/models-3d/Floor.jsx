import { useTexture } from "@react-three/drei";
import { useMemo } from "react";

const Floor = () => {
  const PATH = useMemo(() => "/textures/floor/rectangle-polished-tile_", []);

  const floorTexture = useTexture({
    map: `${PATH}albedo.png`,
    normalMap: `${PATH}normal-ogl.png`,
    roughnessMap: `${PATH}roughness.png`,
    aoMap: `${PATH}ao.png`,
    metalnessMap: `${PATH}metallic.png`,
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-2.1} receiveShadow={false}> {/* Si no quieres que el piso proyecte sombra */}
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial {...floorTexture} />
    </mesh>
  );
};

export default Floor;
