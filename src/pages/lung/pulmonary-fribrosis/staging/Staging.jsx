import { Environment } from "@react-three/drei";

const Staging = () => {
  return (
    <Environment
      files={["px.png",
        "nx.png",
        "py.png",
        "ny.png",
        "pz.png",
        "nz.png"]}
      path="/staging/staging-pulmonary-fibrosis/scene-1/cubemap/hospitalRoom1/"
      background
    />
  );
};

export default Staging;
