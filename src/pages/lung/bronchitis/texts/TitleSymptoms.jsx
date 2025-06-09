/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Html } from "@react-three/drei";
import "./TitleSymptoms.css";


const TitleSymptoms = ({ title }) => {


  return (
    <group position={[-10, 0, -25]}>
      <Html
        center

        wrapperClass="title-sintomas"
      >
        <h1 className="titulo-sintomas">{title}</h1>
      </Html>
    </group>
  );
};

export default TitleSymptoms;