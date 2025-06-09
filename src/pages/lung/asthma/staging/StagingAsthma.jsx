// eslint-disable-next-line no-unused-vars
import {
  Backdrop,
  ContactShadows,
  Environment,
  Sky,
  Sparkles,
  Stage,
} from "@react-three/drei";

const StagingAsthma = () => {
  return (
    <Environment

      files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
      path="/staging/staging-asthma/scene-1/cubemaps/hospital-1/"
      background
    />
  );
};

export default StagingAsthma;
