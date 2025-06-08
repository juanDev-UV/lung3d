// eslint-disable-next-line no-unused-vars
import { Backdrop, ContactShadows, Environment, Sky, Sparkles, Stage } from "@react-three/drei";

const StagingSymptoms = () => {
    return (
      <Environment

        files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
        path="/staging/staging-bronchitis/scene-1/cubemaps/sky/"
        background
      />
    );
};

export default StagingSymptoms;