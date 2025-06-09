// eslint-disable-next-line no-unused-vars
import { Backdrop, ContactShadows, Environment, Sky, Sparkles, Stage } from "@react-three/drei";

const StagingSymptoms = () => {
    return (
            <Environment
                files={[
                    "px1.png",
                    "nx1.png",
                    "py1.png",
                    "ny1.png",
                    "pz1.png",
                    "nz1.png",
                ]}
                path="/staging/staging-bronchitis/scene-1/cubemaps/sky/"
                background

            />
    );
};

export default StagingSymptoms;