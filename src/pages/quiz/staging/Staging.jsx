import { Sky } from "@react-three/drei";

const Staging = () => {
  return (
    <Sky
      sunPosition={[0.5, 0, -1]} // Places the sun below the horizon
      inclination={0.2} // Adjusts the inclination to simulate the sunset
      azimuth={180} // Adjusts the azimuth angle to change the light direction
      mieCoefficient={0.005} // Adjusts the atmospheric dispersion
      mieDirectionalG={0.07} // Adjusts the sun's brightness
      rayleigh={3} // Adjusts Rayleigh scattering
      turbidity={5} // Adjusts the sky clarity
    />
  );
};

export default Staging;
