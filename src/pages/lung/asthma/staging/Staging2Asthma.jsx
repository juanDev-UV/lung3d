import { Environment } from "@react-three/drei";

const Staging2Asthma = () => {
  return (
    <Environment
      files="/staging/staging-asthma/scene-1/hdris/night.hdr"
      ground={{
        height: 2,
        radius: 200,
        scale: 40,
      }}
      background
    />
  );
};

export default Staging2Asthma;
