import { Environment } from "@react-three/drei";

const StagingNight2Pneumonia = () => {
  return (
    <Environment
      files="/staging/staging-pneumonia/scene-1/hdris/night.hdr" // Quita "public/" de la ruta
      ground={{
        height: 60,
        radius: 200,
        scale: 50,
      }}
      background
    />
  );
};

export default StagingNight2Pneumonia;
